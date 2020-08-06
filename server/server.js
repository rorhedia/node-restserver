require("./config/config");

const { request } = require("express");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: "application/*+json" }));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

app.get("/usuario", (req, res) => {
  res.json("get usuario");
});

app.post("/usuario", (req, res) => {
  try {
    let body = req.body;

    res.json({
      success: true,
      body,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

app.put("/usuario", (req, res) => {
  let body = req.body;

  res.json({
    body,
  });
});

app.delete("/usuario", (req, res) => {
  res.json("delete usuario");
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
