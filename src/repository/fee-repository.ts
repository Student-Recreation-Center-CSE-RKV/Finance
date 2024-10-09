import CrudRepository from "./crud-repository";
import { TutionFee, StudentSch, Loan,HostelFee,AddedDues } from "../models";
import OtherFromMSI from "../models/OtherFromMSI";
const feeRepository = {
  async uploadStudentFee(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(TutionFee, ID)) {
        return await CrudRepository.update(TutionFee, ID, data);
      }
      else {
        return await CrudRepository.create(TutionFee, data)
      }

    } catch (error) {
      throw error;
    }
  },async updateStudentFee(ID: String, data: {}) {
    try {
        return await CrudRepository.update(TutionFee, ID, data);
    } catch (error) {
      throw error;
    }
  },
  async getStudentOtherFee(ID: String) {
    try {
      return await CrudRepository.findBy(OtherFromMSI, { ID });
    } catch (error) {
      throw error;
    }
  },
  async updateStudentHostelFee(ID: String, data: {}) {
    try {
        return await CrudRepository.update(HostelFee, ID, data);
    } catch (error) {
      throw error;
    }
  },
  async updateOtherFee(ID: String, data: {}) {
    try {
        return await CrudRepository.update(OtherFromMSI, ID, data);
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentHostelFee(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(HostelFee, ID)) {
        return await CrudRepository.update(HostelFee, ID, data);
      }
      else {
        return await CrudRepository.create(HostelFee, data)
      }

    } catch (error) {
      throw error;
    }
  },
  async uploadStudentSch(ID: String, data: {}) {
    try {
      const res = await CrudRepository.contains(StudentSch, ID);
      if(res){
        return await CrudRepository.update(StudentSch, ID, data);
      }
      else {
        return await CrudRepository.create(StudentSch, data)
      }
    } catch (error) {
      throw error;
    }
  },async updateStudentSch(ID: String, data: {}) {
    try {
      
        return await CrudRepository.update(StudentSch, ID, data);
      
    } catch (error) {
      throw error;
    }
  },
  async addNewDueNumber(ID: String,amount:number,image:String,feeType:String,due:String) {
    try {
      
       return await CrudRepository.create(AddedDues,{dueNumber:due,amount,feeType,image,addedToID:ID})
      
    } catch (error) {
      throw error;
    }
  },
  async uploadStudentLoan(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(Loan, ID)) {
        return await CrudRepository.update(Loan, ID, data);
      }
      else {
        return await CrudRepository.create(Loan, data)
      }
    } catch (error) {
      throw error;
    }
  },
  async getStudentFee(ID: String) {
    try {
      
      const response= await CrudRepository.findBy(TutionFee, { ID });
      // console.log(response)
      if(response)
      {
        return response
      }
      else
      {
        
        const rresponse=await CrudRepository.create(TutionFee,{ID:ID,BATCH:0,Total:0,installments:[],admissionFee:[],reAdmissionFee:[],cautionDeposit:[]})
        
        return rresponse;
      }
    } catch (error) {
      
      throw error;
    }
  },
  async getStudentHostelFee(ID: String) {
    try {
      return await CrudRepository.findBy(HostelFee, { ID });
    } catch (error) {
      throw error;
    }
  },
  async getOtherFromMSI(ID: String) {
    try {
      const response= await CrudRepository.findBy(OtherFromMSI, { ID });
      if(response)
        return response;
      else
      {
        const rresponse=await CrudRepository.create(OtherFromMSI,{ID:ID,Total:0,installments:[]})
        return rresponse;
      }
    } catch (error) {
      throw error;
    }
  },
  async getStudentSch(ID: String) {
    try {
      
      const response= await CrudRepository.findBy(StudentSch, { ID });
      if(response)
        return response;
      else
      {
        const rresponse=await CrudRepository.create(StudentSch,{ID: ID,
          BATCH: 0,
          TotalSch: 0,
          OtherSch: 0,
          FeePaidbyTheStudent: 0,
          TotalFeePaid: 0,
          ActualPay: 0,
          RemainingBalance: 0,
          RefundAmount: 0,
          academicYears: []})
        return rresponse;
      }
      
    } catch (error) {
      throw error;
    }
  },
  async getStudentLoan(ID: String) {
    try {
      return await CrudRepository.findBy(Loan, { ID });
    } catch (error) {
      throw error;
    }
  },
  async getAllAddedDues() {
    try {
      // Fetch all dues, sorting by 'addedOn' in descending order (recent first)
      const dues = await AddedDues.find({}).sort({ addedOn: -1 });
      return dues;
    } catch (error) {
      throw error;
    }
  },
  async getAllStudentsOtherFee() {
    try {
      // console.log("Entered")
      
      const res = await OtherFromMSI.find({});
      // console.log(dues)
      return res;
    } catch (error) {
      throw error;
    }
  }
  
};

export default feeRepository;
