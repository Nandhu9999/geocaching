async function rootRoutes(fastify, options) {
  fastify.get("/", (request, reply) => {
    return reply.view("/src/pages/landing", {});
  });
  fastify.post("/login", (request, reply) => {
    return reply.send({ path: "login" });
  });
  fastify.get("/register", (request, reply) => {
    return reply.view("/src/pages/register", {});
  });
  fastify.get("/forgot", (request, reply) => {
    return reply.view("/src/pages/forgot", {});
  });
  fastify.get("/healthz", (request, reply) => {
    return reply.send({ status: "OK" }).code(200);
  });
  /*
   *  APPLICATION RELATED ROUTES
   */
  fastify.get("/game", (request, reply) => {
    return reply.view("/src/pages/main.hbs", {});
  });
  fastify.get("/collection", (request, reply) => {
    return reply.view("/src/pages/collection.hbs", {});
  });
  fastify.get("/leaderboards", (request, reply) => {
    return reply.view("/src/pages/leaderboards.hbs", {});
  });
  fastify.get("/create", (request, reply) => {
    return reply.view("/src/pages/createGeocache.hbs", {});
  });
}

module.exports = rootRoutes;
