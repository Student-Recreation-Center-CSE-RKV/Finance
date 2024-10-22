import  User  from '../models/user-model';
import CrudRepository from './crud-repository';

// Define the data structure for user creation
interface UserData {
  email: string;
  password: string;
  name: string;
  // Add any other fields based on your User model
}

const UserRepository = {
  async create(data: UserData) {
    return await CrudRepository.create(User, data);
  },

  async destroy(id: string) {
    return await CrudRepository.destroy(User, id);
  },

  async get(id: string) {
    return await CrudRepository.get(User, id);
  },

  async findBy(data: Partial<UserData>) {
    return await CrudRepository.findBy(User, data);
  },

  async getAll() {
    return await CrudRepository.getAll(User,{});
  },

  async update(id: string, data: Partial<UserData>) {
    return await CrudRepository.update(User, id, data);
  },
};

export default UserRepository;
