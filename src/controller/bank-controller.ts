import { Request, Response } from "express";
import { bankServices } from "../services";

const bankController = {
  async getBankDueDetails(req: Request, res: Response) {
    try {
      const response = await bankServices.getBankDueDetails(
        req.params.ReceiptNo
      );
      console.log(response);
      if (response.status === 200) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({
          message: "Due No. Not found",
        });
      }
    } catch (error) {
      throw error;
    }
  },
};

export default bankController;
