import { HostelFee, TutionFee } from "../models";
import CrudRepository from "./crud-repository";
const bankRepository = {
  async getBankTutionDueDetails(ReceiptNo: String) {
    try {
      return await CrudRepository.findBy(TutionFee, {
        "installments.ReceiptNo": ReceiptNo,
      });
    } catch (error) {
      throw error;
    }
  },
  async getBankHostelDueDetails(ReceiptNo: String) {
    try {
      return await CrudRepository.findBy(HostelFee, {
        "installments.ReceiptNo": ReceiptNo,
      });
    } catch (error) {
      throw error;
    }
  }
};

export default bankRepository;

