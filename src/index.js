const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const staticPath = path.join(__dirname, "../public");
const partials = path.join(__dirname, "../partials");

app.set("view engine", "hbs");
hbs.registerPartials(partials);
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
