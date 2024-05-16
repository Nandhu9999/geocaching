const path = require("path");
const fastify = require("fastify")({ logger: false });
// server hosting configurations
const PORT = 3000;
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
    },
  },
});

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
