import { studentServices } from "../services";
import { Request, response, Response } from "express";
import XLSX from "xlsx";
import { excelUtils } from "../utils/excelUtils";
import feeServices from "../services/fee-service";
import { stat } from "fs";
interface ReceiptDetail {
  ReceiptNo?: string;
  Date?: string;
  Amount?: number;
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
              let ID=""
              if(item.ID)
                ID=item.ID
              const response = await studentServices.uploadStudentsData(ID,item);
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
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async getStudentById(req: Request, res: Response) {
    console.log(req.params.id);
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
      const hostelFee=await feeServices.getStudentHostelFee(req.params.id);
      const sch = await feeServices.getStudentSch(req.params.id);
      const loan = await feeServices.getStudentLoan(req.params.id);
      return res.status(200).json({ student, tutionFee, hostelFee,sch, loan  });
    } catch (error) {
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
  async addTutionFeeInstallment(req:Request,res:Response)
  {
    try {
     
      const id = req.body.ID;
      const newInstallment=req.body.installment;
      
     const tutionFee=await feeServices.getStudentFee(id);
     const sch = await feeServices.getStudentSch(id);
     tutionFee.installments.push(newInstallment)
     tutionFee.Total=tutionFee.Total+parseInt(req.body.installment.Amount)
     sch.FeePaidbyTheStudent=sch.FeePaidbyTheStudent+parseInt(req.body.installment.Amount)
     sch.TotalFeePaid+=parseInt(req.body.installment.Amount)
     sch.RemainingBalance=sch.ActualPay-sch.TotalFeePaid

     const updatedTutionFee=await feeServices.updateStudentTutionFee(id,tutionFee)
     const updatedsch=await feeServices.updateStudentSch(id,sch)
      return res.status(200).json({updatedTutionFee,updatedsch});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  async addHostelFeeInstallment(req:Request,res:Response)
  {
    try {
     
      const id = req.body.ID;
      const newInstallment=req.body.installment;
      
     const hostelFee=await feeServices.getStudentHostelFee(id);
     const sch = await feeServices.getStudentSch(id);
     hostelFee.installments.push(newInstallment)
     hostelFee.Total=hostelFee.Total+parseInt(req.body.installment.Amount)
     sch.FeePaidbyTheStudent=sch.FeePaidbyTheStudent+parseInt(req.body.installment.Amount)
     sch.TotalFeePaid+=parseInt(req.body.installment.Amount)
     sch.RemainingBalance=sch.ActualPay-sch.TotalFeePaid

     const updatedHostelFee=await feeServices.updateStudentHostelFee(id,hostelFee)
     const updatedsch=await feeServices.updateStudentSch(id,sch)
      return res.status(200).json({updatedHostelFee,updatedsch});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};

export default studentController;
