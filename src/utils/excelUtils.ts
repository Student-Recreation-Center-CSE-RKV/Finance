import XLSX from "xlsx";
interface ExcelItem {
  CategoryName?: string;
  PaymentMode?: string;
  BankReferenceNo?: string;
  TransactionDate?: string; // Adjust types if needed
  Amount?: number;
  Status?: string;
  Date?: string;
  NameoftheStudent?: string;
  ClassAndYear?: string;
  IDNo?: string;
  OnAccountOf?: string;
  AmountPaidRs?: number;
  AmountInWords?: string;
  Remarks?: string;
}
interface StudentData {
  ID?: string;
  StudentName?: string;
  FatherName?: string;
  BATCH?: number;
  Gender?: string;
  Category?: string;
}
interface Description {
  Description?: string;
  Credit?: string;
  Debit?: string;
}
interface DueNo {
  DueNo?: string;
  Credit?: string;
  Debit?: string;
}

interface Installment {
  ReceiptNo: string;
  Date: string;
  Amount: number;
}

interface StudentTutionFeeRecord {
  BATCH: string;
  ID: string;
  installments: Installment[];
  Total: number;
  admissionFee: Installment[];
  reAdmissionFee:Installment[];
  cautionDeposit:Installment[]
}

interface StudentFeeRecord {
  BATCH: string;
  ID: string;
  installments: Installment[];
  Total: number;
}
export interface loanDetails {
  year: string;
  Loan: number;
  Others: number;
  Total: number;
}
export interface Loan {
  ID: string;
  grandTotal: number;
  refund: {
    RefundP1: number;
    RefundP1_1: number;
  };
  acYears: loanDetails[];
}


