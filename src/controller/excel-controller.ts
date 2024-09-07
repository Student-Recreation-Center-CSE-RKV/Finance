import { excelServices } from "../services/index";
import { Response, Request } from "express";
import { excelUtils } from "../utils/excelUtils";
import { json } from "stream/consumers";
const excelController = {
  async uploadMsiExcel(req: Request, res: Response) {
    try {
      if (req.file) {
        const response = await excelUtils.parseMsiExcelToJson(req.file.path);

        const results = [];
        for (const item of response) {
          try {
            const result = await excelServices.uploadMsiExcel(item);
            results.push(result);
          } catch (error) {
            console.error(`Failed to upload item: ${item}`, error);
          }
        }

        return res.status(201).json(results);
      } else {
        return res.status(400).json({ error: "No file uploaded" });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  },
  async uploadBankMiniStatementExcel(req: Request, res: Response) {
    try {
      if (req.file) {
        const response = await excelUtils.parseBankMsExcelToJson(req.file.path);

        const results = [];
        for (const item of response) {
          try {
            const result = await excelServices.uploadBankMsExcel(item);
            results.push(result);
          } catch (error) {
            console.error(`Failed to upload item: ${item}`, error);
            results.push({ error: `Failed to upload item: ${item.DueNo}` });
          }
        }

        // Send a single response after processing all items
        return res.status(201).json(results);
      } else {
        return res.status(400).json({ error: "No file uploaded" });
      }
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  },
  async mapDue(req: Request, res: Response) {
    try {
      const response = await excelServices.getBankMsi();
      return res.status(500).json(response);
    } catch (error) {
      throw error;
    }
  },
  // async mapDueN(data: String) {},
};

export default excelController;
