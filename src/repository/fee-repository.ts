import CrudRepository from "./crud-repository";
import { TutionFee, StudentSch, Loan } from "../models";
const feeRepository = {
  async uploadStudentFee(data: {}) {
    try {
      return await CrudRepository.uploadExcel(TutionFee, data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentSch(data: {}) {
    try {
      return await CrudRepository.uploadExcel(StudentSch, data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentLoan(data: {}) {
    try {
      return await CrudRepository.uploadExcel(Loan, data);
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
