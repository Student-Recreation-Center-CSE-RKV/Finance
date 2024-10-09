import feeRepository from "../repository/fee-repository";

const feeServices = {
  async uploadStudentTutionFee(ID:String,data: {}) {
    try {
      return await feeRepository.uploadStudentFee(ID,data);
    } catch (error) {
      throw error;
    }
  },async updateStudentTutionFee(ID:String,data: {}) {
    try {
      return await feeRepository.updateStudentFee(ID,data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentHostelFee(ID:String,data: {}) {
    try {
      return await feeRepository.uploadStudentHostelFee(ID,data);
    } catch (error) {
      throw error;
    }
  },
  async updateStudentHostelFee(ID:String,data: {}) {
    try {
      return await feeRepository.updateStudentHostelFee(ID,data);
    } catch (error) {
      throw error;
    }
  },
  async updateOtherFee(ID:String,data: {}) {
    try {
      return await feeRepository.updateOtherFee(ID,data);
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
  },async updateStudentSch(ID:String,data: {}) {
    try {
      return await feeRepository.updateStudentSch(ID,data);
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
  async addNewDueNumber(ID: String,amount:number,image:String,feeType:String,due:String) {
    try {
      // console.log("in services", data);
      return await feeRepository.addNewDueNumber(ID,amount,image,feeType,due);
    } catch (error) {
      throw error;
    }
  },
  async getAllAddedDueNumbers()
  {
    try {
      // console.log("in services", data);
      return await feeRepository.getAllAddedDues()
    } catch (error) {
      throw error;
    }

  },
  async getAllStudentsOtherFee()
  {
    try {
      // console.log("in services");
      return await feeRepository.getAllStudentsOtherFee()
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
  async getStudentOtherFee(ID: String) {
    try {
      return  await feeRepository.getStudentOtherFee(ID);
      
    } catch (error) {
      throw error;
    }
  },
  async getStudentHostelFee(ID: String) {
    try {
      return await feeRepository.getStudentHostelFee(ID);
    } catch (error) {
      throw error;
    }
  },
  async getOtherFromMSI(ID: String) {
    try {
      return await feeRepository.getOtherFromMSI(ID);
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
