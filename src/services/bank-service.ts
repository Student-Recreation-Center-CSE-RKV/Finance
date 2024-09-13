import bankRepository from "../repository/bank-repository"
const bankServices = {
  async getBankDueDetails(ReceiptNo: String) {
    try {
      const due = await bankRepository.getBankDueDetails(ReceiptNo);
      console.log(due);
      if (!due) {
        return { status: 404, message: "Due No. not found" };
      }
      return { status: 200, due };
    } catch (error) {
      throw error;
    }
  },
};
export default bankServices;