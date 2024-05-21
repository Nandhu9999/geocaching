const {
  LOCALIZATION,
  LANGUAGES_LIST,
  getIndiaTime,
  getTimeIcon,
  getSunIndex,
} = require("../src/localization");

async function rootRoutes(fastify, options) {
  fastify.get("/", (request, reply) => {
    const { lang } = request.query;
    const langCode = lang || "en";
    const localization = LOCALIZATION[langCode];
    return reply.view("/src/pages/landing", { lang: langCode, localization });
  });
  +-(
    // EQUIVALENT TO LOGIN POST ROUTE
    fastify.post("/", (request, reply) => {
      const { email, password } = request.body;
      if (email === "abc@gmail.com" && password === "abc123") {
        return reply.redirect("/game#");
      } else {
        return reply.view("/src/pages/landing", {
          loginError: "invalid login attempt",
        });
      }
    })
  );
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
  fastify.get("/game", async (request, reply) => {
    const time = await getIndiaTime();
    const sunIndex = getSunIndex(time.hours);
    const timeIcon = getTimeIcon(sunIndex);
    return reply.view("/src/pages/main.hbs", {});
  });
  fastify.get("/inventory", (request, reply) => {
    return reply.view("/src/pages/inventory.hbs", {});
  });
  fastify.get("/leaderboards", (request, reply) => {
    return reply.view("/src/pages/leaderboards.hbs", {});
  });
  fastify.get("/create", (request, reply) => {
    return reply.view("/src/pages/createGeocache.hbs", {});
  });
}

module.exports = rootRoutes;
