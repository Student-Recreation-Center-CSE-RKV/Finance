
import bankRepository from "../repository/bank-repository"

const bankServices = {
  async getBankDueDetails(ReceiptNo: String) {
    try {
      const tutionFee = await bankRepository.getBankTutionDueDetails(ReceiptNo);
      const hostelFee = await bankRepository.getBankHostelDueDetails(ReceiptNo);
      
      if (!(tutionFee || hostelFee)) {
        return { status: 404, message: "Due No. not found" };
      }
      return { status: 200, tutionFee,hostelFee };
    } catch (error) {
      throw error;
    }
  },
};

export default bankServices;