import {categoryUtils} from "../utils/categoryUtils"
import { batchUtils } from "../utils/batchUtils";
import { Request, Response } from "express";

const graphController={
    async batchWiseTotalData(req:Request, res:Response){
        try {
          const result = await batchUtils.getAllBatchData(); // Call the function to get the data
          
          res.json(result); // Send the result as JSON response
        } catch (error) {
          console.error("Error while fetching scholarship data:", error);
          res.status(500).send("Error retrieving data");
        }
      },
    async categoryWiseTotalData(req:Request, res:Response){
        const { batchYear } = req.params; // Extract the batch year from the URL parameters
    
        try {
            const result = await categoryUtils.getAllBatchDataByCategory(batchYear); // Pass the batchYear to the function
      
            res.json(result); // Send the result as a JSON response
        } catch (error) {
            console.error("Error while fetching scholarship data:", error);
            res.status(500).send("Error retrieving data");
        }
    }
}

export default graphController



// app.get("/batch", async (req, res) => {
//     try {
//       const result = await batchUtils.getAllBatchData(); // Call the function to get the data
      
//       res.json(result); // Send the result as JSON response
//     } catch (error) {
//       console.error("Error while fetching scholarship data:", error);
//       res.status(500).send("Error retrieving data");
//     }
//   });
  
//   app.get("/category/:batchYear", async (req, res) => {
//     const { batchYear } = req.params; // Extract the batch year from the URL parameters
    
//     try {
//       const result = await categoryUtils.getAllBatchDataByCategory(batchYear); // Pass the batchYear to the function
      
//       res.json(result); // Send the result as a JSON response
//     } catch (error) {
//       console.error("Error while fetching scholarship data:", error);
//       res.status(500).send("Error retrieving data");
//     }
//   });