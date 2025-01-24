const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const { createCanvas } = require("canvas"); // Para generar gráficos

const app = express();
const PORT = 3000;

// Configurar vistas y archivos estáticos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));
app.use("/static", express.static(path.join(__dirname, "static")));

// Configurar middleware para sesiones
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para analizar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Página de bienvenida
app.get("/", (req, res) => {
  const visitorName = req.session.visitorName || null;
  const language = req.session.language || "es"; // Idioma predeterminado: Español
  res.render("welcome", { visitorName, language });
});

// Procesar el nombre del visitante e idioma
app.post("/", (req, res) => {
  const { visitorName, language } = req.body;
  req.session.visitorName = visitorName;
  req.session.language = language || "es";
  res.redirect("/curriculum");
});

// Página del currículum
app.get("/curriculum", (req, res) => {
  const visitorName = req.session.visitorName || "Visitante";
  const language = req.session.language || "es";
  generarGrafico(); // Generar el gráfico
  res.render("curriculum", { visitorName, language });
});

// Función para generar el gráfico
function generarGrafico() {
  const habilidades = ["Python", "R", "SQL", "Power BI", "Inglés"];
  const niveles = [4, 3, 4, 3, 5]; // Nivel del 1 al 5
  const colores = ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71", "#f1c40f"];

  // Crear un gráfico de barras usando Canvas
  const canvas = createCanvas(500, 300);
  const ctx = canvas.getContext("2d");

  // Fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar las barras
  const barWidth = 60;
  const gap = 20;
  habilidades.forEach((habilidad, i) => {
    const barHeight = niveles[i] * 50;
    ctx.fillStyle = colores[i];
    ctx.fillRect(i * (barWidth + gap), canvas.height - barHeight, barWidth, barHeight);

    // Etiquetas
    ctx.fillStyle = "#000";
    ctx.fillText(habilidad, i * (barWidth + gap), canvas.height - 5);
  });

  // Guardar el gráfico
  const fs = require("fs");
  const out = fs.createWriteStream(path.join(__dirname, "static", "grafico.png"));
  const stream = canvas.createPNGStream();
  stream.pipe(out);
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
