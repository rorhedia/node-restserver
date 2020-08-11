require("./config/config");

const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes/usuario");

app.use(routes);
console.log(process.env.URLDB);
mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("DB Online");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
