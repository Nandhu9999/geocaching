const {
  LOCALIZATION,
  LANGUAGES_LIST,
  getIndiaTime,
  getTimeIcon,
  getSunIndex,
} = require("../src/localization");

const INVENTORY = {
  found: [
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
    {
      name: "tree",
      icon: "🌲",
    },
  ],
};

const ACCOUNT = {
  name: "User42",
  email: "abc@gmail.com",
  pass: "abc123",
  score: 242,
  admin: true,
  count: INVENTORY.found.length,
};
const GAME = {
  maxCount: 30,
};

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
      if (email === ACCOUNT.email && password === ACCOUNT.pass) {
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
    return reply.view("/src/pages/main.hbs", {
      game: GAME,
      account: ACCOUNT,
      gameScreen: true,
    });
  });
  fastify.get("/inventory", (request, reply) => {
    return reply.view("/src/pages/inventory.hbs", {
      game: GAME,
      account: ACCOUNT,
      collection: INVENTORY,
      gameScreen: false,
    });
  });
  fastify.get("/leaderboards", (request, reply) => {
    return reply.view("/src/pages/leaderboards.hbs", {});
  });
  fastify.get("/create", (request, reply) => {
    return reply.view("/src/pages/createGeocache.hbs", {
      game: GAME,
      account: ACCOUNT,
      gameScreen: false,
    });
  });
}

module.exports = rootRoutes;
