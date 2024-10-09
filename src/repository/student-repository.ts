import CrudRepository from "./crud-repository";
import { Student } from "../models";
import OtherFromMSI from "../models/OtherFromMSI";
const studentRepository = {
  async uploadStudentsData(ID: String, data: {}) {
    try {
      if (await CrudRepository.contains(Student, ID)) {
        return await CrudRepository.update(Student, ID, data);
      }
      else {
        return await CrudRepository.create(Student, data)
      }

    } catch (error) {
      throw error;
    }
  },
  async getAllStudents(filterData: {}) {
    try {
      return await CrudRepository.getAll(Student, filterData);
    } catch (error) {
      throw error;
    }
  },

  async getStudentById(ID: String) {
    try {
      return await CrudRepository.findBy(Student, { ID });
    } catch (error) {
      throw error;
    }
  },

  
 

  async updateStudentById(ID: String, data: {}) {
    try {
      return await CrudRepository.update(Student, ID, data);
    } catch (error) {
      throw error;
    }
  },

  async deleteStudentById(ID: String) {
    try {
      return await CrudRepository.destroy(Student, ID);
    } catch (error) {
      throw error;
    }
  },
};

export default studentRepository;
