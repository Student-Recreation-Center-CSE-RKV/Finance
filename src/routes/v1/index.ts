import express from "express";
import multer from "multer";
import { Request } from "express";
import excelController from "../../controller/excel-controller";
import studentController from "../../controller/student-controller";
import feeController from "../../controller/fee-controller";
import bankController from "../../controller/bank-controller";
// const {
//   validateUserAuth,
//   validateisAdminId,
// } = require("../../middlewares/auth-request-validators.js");
// const {
//   authenticate,
//   authorizeAdmin,
// } = require("../../middlewares/authorization.js");

const v1Routes = express.Router();
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "uploads/data");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.post("/upload", upload.single("file"), excelController.uploadExcel);

v1Routes.post(
  "/upload/msi",
  upload.single("file"),
  excelController.uploadMsiExcel
);
v1Routes.post(
  "/upload/bankMS",
  upload.single("file"),
  excelController.uploadBankMiniStatementExcel
);
v1Routes.post("/mapDue", excelController.mapDue);
v1Routes.post(
  "/upload/student/details",
  upload.single("file"),
  studentController.uploadStudentsData
);
v1Routes.post(
  "/upload/student/fee",
  upload.single("file"),
  feeController.uploadStudentFee
);
v1Routes.post(
  "/upload/student/sch",
  upload.single("file"),
  feeController.uploadStudentSch
);
v1Routes.post(
  "/upload/student/loan",
  upload.single("file"),
  feeController.uploadStudentLoanData
);
v1Routes.get("/bank/due/:ReceiptNo", bankController.getBankDueDetails);
// v1Routes.post(
//   "/upload/hostel/student",
//   upload.single("file"),
//   studentController.uploadStudentsHostelData
// );

v1Routes.get("/student/:id", studentController.getStudentById);

v1Routes.get("/student/fee/:id", studentController.getStudentFeeDetails);

v1Routes.get("/students", studentController.getAllStudents);
v1Routes.put("/update/student/:id", studentController.updateStudent);

export default v1Routes;

// const XLSX = require("xlsx");
// const Student = require("../models/Student");

// const uploadExcel = async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getStudentById = async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const student = await Student.findOne({ ID: req.params.id });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getStudentByFilter = async (req, res) => {
//   try {
//     const { ID, NAME, DISTRICT } = req.query;
//     const filter = {};
//     if (ID) filter.ID = ID;
//     if (NAME) filter.NAME = NAME;
//     if (DISTRICT) filter.DISTRICT = DISTRICT;
//     console.log(filter);
//     const students = await Student.find(filter);
//     // console.log(students);
//     if (!students) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;
//     const student = await Student.findOneAndUpdate({ id }, updatedData, {
//       new: true,
//     });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json({ message: "Student updated successfully", student });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findOneAndDelete({ id });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   uploadExcel,
//   getStudentById,
//   updateStudent,
//   deleteStudent,
//   getStudentByFilter,
// };
