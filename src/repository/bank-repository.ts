import { TutionFee } from "../models";
import CrudRepository from "./crud-repository";
const bankRepository = {
  async getBankDueDetails(ReceiptNo: String) {
    try {
      return await CrudRepository.findBy(TutionFee, {
        "installments.ReceiptNo": ReceiptNo,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default bankRepository;

