const { User } = require("../models/index");
const CrudRepository = require("./crud-repository");

const UserRepository = {
  async create(data) {
    return await CrudRepository.create(User, data);
  },

  async destroy(id) {
    return await CrudRepository.destroy(User, id);
  },

  async get(id) {
    return await CrudRepository.get(User, id);
  },

  async findBy(data) {
    return await CrudRepository.findBy(User, data);
  },

  async getAll() {
    return await CrudRepository.getAll(User);
  },

  async update(id, data) {
    return await CrudRepository.update(User, id, data);
  },
};

module.exports = UserRepository;
