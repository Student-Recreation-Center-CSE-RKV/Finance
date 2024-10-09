
import bankRepository from "../repository/bank-repository"

const bankServices = {
  async getBankDueDetails(ReceiptNo: String) {
    try {
      const tutionFee = await bankRepository.getBankTutionDueDetails(ReceiptNo);
      const hostelFee = await bankRepository.getBankHostelDueDetails(ReceiptNo);
      const otherFee = await bankRepository.getOtherDueDetails(ReceiptNo);
      // console.log("revanth",otherFee)
      if (!(tutionFee || hostelFee || otherFee )) {
        return { status: 404, message: "Due No. not found" };
      }
      return { status: 200, tutionFee,hostelFee,otherFee };
    } catch (error) {
      throw error;
    }
  },
};

export default bankServices;