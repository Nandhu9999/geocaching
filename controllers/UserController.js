const db = require("../database");
const User = require("../models/User");

module.exports = {
  getUsers: (request, reply) => {
    const userList = User.findAll({
      attributes: ["id", "name", "email", "admin"],
    });
    return reply.send({ path: "getUsers", userList });
  },
  getUserById: (request, reply) => {
    const { id } = request.params;
    const user = User.findOne({
      attributes: ["id", "name", "email", "admin"],
      where: {
        id: id,
      },
    });
    return reply.send({ path: "getUserById", user });
  },
  createUser: (request, reply) => {
    const { email, password, confirmPassword } = request.body;
    try {
      if (password == confirmPassword) {
        const hashedPass = password;
        User.findOrCreate({
          email: email,
          pass: password,
        });
        return reply.send({ path: "createUser", success: true });
      }
    } catch (err) {
      return reply.send({ path: "createUser", success: false, error: err });
    }
  },
  deleteUser: (request, reply) => {
    return reply.send({ path: "deleteUser" });
  },
  modifyUser: (request, reply) => {
    return reply.send({ path: "modifyUser" });
  },
  compareUserLocation: (request, reply) => {
    return reply.send({ path: "compareUserLocation" });
  },
};
