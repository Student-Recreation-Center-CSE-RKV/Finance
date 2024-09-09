// const StudentModel = require("../models/index");
import { BankMs, Msi } from "../models/index";
import CrudRepository from "./crud-repository";
const excelRepository = {
  async uploadMsiFile(data: {}) {
    return CrudRepository.uploadExcel(Msi, data);
  },
  async uploadBankMsFile(data: {}) {
    return CrudRepository.uploadExcel(BankMs, data);
  },
  async getBankMsi() {
    return CrudRepository.getAll(Msi, {});
  },
};

export default excelRepository;
