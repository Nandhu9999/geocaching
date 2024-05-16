module.exports = {
  getGeocaches: (request, reply) => {
    return reply.send({ path: "getGeocaches" });
  },
  getGeocacheById: (request, reply) => {
    return reply.send({ path: "getGeocacheById" });
  },
  createGeocache: (request, reply) => {
    const { email, password, confirmPassword } = request.body;
    return reply.send({ path: "createGeocache" });
  },
  modifyGeocache: (request, reply) => {
    return reply.send({ path: "modifyGeocache" });
  },
};
