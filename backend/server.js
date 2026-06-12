require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.log(error));


// Middleware de protección
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === "usuario-autenticado") {
    next();
  } else {
    res.status(401).json({
      mensaje: "Acceso denegado",
    });
  }
};


// Ruta pública
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});


// Ruta protegida
app.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Información protegida",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});