import Student from "../models/student-model"

const categoryUtils = {

    async getTotalPeopleByCategory(batch: string) {
        try {
            const matchStage = batch === "0" ? {} : { BATCH: batch };  // Match all if batch is 0, otherwise match the specific batch

            const result = await Student.aggregate([
                {
                    $match: matchStage  // Apply the match stage dynamically based on batch (integer)
                },
                {
                    $group: {
                        _id: "$Category",  // Group by the 'Category' field
                        totalPeople: { $sum: 1 }  // Count the number of people in each category
                    }
                },
                {
                    $sort: { _id: 1 }  // Sort by category name (alphabetically)
                }
            ]);

            return result;
        } catch (error) {
            console.error("Error fetching total people by category:", error);
            throw error;
        }
    },

    async getTotalFeeAndBalanceByCategory(batch: string) {
        try {
            const matchStage = batch === "0"
                ? {}
                : { BATCH: batch }; // Filter based on the batch

            console.log('Match Stage:', matchStage); // Debugging match stage

            const studentsResult = await Student.aggregate([
                {
                    $match: matchStage
                }
            ]);

            console.log('Students Result:', studentsResult); // Check what students were matched

            const result = await Student.aggregate([
                {
                    $match: matchStage
                },
                {
                    $lookup: {
                        from: 'studentsches',
                        localField: 'ID',
                        foreignField: 'ID',
                        as: 'scholarship'
                    }
                },
                {
                    $unwind: { path: '$scholarship', preserveNullAndEmptyArrays: true }
                },
                {
                    $group: {
                        _id: "$Category",
                        totalFeePaid: { $sum: "$scholarship.TotalFeePaid" },
                        totalRemainingBalance: { $sum: "$scholarship.RemainingBalance" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);

            console.log('Final Result:', result); // Final output of the aggregation
            return result;
        } catch (error) {
            console.error("Error fetching total fee and balance by category:", error);
            throw error;
        }
    },


    async getAllBatchDataByCategory(batch: string) {
        try {
            const [totalPeople, feesBycategory, gender, totalHostelFee, totalTutionFee, totalLoan] = await Promise.all([
                this.getTotalPeopleByCategory(batch),
                this.getTotalFeeAndBalanceByCategory(batch),
                this.getTotalByGender(batch),
                this.getTotalHostelFeeByCategory(batch),
                this.getTotalTutionFeeByCategory(batch),
                this.getTotalLoanByCategory(batch)
            ]);

            return {
                totalPeople, feesBycategory, gender, totalHostelFee, totalTutionFee, totalLoan
            };
        } catch (error) {
            console.error("Error fetching batch data:", error);
            throw error;
        }
    },

    async getTotalByGender(batch: string) {
        try {
            // Define the match stage conditionally based on the batch value
            const matchStage = batch !== "0" ? { BATCH: batch } : {}; // If batch is 0, don't filter by batch

            const genderData = await Student.aggregate([
                {
                    $match: matchStage // Apply the match stage conditionally
                },
                {
                    $group: {
                        _id: "$Gender", // Group by the Gender field
                        totalStudents: { $sum: 1 } // Count each student in the group
                    }
                }
            ]);

            return genderData;
        } catch (error) {
            console.error("Error while fetching gender data:", error);
            throw error;
        }
    },



    async getTotalHostelFeeByCategory(batch: string) {
        try {
            const matchStage = batch === "0"
                ? {}
                : { BATCH: batch }; // Filter based on the batch

            console.log('Match Stage:', matchStage); // Debugging match stage

            const studentsResult = await Student.aggregate([
                {
                    $match: matchStage
                }
            ]);

            // console.log('Students Result:', studentsResult); // Check what students were matched

            const result = await Student.aggregate([
                {
                    $match: matchStage
                },
                {
                    $lookup: {
                        from: 'hostelfeeschemas',
                        localField: 'ID',
                        foreignField: 'ID',
                        as: 'tutionFee'
                    }
                },
                {
                    $unwind: { path: '$tutionFee', preserveNullAndEmptyArrays: true }
                },
                {
                    $group: {
                        _id: "$Category",
                        totalHostelFee: { $sum: "$tutionFee.Total" },

                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);

            console.log('Final Result:', result); // Final output of the aggregation
            return result;
        } catch (error) {
            console.error("Error fetching total fee and balance by category:", error);
            throw error;
        }
    }


    ,

    async getTotalTutionFeeByCategory(batch: string) {
        try {
            const matchStage = batch === "0"
                ? {}
                : { BATCH: batch }; // Filter based on the batch

            console.log('Match Stage:', matchStage); // Debugging match stage

            const studentsResult = await Student.aggregate([
                {
                    $match: matchStage
                }
            ]);

            // console.log('Students Result:', studentsResult); // Check what students were matched

            const result = await Student.aggregate([
                {
                    $match: matchStage
                },
                {
                    $lookup: {
                        from: 'tutionfeeschemas',
                        localField: 'ID',
                        foreignField: 'ID',
                        as: 'tutionFee'
                    }
                },
                {
                    $unwind: { path: '$tutionFee', preserveNullAndEmptyArrays: true }
                },
                {
                    $group: {
                        _id: "$Category",
                        totalTutionFee: { $sum: "$tutionFee.Total" },

                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);

            console.log('Final Result:', result); // Final output of the aggregation
            return result;
        } catch (error) {
            console.error("Error fetching total fee and balance by category:", error);
            throw error;
        }
    }


    ,

    async getTotalLoanByCategory(batch: string) {
        try {
            const matchStage = batch === "0"
                ? {}
                : { BATCH: batch }; // Filter based on the batch


            const result = await Student.aggregate([
                {
                    $match: matchStage
                },
                {
                    $lookup: {
                        from: 'loans',
                        localField: 'ID',
                        foreignField: 'ID',
                        as: 'loans'
                    }
                },
                {
                    $unwind: { path: '$loans', preserveNullAndEmptyArrays: true }
                },
                {
                    $group: {
                        _id: "$Category",
                        totalLoan: { $sum: "$loans.grandTotal" },

                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);

            console.log('Final Result:', result); // Final output of the aggregation
            return result;
        } catch (error) {
            console.error("Error fetching total fee and balance by category:", error);
            throw error;
        }
    }

}

export {categoryUtils}