import { studentServices } from "../services";
import { Request, response, Response } from "express";
import XLSX from "xlsx";
import { excelUtils } from "../utils/excelUtils";
import feeServices from "../services/fee-service";
import { stat } from "fs";
import OtherFromMSI from "../models/OtherFromMSI";
import TutionFeeSchema from "../models/fee-model";
import HostelFeeSchema from "../models/hostel-fee-model";
interface ReceiptDetail {
  ReceiptNo?: string;
  Date?: string;
  Amount?: number;
}

interface CustomRequestForFile extends Request {
  fileBase64?: string; // Optional property to hold the Base64 string
}

export interface StudentFeeRecord {
  StudentID: string;
  HallTicket: string;
  StudentName: string;
  G: "M" | "F";
  Caste: string;
  DOB: string;
  FatherName: string;
  BATCH: string;
  AdmissionFee?: ReceiptDetail;
  ReAdmissionFee?: ReceiptDetail;
  CautionDeposit?: ReceiptDetail;
  tutionFee?: number;
  hostelFee?: number;
  tutionFeePaid?: number;
  hostelFeeais?: number;
  Total?: number;
}

const studentController = {
  async uploadStudentsData(req: Request, res: Response) {
    try {
      let items: any[] = [];
      if (req.file) {
        const filePath = req.file.path;
        const response = await excelUtils.parseStudentsDataToExcel(filePath);
        const array = excelUtils.findDuplicateIds(response);
        if (array.length == 0) {
          for (const item of response) {
            try {
              let ID = ""
              if (item.ID)
                ID = item.ID
              const response = await studentServices.uploadStudentsData(ID, item);
              items.push(response);
            } catch (error) {
              throw error;
            }
          }
          return res
            .status(200)
            .send({ message: "successfully uploaded student Details" });
        } else

          return res.status(404).send({
            message: "Duplicates found. " + array,
          });
      }
    } catch (error) {
      // console.log(error);
      return res.status(500).send(error);
    }
  },

  async getStudentById(req: Request, res: Response) {
    // console.log(req.params.id);
    try {
      const response = await studentServices.getStudentById(req.params.id);
      if (response.status === 200) {
        return res.status(200).json(response);
      }
      return res.status(404).json({ message: "Student not found" });
    } catch (error) {
      throw error;
    }
  },
  async getStudentFeeDetails(req: Request, res: Response) {
    try {
      const student: any = await studentServices.getStudentById(req.params.id);
      if (student.status === 404) {
        return res.status(404).json({ message: "student not found" });
      }
      const tutionFee = await feeServices.getStudentFee(req.params.id);
      const hostelFee = await feeServices.getStudentHostelFee(req.params.id);
      const otherFee = await feeServices.getStudentOtherFee(req.params.id)
      const sch = await feeServices.getStudentSch(req.params.id);
      const loan = await feeServices.getStudentLoan(req.params.id);
      return res.status(200).json({ student, tutionFee, hostelFee, otherFee, sch, loan });
    } catch (error) {
      throw error;
    }
  },
  async getStudentOtherFee(req: Request, res: Response) {
    try {
      const response = await feeServices.getStudentOtherFee(req.params.id);
      if (response.status === 404) {
        return res.status(404).json({ message: "student not found" });
      }

      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  },
  async getAllStudentsOtherFee(req: Request, res: Response) {
    try {
      // console.log("Entered")
      const response = await feeServices.getAllStudentsOtherFee()
      // console.log(response)
      return res.status(200).json(response);
    } catch (error) {
      // console.log(error)
      throw error;
    }
  },

  async getAllStudents(req: Request, res: Response) {
    try {
      const ID = (req.query.ID as string | undefined) ?? "";
      const NAME = (req.query.NAME as string | undefined) ?? "";
      const year = (req.query.year as string | undefined) ?? "";
      const RefId = (req.query.RefId as string | undefined) ?? "";
      const branch = (req.query.branch as string | undefined) ?? "";
      const DISTRICT = (req.query.DISTRICT as string | undefined) ?? "";
      const SCHOOL = (req.query.SCHOOL as string | undefined) ?? "";
      const BATCH = (req.query.BATCH as string | undefined) ?? "";

      const response = await studentServices.getAllStudents(
        ID,
        BATCH,
        NAME,
        year,
        RefId,
        branch,
        DISTRICT,
        SCHOOL
      );
      if (response.status === 200) {
        const items = await Promise.all(
          response.students?.map(async (e: any) => {
            const fee = await feeServices.getStudentFee(e.ID);
            const sch = await feeServices.getStudentSch(e.ID);
            const loan = await feeServices.getStudentLoan(e.ID);

            return { student: e, fee, sch, loan };
          }) || []
        );

        // console.log(items);
        return res.status(200).json(items);
      }
      return res.status(404).json({ message: "Students not found" });
    } catch (error) {
      throw error;
    }
  },
  async updateStudent(req: Request, res: Response) {
    try {
      const body = req.body;
      const response = await studentServices.updateStudent(req.params.id, body);
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  async addTutionFeeInstallment(req: CustomRequestForFile, res: Response) {
    try {
      const id = req.body.ID;
      const receiptNo = req.body.ReceiptNo;
      const date = req.body.Date;
      const amount = req.body.Amount;
      let imageBase64 = req.fileBase64;


      // console.log(req.body)
      // Validate input
      if (!id || !receiptNo || !date || !amount) {
        return res.status(400).json({ error: "ID, ReceiptNo, Date, and Amount are required." });
      }

      // Create newInstallment object
      const newInstallment = {
        ReceiptNo: receiptNo,
        Date: date,
        Amount: parseInt(amount) // Ensure amount is an integer
      };




      const tutionFee = await feeServices.getStudentFee(id);
      // console.log(tutionFee)
      const sch = await feeServices.getStudentSch(id);
      tutionFee.installments.push(newInstallment)
      tutionFee.Total = tutionFee.Total + newInstallment.Amount


      sch.FeePaidbyTheStudent = sch.FeePaidbyTheStudent + newInstallment.Amount
      sch.TotalFeePaid += newInstallment.Amount
      sch.RemainingBalance = sch.ActualPay - sch.TotalFeePaid



      const updatedTutionFee = await feeServices.updateStudentTutionFee(id, tutionFee)
      const updatedsch = await feeServices.updateStudentSch(id, sch)
      if (!imageBase64) imageBase64 = ""



      const newDueAddedResponse = await feeServices.addNewDueNumber(
        id,
        newInstallment.Amount,
        imageBase64, // Non-null assertion (ensure it's not null or undefined)
        "Tuition Fee",
        newInstallment.ReceiptNo
      );



      // Send a successful response with the updated records
      return res.status(200).json({ updatedTutionFee, updatedsch, newDueAddedResponse });


    } catch (error) {
      // console.log(" Not Success")
      res.status(500).json({ error: error });
    }
  },
  async addHostelFeeInstallment(req: CustomRequestForFile, res: Response) {
    try {
      // Extract individual fields from form-data
      const id = req.body.ID;
      const receiptNo = req.body.ReceiptNo;
      const date = req.body.Date;
      const amount = req.body.Amount;
      let imageBase64 = req.fileBase64;

      // console.log(req.body)
      // Validate input
      if (!id || !receiptNo || !date || !amount) {
        return res.status(400).json({ error: "ID, ReceiptNo, Date, and Amount are required." });
      }

      // Create newInstallment object
      const newInstallment = {
        ReceiptNo: receiptNo,
        Date: date,
        Amount: parseInt(amount) // Ensure amount is an integer
      };

      // Fetch hostel fee and student scholarship
      const hostelFee = await feeServices.getStudentHostelFee(id);
      const sch = await feeServices.getStudentSch(id);

      // Update hostel fee and scholarship details
      hostelFee.installments.push(newInstallment);
      hostelFee.Total += newInstallment.Amount;
      sch.FeePaidbyTheStudent += newInstallment.Amount;
      sch.TotalFeePaid += newInstallment.Amount;
      sch.RemainingBalance = sch.ActualPay - sch.TotalFeePaid;

      // Update records in the database
      const updatedHostelFee = await feeServices.updateStudentHostelFee(id, hostelFee);
      const updatedsch = await feeServices.updateStudentSch(id, sch);

      // Handle image base64
      if (!imageBase64) imageBase64 = ""; // Default to empty string if no image

      // Add new due number
      const newDueAddedResponse = await feeServices.addNewDueNumber(
        id,
        newInstallment.Amount,
        imageBase64,
        "Hostel Fee",
        newInstallment.ReceiptNo
      );

      // Return response
      return res.status(200).json({ updatedHostelFee, updatedsch, newDueAddedResponse });
    } catch (error) {
      console.error("Error in addHostelFeeInstallment:", error); // Log the error for debugging
      res.status(500).json({ error });
    }
  },
  async getAllAddedDues(req: Request, res: Response) {
    try {
      const response = await feeServices.getAllAddedDueNumbers()
      res.status(200).json(response)

    } catch (error) {
      res.status(500).json({ error })
    }
  },
  async getDuesBasedOnFee(req: Request, res: Response) {
    try {
      const { model, ID } = req.params;
      const modelsMap: any = {
        TutionFeeSchema,
        HostelFeeSchema,
        OtherFromMSI,
      };
      // console.log(model,ID)
      // Check if the provided model is valid
      if (!modelsMap[model]) {
        return res.status(400).json({ error: "Invalid model name" });
      }
  
      // Fetch only ReceiptNo fields from the installments array
      const response = await modelsMap[model].find({ID}, {
        "installments": 1
      });

      if (response.length === 0) {
        return res.status(404).json({ error: "Student not Found" });
      }

      
  
      // Extract only ReceiptNo values for the response
      const receiptNumbers = response.map((doc: any) =>
        doc.installments.map((inst: any) => inst)
      );
  
      res.status(200).json(receiptNumbers);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  
  ,
  async exchangeInstallment(req: Request, res: Response) {
    try {
      const { sourceModel, targetModel, ID, DueNumber } = req.body;

      // Source and target model map
      const modelsMap: any = {
        TutionFeeSchema,
        HostelFeeSchema,
        OtherFromMSI,
      };

      // Ensure the provided sourceModel and targetModel are valid
      if (!modelsMap[sourceModel] || !modelsMap[targetModel]) {
        return res.status(400).json({ error: "Invalid model names" });
      }

      // Fetch the source record
      const sourceRecord = await modelsMap[sourceModel].findOne({ ID });
      if (!sourceRecord) {
        return res.status(404).json({ error: "Source record not found" });
      }

      // Fetch the target record
      const targetRecord = await modelsMap[targetModel].findOne({ ID });
      if (!targetRecord) {
        return res.status(404).json({ error: "Target record not found" });
      }

      // Search for the installment with the matching DueNumber in the source model
      const installmentToMove = sourceRecord.installments.find(
        (installment: any) => installment.ReceiptNo === DueNumber
      );

      if (!installmentToMove) {
        return res.status(404).json({ error: "Installment not found in the source record" });
      }

      // Remove the installment from the source model
      sourceRecord.installments = sourceRecord.installments.filter(
        (installment: any) => installment.ReceiptNo !== DueNumber
      );
      sourceRecord.Total -= parseFloat(installmentToMove.Amount);
      await sourceRecord.save();

      

      // Add the installment to the target model
      targetRecord.installments.push(installmentToMove);
      targetRecord.Total += parseFloat(installmentToMove.Amount);
      await targetRecord.save();

      return res.status(200).json({
        message: "Installment exchanged successfully",
        sourceRecord,
        targetRecord,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }

  }
  ,

  async addNewMSI(
    CategoryName: string | undefined,
    BankReferenceNo: string | undefined,
    Date: string | undefined,
    IDNo: string | undefined,
    Amount: number | undefined
  ) {

    try {

      if (!CategoryName || !BankReferenceNo || !Date || !IDNo || !Amount) {
        return null;
      }

      let newInstallment = {
        ReceiptNo: BankReferenceNo,
        Date,
        Amount
      };

      if (CategoryName?.includes("Tution Fee") || CategoryName?.includes("Vidya Deevena")) {
        // console.log("Tution Fee");

        // Fetch tuition fee and scholarship details
        const tutionFee = await feeServices.getStudentFee(IDNo ? IDNo : "");
        const sch = await feeServices.getStudentSch(IDNo ? IDNo : "");

        // Check if the installment with the same ReceiptNo already exists
        const receiptExists = tutionFee.installments.some(
          (installment: { ReceiptNo: string }) => installment.ReceiptNo === newInstallment.ReceiptNo
        );

        if (!receiptExists) {
          // Add new installment if the ReceiptNo doesn't exist
          tutionFee.installments.push(newInstallment);
          tutionFee.Total = tutionFee.Total + newInstallment.Amount;

          // Update scholarship details
          sch.FeePaidbyTheStudent = sch.FeePaidbyTheStudent + newInstallment.Amount;
          sch.TotalFeePaid += newInstallment.Amount;
          sch.RemainingBalance = sch.ActualPay - sch.TotalFeePaid;

          // Update the fee and scholarship information in the database
          const updatedTutionFee = await feeServices.updateStudentTutionFee(IDNo ? IDNo : "", tutionFee);
          const updatedsch = await feeServices.updateStudentSch(IDNo ? IDNo : "", sch);
          // console.log(updatedsch)
        } else {
          // console.log("Installment with the same ReceiptNo already exists.");
        }
      }
      else if (CategoryName?.includes("Hostel Fee") || CategoryName?.includes("Vasathi Deevena")) {
        // console.log("Hostel Fee");

        // Fetch hostel fee and scholarship details
        const hostelFee = await feeServices.getStudentHostelFee(IDNo ? IDNo : "");
        const sch = await feeServices.getStudentSch(IDNo ? IDNo : "");

        // Check if the installment with the same ReceiptNo already exists
        const receiptExists = hostelFee.installments.some(
          (installment: { ReceiptNo: string }) => installment.ReceiptNo === newInstallment.ReceiptNo
        );

        if (!receiptExists) {
          // Add new installment if the ReceiptNo doesn't exist
          hostelFee.installments.push(newInstallment);
          hostelFee.Total += newInstallment.Amount;

          // Update scholarship details
          sch.FeePaidbyTheStudent += newInstallment.Amount;
          sch.TotalFeePaid += newInstallment.Amount;
          sch.RemainingBalance = sch.ActualPay - sch.TotalFeePaid;

          // Update the hostel fee and scholarship information in the database
          const updatedHostelFee = await feeServices.updateStudentHostelFee(IDNo ? IDNo : "", hostelFee);
          const updatedsch = await feeServices.updateStudentSch(IDNo ? IDNo : "", sch);
        } else {
          // console.log("Installment with the same ReceiptNo already exists.");
        }
      }
      else {
        let newInstallment = {
          ReceiptNo: BankReferenceNo,
          Date,
          Amount,
          category: CategoryName
        };
        // console.log("Others");
        const otherFee = await feeServices.getOtherFromMSI(IDNo ? IDNo : "");
        // Check if the installment with the same ReceiptNo already exists
        const receiptExists = otherFee.installments.some(
          (installment: { ReceiptNo: string }) => installment.ReceiptNo === newInstallment.ReceiptNo
        );

        if (!receiptExists) {
          // Add new installment if the ReceiptNo doesn't exist
          otherFee.installments.push(newInstallment);
          otherFee.Total += newInstallment.Amount;
          // Update the hostel fee and scholarship information in the database
          const updatedOtherFee = await feeServices.updateOtherFee(IDNo ? IDNo : "", otherFee);
        } else {
          // console.log("Installment with the same ReceiptNo already exists.");
        }
      }

    }
    catch (error) {
      // console.log(error)
      throw error

    }
  }


};

export default studentController;
