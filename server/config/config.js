// =====================
// PUERTO
// =====================
process.env.PORT = process.env.PORT || 3000;

// =====================
// Entorno
// =====================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// =====================
// DB
// =====================
let urlDB = "mongodb://localhost:27017/cafe";
if (process.env.NODE_ENV !== "dev") {
  urlDB = process.env.URIDB;
}
process.env.URLDB = urlDB;
