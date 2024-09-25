import CrudRepository from "./crud-repository";
import { TutionFee, StudentSch, Loan,HostelFee } from "../models";
const feeRepository = {
  async uploadStudentFee(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(TutionFee, ID)) {
        return await CrudRepository.update(TutionFee, ID, data);
      }
      else {
        return await CrudRepository.create(TutionFee, data)
      }

    } catch (error) {
      throw error;
    }
  },async updateStudentFee(ID: String, data: {}) {
    try {
        return await CrudRepository.update(TutionFee, ID, data);
    } catch (error) {
      throw error;
    }
  },
  async updateStudentHostelFee(ID: String, data: {}) {
    try {
        return await CrudRepository.update(HostelFee, ID, data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentHostelFee(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(HostelFee, ID)) {
        return await CrudRepository.update(HostelFee, ID, data);
      }
      else {
        return await CrudRepository.create(HostelFee, data)
      }

    } catch (error) {
      throw error;
    }
  },
  async uploadStudentSch(ID: String, data: {}) {
    try {
      const res = await CrudRepository.contains(StudentSch, ID);
      if(res){
        return await CrudRepository.update(StudentSch, ID, data);
      }
      else {
        return await CrudRepository.create(StudentSch, data)
      }
    } catch (error) {
      throw error;
    }
  },async updateStudentSch(ID: String, data: {}) {
    try {
      
        return await CrudRepository.update(StudentSch, ID, data);
      
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentLoan(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(Loan, ID)) {
        return await CrudRepository.update(Loan, ID, data);
      }
      else {
        return await CrudRepository.create(Loan, data)
      }
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
  async getStudentHostelFee(ID: String) {
    try {
      return await CrudRepository.findBy(HostelFee, { ID });
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
