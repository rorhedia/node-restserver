const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");

app.use(express.json());

app.get("/usuario", (req, res) => {
  let inicio = Number(req.query.inicio) || 0;
  let limite = Number(req.query.limite) || 5;

  Usuario.find({ estado: true }, "nombre email role img")
    .skip(inicio)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err,
        });
      }

      Usuario.count({}, (err, total) => {
        res.status(200).json({
          success: true,
          usuarios,
          total,
        });
      });
    });
});

app.post("/usuario", (req, res) => {
  try {
    let { nombre, email, password } = req.body;
    let usuario = new Usuario({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    usuario.save((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err,
        });
      }

      res.status(201).json({
        success: true,
        Usuario: usuarioDB,
      });
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});

app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err,
        });
      }

      res.json({
        success: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.delete("/usuario/:id", (req, res) => {
  const id = req.params.id;

  Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err,
        });
      }

      res.json({
        success: true,
        usuario: usuarioDB,
      });
    }
  );
});

module.exports = app;
