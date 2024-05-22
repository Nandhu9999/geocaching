// GEOCACHING SERVER SCRIPT
const path = require("path");
const fastify = require("fastify")({ logger: false });
const db = require("./database");

// server hosting configurations
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0" || "127.0.0.1" || "localhost";

// server static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

// parse form body
fastify.register(require("@fastify/formbody"));

// import handlebars
fastify.register(require("@fastify/view"), {
  engine: { handlebars: require("handlebars") },
  options: {
    partials: {
      head: "/src/partials/head.handlebars",
      navbar: "/src/partials/navbar.handlebars",
      login: "/src/partials/login.handlebars",
      locationPermission: "/src/partials/locationPermission.handlebars",
      questionPopup: "/src/partials/questionPopup.handlebars",
      sideBar: "/src/partials/sideBar.handlebars",
      gameNavbar: "/src/partials/gameNavbar.handlebars",
      gameSettings: "/src/partials/gameSettings.handlebars",
      inventoryCard: "/src/partials/inventoryCard.handlebars",
    },
  },
});
const handlebars = require("handlebars");
handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

// db setup
db.sync().then(() => console.log("db is ready!"));

// routes
fastify.register(require("./routes/rootRoutes.js"));
fastify.register(require("./routes/userRoutes.js"));
fastify.register(require("./routes/geocacheRoutes.js"));

// start server
fastify.listen({ port: PORT, host: HOST }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
