import CrudRepository from "./crud-repository";
import { TutionFee, StudentSch, Loan } from "../models";
const feeRepository = {
  async uploadStudentFee(ID:String,data: {}) {
    try {
      return await CrudRepository.update(TutionFee,ID, data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentSch(ID:String,data: {}) {
    try {
      return await CrudRepository.update(StudentSch,ID, data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentLoan(ID:String,data: {}) {
    try {
      return await CrudRepository.update(Loan,ID, data);
    } catch (error) {
      throw error;
    }
  },
  async getStudentFee(ID: String) {
    try {
      return await CrudRepository.findBy(TutionFee, { ID });
    } catch (error) {
      throw error;
    }
  },
  async getStudentSch(ID: String) {
    try {
      return await CrudRepository.findBy(StudentSch, { ID });
    } catch (error) {
      throw error;
    }
  },
  async getStudentLoan(ID: String) {
    try {
      return await CrudRepository.findBy(Loan, { ID });
    } catch (error) {
      throw error;
    }
  },
};

export default feeRepository;
