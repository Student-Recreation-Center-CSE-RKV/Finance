import StudentSch from "../models/sch-model"
import HostelFeeSchema from "../models/hostel-fee-model"
import Loan from "../models/Loan-model"
import Student from "../models/student-model"

const batchUtils = {
    async getTotalScholarshipByBatch() {
        try {
            const result = await StudentSch.collection.aggregate([
                {
                    $group: {
                        _id: { $toString: "$BATCH" }, // Convert _id to string format for consistency
                        totalFeePaid: { $sum: "$TotalFeePaid" },
                        totalRemainingBalance: { $sum: "$RemainingBalance" },
                        totalScholarShip: { $sum: "$TotalSch" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]).toArray();

            return result;
        } catch (error) {
            console.error("Error during aggregation:", error);
            throw error;
        }
    },
    async getTotalHostelFeeByBatch() {
        try {
            const result = await HostelFeeSchema.collection.aggregate([
                {
                    $group: {
                        _id: { $toString: "$BATCH" }, // Convert _id to string format for consistency
                        totalHostelFee: { $sum: "$Total" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]).toArray();

            return result;
        } catch (error) {
            console.error("Error during aggregation:", error);
            throw error;
        }
    },
    async getTotalTutionFeeByBatch() {
        try {
            const result = await HostelFeeSchema.collection.aggregate([
                {
                    $group: {
                        _id: { $toString: "$BATCH" }, // Convert _id to string format for consistency
                        totalTutionFee: { $sum: "$Total" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]).toArray();

            return result;
        } catch (error) {
            console.error("Error during aggregation:", error);
            throw error;
        }
    },
    async getLoanFeeByBatch() {
        try {
            const result = await Loan.collection.aggregate([
                {
                    $group: {
                        _id: {
                            $substr: ["$ID", 0, 3] // Get the first 3 characters of ID
                        },
                        totalLoan: { $sum: "$grandTotal" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        formattedId: {
                            $concat: [
                                { $literal: "20" }, // Add "20"
                                { $substr: ["$_id", 1, 1] }, // Second character of ID
                                { $substr: ["$_id", 2, 1] }  // Third character of ID
                            ]
                        },
                        totalLoan: 1
                    }
                },
                {
                    $sort: { formattedId: 1 }
                }
            ]).toArray();

            // Modify _id to match the format as in the other functions
            return result.map(item => ({
                _id: item.formattedId,
                totalLoan: item.totalLoan
            }));
        } catch (error) {
            console.error("Error during aggregation:", error);
            throw error;
        }
    },

    async getAllBatchData() {
        try {
            const [hostelFeeByBatch, totalTutionFeeByBatch, scholarshipByBatch, loanByBatch] = await Promise.all([
                this.getTotalHostelFeeByBatch(),
                this.getTotalTutionFeeByBatch(),
                this.getTotalScholarshipByBatch(),
                this.getLoanFeeByBatch()
            ]);

            return {
                totalHostelfeeBybatch: hostelFeeByBatch,
                totalTutionFeeByBatch,
                totalScholarShipByBatch: scholarshipByBatch,
                totalLoanByBatch: loanByBatch
            };
        } catch (error) {
            console.error("Error fetching batch data:", error);
            throw error;
        }
    }


}

export { batchUtils }