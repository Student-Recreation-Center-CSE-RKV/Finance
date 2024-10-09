// const StudentModel = require("../models/index");
import { BankMs, Msi } from "../models/index";
import CrudRepository from "./crud-repository";
const excelRepository = {
  async uploadMsiFile(id:String,data: {}) {
    if(await CrudRepository.containsDue(Msi,id))
    {
      // console.log("Entered If")
      return await CrudRepository.updateDue(Msi,id,data)
    }
      else
      {
        // console.log("Entered else ")
        return await CrudRepository.uploadExcel(Msi,data);
      }
  },
  async uploadBankMsFile(data: {}) {
    return CrudRepository.uploadExcel(BankMs, data);
  },
  async getBankMsi() {
    return CrudRepository.getAll(Msi, {});
  },
};

export default excelRepository;
