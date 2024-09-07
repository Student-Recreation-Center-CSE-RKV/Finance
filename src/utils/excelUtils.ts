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
  ID: string;
  installments: Installment[];
  Total: number;
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
        // console.log({
        //   ID: item["ROLL No."],
        //   StudentName: item["NAME AS PER SSC RECORDS"],
        //   FatherName: item["Father Name"],
        //   Category: item["CASTE"],
        //   Gender: item["GENDER"],
        //   BATCH: item["BATCH"],
        // });
        studentData.push({
          ID: item["ROLL No."],
          StudentName: item["NAME AS PER SSC RECORDS"],
          FatherName: item["Father Name"],
          Category: item["CASTE"],
          Gender: item["GENDER"],
          BATCH: item["BATCH"],
        });
      });

      return studentData;
    } catch (error) {
      throw new Error("Failed to parse Excel file.");
    }
  },
};

export { excelUtils };
