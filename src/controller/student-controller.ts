import { studentServices } from "../services";
import { Request, response, Response } from "express";
import XLSX from "xlsx";
import { excelUtils } from "../utils/excelUtils";
import feeServices from "../services/fee-service";
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
        for (const item of response) {
          try {
            const response = await studentServices.updloadStudentsData(item);
            items.push(response);
          } catch (error) {
            throw error;
          }
        }
        res.status(500).send(items);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async getStudentById(req: Request, res: Response) {
    console.log(req.params.id);
    try {
      const response = await studentServices.getStudentById(req.params.id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  },
  async getStudentFeeDetails(req: Request, res: Response) {
    try {
      const student = await studentServices.getStudentById(req.params.id);
      const tutionFee = await feeServices.getStudentFee(req.params.id);
      const sch = await feeServices.getStudentSch(req.params.id);
      const loan = await feeServices.getStudentLoan(req.params.id);
      return res.status(200).json({ student, tutionFee, sch, loan });
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
      const response = await studentServices.getAllStudents(
        ID,
        NAME,
        year,
        RefId,
        branch,
        DISTRICT,
        SCHOOL
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  },
  async updateStudent(req: Request, res: Response) {
    try {
      const body = req.body;
      const response = await studentServices.udpateStudent(req.params.id, body);
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

export default studentController;
