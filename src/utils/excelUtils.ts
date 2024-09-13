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

const excelUtils = {
  async parseMsiExcelToJson(filePath: string): Promise<ExcelItem[]> {
    try {
      console.log(filePath);
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
        items.push({
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
          Category: item["CASTE"] ? item["CASTE"] : "NA",
          Gender: item["GENDER"] ? item["GENDER"] : "NA",
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
        if (index > 0) {
          const structuredData: any = {
            ID: row["ROLL No."],
            BATCH: row["BATCH"],
            TotalSch: row["Total Sch"],
            OtherSch: row["Other Sch"] ? row["Other Sch"] : "NA",
            FeePaidbyTheStudent: row["Fee Paid by the Student"]
              ? row["Fee Paid by the Student"]
              : "NA",
            TotalFeePaid: row["Total Fee Paid"] ? row["Total Fee Paid"] : "NA",
            ActualPay: row["Actuval pay"] ? row["Actuval pay"] : "NA",
            RemainingBalance: row["Remaining Balance"]
              ? row["Remaining Balance"]
              : "NA",
            RefundAmount: row["Refund Amount"] ? row["Refund Amount"] : "NA",
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
  findDuplicateIds(students: StudentData[]): string[] {
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
