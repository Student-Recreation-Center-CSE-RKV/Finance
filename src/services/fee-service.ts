import feeRepository from "../repository/fee-repository";

const feeServices = {
  async uploadStrudentTutionFee(data: {}) {
    try {
      return await feeRepository.uploadStudentFee(data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentSch(data: {}) {
    try {
      return await feeRepository.uploadStudentSch(data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentLoan(data: {}) {
    try {
      // console.log("in services", data);
      return await feeRepository.uploadStudentLoan(data);
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