// Helper function to convert Excel serial date to a JS Date string
const excelDateToJSDate = (serial: number): string => {
  const epoch = new Date(1899, 11, 30); // Excel dates start on Dec 30, 1899
  let days = serial;

  // Excel leap year bug fix: if serial >= 60, add 1 day
  if (serial >= 60) {
    days += 1;
  }

  const date = new Date(epoch.getTime() + days * 86400000); // Convert serial to milliseconds

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`; // Return in 'YYYY-MM-DD' format
};


const excelUtils = {
  async parseMsiExcelToJson(filePath: string): Promise<ExcelItem[]> {
    try {
      // console.log(filePath);
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json<Description>(sheet);
      let items: ExcelItem[] = [];
      for (const item of data as ExcelItem[]) {
        const {
          CategoryName,
          PaymentMode,
          BankReferenceNo,
          TransactionDate,
          Amount,
          Status,
          Date,
          NameoftheStudent,
          ClassAndYear,
          IDNo,
          OnAccountOf,
          AmountPaidRs,
          AmountInWords,
          Remarks,
        } = item;

        let Transaction_date=TransactionDate
        if (TransactionDate && typeof TransactionDate === "number") {
          Transaction_date = excelDateToJSDate(TransactionDate);
        }

        let date=Date
        if (Date && typeof Date === "number") {
          date = excelDateToJSDate(Date);
        }

        items.push({
          CategoryName,
          PaymentMode,
          BankReferenceNo,
          TransactionDate:Transaction_date,
          Amount,
          Status,
          Date:date,
          NameoftheStudent,
          ClassAndYear,
          IDNo,
          OnAccountOf,
          AmountPaidRs,
          AmountInWords,
          Remarks,
        });
      }
      return items;
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      throw new Error("Failed to parse Excel file.");
    }
  },
  async parseBankMsExcelToJson(filePath: string): Promise<DueNo[]> {
    try {
      console.log(filePath);
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json<Description>(sheet);
      console.log(data);
      let items: any[] = [];
      for (const item of data as Description[]) {
        items.push({
          Description: item["Description"],
          Debit: item["Debit"],
          Credit: item["Credit"],
        });
      }

      const transactionNumbers: DueNo[] = items.map((item) => {
        if (item.Description) {
          const match = item.Description.match(/DUM\d{7}/);
          return {
            DueNo: match ? match[0] : "Reference number not found",
            Credit: item.Credit || 0,
            Debit: item.Debit || 0,
          };
        }
        return { DueNo: "Refrence number not found" };
      });
      return transactionNumbers;
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      throw new Error("Failed to parse Excel file.");
    }
  },

  async parseStudentsDataToExcel(filePath: string): Promise<StudentData[]> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Assuming data is in the first sheet

      // Convert the sheet to JSON rows
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);
      const studentData: StudentData[] = [];
      
      rows.map((item) => {
        studentData.push({
          ID: item["ROLL No."],
          StudentName: item["NAME AS PER SSC RECORDS"],
          FatherName: item["Father Name"] ? item["Father Name"] : "NA",
          Category: this.normalizeCaste(item["CASTE"]),
          Gender: item["GENDER"] ? this.normalizeGender(item["GENDER"]) : "NA",
          BATCH: item["BATCH"] ? item["BATCH"] : "NA",
        });
      });

      return studentData;
    } catch (error) {
      throw new Error("Failed to parse Excel file.");
    }
  },
  async parseStudentFee(filePath: string) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets["Fees"];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const studentData: StudentTutionFeeRecord[] = [];
      rows.map((row, index) => {
        if (index > 1) {
          const studentRecord: StudentTutionFeeRecord = {
            ID: row["I.D NO"],
            BATCH: row["BATCH"],
            installments: [],
            Total: row["Total"],
            admissionFee:[],
            cautionDeposit:[],
            reAdmissionFee:[]
          };
          studentRecord.admissionFee.push({
            ReceiptNo:row["Admission Fee"],
            Amount:row[`__EMPTY_1`],
            Date:row[`__EMPTY_2`]
          })
          studentRecord.reAdmissionFee.push({
            ReceiptNo:row["Re Admission Fee"],
            Amount:row[`__EMPTY_3`],
            Date:row[`__EMPTY_4`]
          })
          studentRecord.cautionDeposit.push({
            ReceiptNo:row["Caution Deposit"],
            Amount:row[`__EMPTY_5`],
            Date:row[`__EMPTY_6`]
          })
          for (const key in row) {
            if (key.match("Installment")) {
              const installmentIndex = key.match(/\d+/);

              if (installmentIndex) {
                const index = parseInt(installmentIndex[0], 10);
                const receiptNo = row[key];
                const date = row[`__EMPTY_${2 * (index - 1) + 7}`];
                const amount = row[`__EMPTY_${2 * (index - 1) + 8}`];
                studentRecord.installments.push({
                  ReceiptNo: receiptNo,
                  Amount: amount,
                  Date: date,
                });
                
              }
              
            }
          }
          studentData.push(studentRecord);
          // console.log(studentRecord)
        }
      });
      return studentData;
    } catch (error) {
      throw new Error("Failed to parse Excel file.");
    }
  },
  async parseStudentHostelFee(filePath: string) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets["Hostel"];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const studentData: StudentFeeRecord[] = [];
      rows.map((row, index) => {
        if (index > 1) {
          const studentRecord: StudentFeeRecord = {
            ID: row["I.D NO"],
            BATCH: row["BATCH"],
            installments: [],
            Total: row["Total"],
          };

          for (const key in row) {
            if (key.match("Installment")) {
              const installmentIndex = key.match(/\d+/);

              if (installmentIndex) {
                const index = parseInt(installmentIndex[0], 10);
                const receiptNo = row[key];
                const date = row[`__EMPTY_${2 * (index - 1) + 1}`];
                const amount = row[`__EMPTY_${2 * (index - 1) + 2}`];
                studentRecord.installments.push({
                  ReceiptNo: receiptNo,
                  Amount: amount,
                  Date: date,
                });
              }
            }
          }
          studentData.push(studentRecord);
        }
      });
      return studentData;
    } catch (error) {
      throw new Error("Failed to parse Excel file.");
    }
  },

  async parseStudentSch(filePath: string) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets["SCH"];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const studentData: StudentFeeRecord[] = [];
      rows.map((row, index) => {
        if (index > 0 && index<rows.length-1) {
          const structuredData: any = {
            ID: row["ROLL No."],
            BATCH: row["BATCH"]?row["BATCH"]:0,
            TotalSch: row["Total Sch"],
            OtherSch: row["Other Sch"] ? row["Other Sch"] : 0,
            FeePaidbyTheStudent: row["Fee Paid by the Student"]
              ? row["Fee Paid by the Student"]
              : 0,
            TotalFeePaid: row["Total Fee Paid"] ? row["Total Fee Paid"] : 0,
            ActualPay: row["Actuval pay"] ? row["Actuval pay"] : 0,
            RemainingBalance: row["Remaining Balance"]
              ? row["Remaining Balance"]
              : 0,
            RefundAmount: row["Refund Amount"] ? row["Refund Amount"] : 0,
            academicYears: [],
          };
          for (const key in row) {
            if (key.match(/^\d{4}-\d{2}$/)) {
              const relatedKey = `${key}_1`;
              structuredData.academicYears.push({
                Year: key,
                ActualPay: row[key],
                SchReceived: row[relatedKey] || null, // Use null if relatedKey doesn't exist
              });
            }
          }
          studentData.push(structuredData);
        }
      });
      return studentData;
    } catch (error) {
      throw new Error("Failed to parse Excel file.");
    }
  },
  async parseStudentLoan(filePath: string): Promise<Loan[]> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets["Loan&Others"];

      const rows = XLSX.utils.sheet_to_json(sheet);

      const studentSch: Loan[] = [];

      rows.forEach((row: any, index) => {
        // console.log(row["ROLL No."]);
        if (index > 0) {
          const result: Loan = {
            ID: row["ROLL No."],
            grandTotal: row["Grand Total"],
            refund: {
              RefundP1: row["Refund P1"],
              RefundP1_1: row["Refund P1_1"],
            },
            acYears: [],
          };
          let even = 2;
          let odd = 3;
          // console.log(row);
          for (const key in row) {
            if (/\d{4}-\d{2}/.test(key)) {
              const year = key;
              result.acYears.push({
                year: year,
                Loan: row[year],
                Others: row[`__EMPTY_${even}`],
                Total: row[`__EMPTY_${odd}`],
              });
              even += 2;
              odd += 2;
            }
          }
          studentSch.push(result);
        }
      });

      return studentSch;
    } catch (error) {
      throw new Error("Failed to parse Excel file.");
    }
  },
  findDuplicateIds(students: any[]): string[] {
    const seenIds = new Set<string>();
    const duplicates = new Set<string>();

    for (const student of students) {
      if (student.ID && seenIds.has(student.ID)) {
        duplicates.add(student.ID);
      } else if (student.ID) {
        seenIds.add(student.ID);
      }
    }

    return Array.from(duplicates);
  },
  normalizeCaste(caste: string | null | undefined): string {
    if (caste && caste.toUpperCase().startsWith("BC")) {
      // Capture BC followed by any single letter (like BC-A, BC_B, BC A)
      return caste
        .toUpperCase()
        .replace(/[_\s]/g, "-")
        .replace(/BC([A-Z])/, "BC-$1");
    }
    return caste ? caste.toUpperCase() : "NA"; // Return in uppercase or "NA" if not present
  },
  normalizeGender(input: string): string {
    const normalizedInput = input.trim().toLowerCase();
  
    if (["g", "f", "girl", "female"].includes(normalizedInput)) {
      return "Girl";
    } else if (["b", "m", "boy", "male"].includes(normalizedInput)) {
      return "Boy";
    }
  
    // Return 'NA' for invalid input or unknown gender
    return "NA";
  }
};

export { excelUtils };
// {
//   'S.No': 94,
//   'I.D NO': 'R081094',
//   'Student Name': 'NALAMALA KRISHNAVENI',
//   'Father Name': 'Lakshmi Narayana',
//   BATCH: 2008,
//   Gender: 'G',
//   Category: 'OC',
//   'Admission Fee': 0,
//   __EMPTY_1: 0,
//   __EMPTY_2: 0,
//   'Re Admission Fee': 0,
//   __EMPTY_3: 0,
//   __EMPTY_4: 0,
//   'Caution Deposit': 0,
//   __EMPTY_5: 0,
//   __EMPTY_6: 0,
//   '1st Installment': 4439,
//   __EMPTY_7: '28.02.2010',
//   __EMPTY_8: 3500,
//   '2nd Installment': 1664,
//   __EMPTY_9: '21.08.2015',
//   __EMPTY_10: 13164,
//   Total: 16664
// },
// {
//   'S.No': 95,
//   'I.D NO': 'R081095',
//   'Student Name': 'MAROJU PRIYANKA',
//   'Father Name': 'Ratnachari',
//   BATCH: 2008,
//   Gender: 'B',
//   Category: 'BC-A',
//   'Admission Fee': 0,
//   __EMPTY_1: 0,
//   __EMPTY_2: 0,
//   'Re Admission Fee': 0,
//   __EMPTY_3: 0,
//   __EMPTY_4: 0,
//   'Caution Deposit': 0,
//   __EMPTY_5: 0,
//   __EMPTY_6: 0,
//   '1st Installment': 4438,
//   __EMPTY_7: '28.02.2010',
//   __EMPTY_8: 3500,
//   '2nd Installment': 3106,
//   __EMPTY_9: '11.04.2016',
//   __EMPTY_10: 13164,
//   Total: 16664
// },
