import { studentRepository } from "../repository/index";
interface FilterData {
  ID?: String;
  year?: String | { $regex: String; $options: String };
  NAME?: String | { $regex: String; $options: String };
  RefId?: String | { $regex: String; $options: String };
  branch?: String | { $regex: String; $options: String };
  DISTRICT?: String | { $regex: String; $options: String };
  SCHOOL?: String | { $regex: String; $options: String };
}

const studentServices = {
  async updloadStudentsData(data: {}) {
    try {
      return await studentRepository.uploadStudentsData(data);
    } catch (error) {
      throw error;
    }
  },
  async upploadStudentHostelData(ID: String, data: {}) {
    try {
      return await studentRepository.updateStudentById(ID, data);
    } catch (error) {
      throw error;
    }
  },
  async getStudentById(ID: String) {
    try {
      const student = await studentRepository.getStudentById(ID);
      if (!student) {
        return { message: "Student not found" };
      }
      return student;
    } catch (error) {
      throw error;
    }
  },
  async getAllStudents(
    ID: String,
    year: String,
    NAME: String,
    RefId: String,
    branch: String,
    DISTRICT: String,
    SCHOOL: String
  ) {
    const filterData: FilterData = {};
    if (ID) {
      filterData.ID = ID;
    }
    if (year) {
      filterData.year = { $regex: year, $options: "i" };
    }
    if (NAME) {
      filterData.NAME = { $regex: NAME, $options: "i" };
    }
    if (RefId) {
      filterData.RefId = { $regex: RefId, $options: "i" };
    }
    if (branch) {
      filterData.branch = { $regex: branch, $options: "i" };
    }
    if (DISTRICT) {
      filterData.DISTRICT = { $regex: DISTRICT, $options: "i" };
    }
    if (SCHOOL) {
      filterData.SCHOOL = { $regex: SCHOOL, $options: "i" };
    }
    console.log(filterData);
    try {
      const students = await studentRepository.getAllStudents(filterData);
      console.log(students);
      if (students.length == 0) {
        return { message: "Student not found" };
      }
      return students;
    } catch (error) {
      throw error;
    }
  },

  async udpateStudent(ID: String, data: {}) {
    try {
      const students = await studentRepository.updateStudentById(ID, data);
      if (!students) {
        return { message: "Student not found" };
      }
      return students;
    } catch (error) {
      throw error;
    }
  },
};

export default studentServices;
