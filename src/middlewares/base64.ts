import { Request, Response, NextFunction } from "express";
import fs from "fs";

// Custom interface that extends the Express Request type
interface CustomRequest extends Request {
  fileBase64?: string; // Optional property to hold the Base64 string
}

const convertImageToBase64 = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.file) {
    // If no file is uploaded, proceed to the next middleware
    return next();
  }

  // Get the path of the uploaded file
  const filePath = req.file.path;

  // Read the file and convert it to Base64
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error processing file" });
    }

    // Convert file data to Base64 string
    const base64String = Buffer.from(data).toString("base64");

    // Store the Base64 string in the request object
    req.fileBase64 = `data:${req?.file?.mimetype};base64,${base64String}`;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default convertImageToBase64;
