module.exports = {
  proxy: "http://localhost:4000", // Replace with your local server address
  files: [
    "./public/css/tailwind.css",
    "./src/**/*.hbs",
    "./src/**/*.handlebars",
  ], // Paths to watch for changes
  reloadDelay: 0,
};
