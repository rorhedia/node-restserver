const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "No es un rol válido",
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    enum: rolesValidos,
    default: "USER_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} ya existente" });

module.exports = mongoose.model("usuario", usuarioSchema);
