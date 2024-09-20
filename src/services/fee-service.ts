import feeRepository from "../repository/fee-repository";

const feeServices = {
  async uploadStudentTutionFee(ID:String,data: {}) {
    try {
      return await feeRepository.uploadStudentFee(ID,data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentSch(ID:String,data: {}) {
    try {
      return await feeRepository.uploadStudentSch(ID,data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentLoan(ID:String,data: {}) {
    try {
      // console.log("in services", data);
      return await feeRepository.uploadStudentLoan(ID,data);
    } catch (error) {
      throw error;
    }
  },

  async getStudentFee(ID: String) {
    try {
      return await feeRepository.getStudentFee(ID);
    } catch (error) {
      throw error;
    }
  },
  async getStudentSch(ID: String) {
    try {
      return await feeRepository.getStudentSch(ID);
    } catch (error) {
      throw error;
    }
  },
  async getStudentLoan(ID: String) {
    try {
      return await feeRepository.getStudentLoan(ID);
    } catch (error) {
      throw error;
    }
  },
};

export default feeServices;
