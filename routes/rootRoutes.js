const { LOCALIZATION, LANGUAGES_LIST } = require("../src/localization");

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
      console.log(email, password);
      console.log("login attempted");
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
  fastify.get("/localization", (request, reply) => {
    const { language } = request.body;
    if (LANGUAGES_LIST.includes(language)) {
      switch (language) {
        case "english":
          request.session.language = "en";
          break;
        case "tamil":
          request.session.language = "ta";
          break;
        case "telugu":
          request.session.language = "te";
          break;
        case "malayalam":
          request.session.language = "ml";
          break;
      }
    }
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
