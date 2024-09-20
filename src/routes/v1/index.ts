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
