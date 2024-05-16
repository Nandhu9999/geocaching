module.exports = {
  getUsers: (request, reply) => {
    return reply.send({ path: "getUsers" });
  },
  getUserById: (request, reply) => {
    return reply.send({ path: "getUserById" });
  },
  createUser: (request, reply) => {
    const { email, password, confirmPassword } = request.body;
    return reply.send({ path: "createUser" });
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
