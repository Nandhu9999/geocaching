// GEOCACHING SERVER SCRIPT
const fs = require("fs");
const path = require("path");
const fastify = require("fastify")({ logger: false });
const db = require("./database");
const bcrypt = require("bcrypt");
const {
  dbFilePath,
  ifConditionFunction,
  numberWithCommas,
} = require("./serverHelper.js");

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
const handlebars = require("handlebars");
const Geocache = require("./models/Geocache.js");
const GeocacheProperties = require("./models/GeocacheProperties.js");
const Quiz = require("./models/Quiz.js");
const User = require("./models/User.js");
fastify.register(require("@fastify/view"), {
  engine: { handlebars: handlebars },
  options: {
    partials: {
      head: "/src/partials/head.handlebars",
      navbar: "/src/partials/navbar.handlebars",
      loginForm: "/src/partials/loginForm.handlebars",
      registerForm: "/src/partials/registerForm.handlebars",
      locationPermission: "/src/partials/locationPermission.handlebars",
      newUserPopup: "/src/partials/newUserPopup.handlebars",
      questionPopup: "/src/partials/questionPopup.handlebars",
      sideBar: "/src/partials/sideBar.handlebars",
      gameNavbar: "/src/partials/gameNavbar.handlebars",
      gameSettings: "/src/partials/gameSettings.handlebars",
      inventoryCard: "/src/partials/inventoryCard.handlebars",
    },
  },
});
handlebars.registerHelper("ifCond", ifConditionFunction);
handlebars.registerHelper("numberWithCommas", numberWithCommas);

// db setup
let dbAlreadyExisted;
if (fs.existsSync(dbFilePath)) {
  dbAlreadyExisted = true;
} else {
  dbAlreadyExisted = false;
}
db.sync({ force: false }).then(async () => {
  console.log("db is ready!", { dbAlreadyExisted });

  if (!dbAlreadyExisted) {
    // ADMIN USER
    const hashedPassword = "abc123" || (await bcrypt.hash("abc123", 10));
    User.create({
      name: "admin",
      email: "admin@nandhu.site",
      pass: hashedPassword,
      admin: true,
      score: 10000000,
    });
    // GEOCACHE TABLE
    const treeList = JSON.parse(fs.readFileSync("./src/data/tree.json"));
    treeList.forEach((treeObject) => {
      const [lat, lng] = treeObject.coords.split(",").map(Number);
      Geocache.create({
        scientific_name: treeObject.scientific_name,
        lat,
        lng,
      });
    });
    // GEOCACHE PROPERTIES TABLE
    const treePropsList = JSON.parse(
      fs.readFileSync("./src/data/tree_props.json")
    );
    treePropsList.forEach((treeObject) => {
      GeocacheProperties.create({
        id: treeObject.id,
        name: treeObject.name,
        scientific_name: treeObject.scientific_name,
        origin: treeObject.origin,
        properties: treeObject.properties,
        score: treeObject.points,
      });
    });
    // QUIZ TABLE
    const quizList = JSON.parse(fs.readFileSync("./src/data/quiz.json"));
    quizList.forEach((quizObject) => {
      Quiz.create({
        id: quizObject.quiz_id,
        scientific_name: quizObject.scientific_name,
        question: quizObject.question,
        options: quizObject.options,
        answer: quizObject.answer,
      });
    });
  }
});

// session setup
fastify.register(require("@fastify/cookie"), {
  secret: process.env.COOKIE_SECRET, // for cookies signature
  parseOptions: {}, // options for parsing cookies
});
fastify.register(require("@fastify/session"), {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24 * 30 * 12, // a year
  },
});

// all requests middleware
fastify.addHook("onRequest", (request, reply, next) => {
  const protocol = request.raw.headers["x-forwarded-proto"]?.split(",")[0];
  if (protocol === "http" && !request.hostname.startsWith("localhost")) {
    reply.redirect("https://" + request.hostname + request.url);
  }

  console.log("onRequest:", request.url);
  const sid = request.session.sessionId;
  // console.log("sid:",sid);

  const RESTRICTED_URLs = [
    "/game",
    "/inventory",
    "/leaderboards",
    "/create",
    // "/users",
    "/geocache",
  ];
  if (
    request.session.isAuthenticated === undefined &&
    RESTRICTED_URLs.indexOf(request.url) !== -1
  ) {
    reply.redirect("/");
  }
  next();
});

// routes
fastify.register(require("./routes/indexRoutes.js"));
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
