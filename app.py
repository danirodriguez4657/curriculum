from flask import Flask, render_template, request, redirect, session, url_for
import matplotlib.pyplot as plt
import os

# Configuración inicial
app = Flask(__name__)
app.secret_key = "supersecretkey"  # Clave para manejar sesiones
PORT = 3000

# Ruta a la carpeta de gráficos estáticos
STATIC_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")

# Página de bienvenida
@app.route("/", methods=["GET", "POST"])
def welcome():
    if request.method == "POST":
        visitor_name = request.form.get("visitor_name")
        language = request.form.get("language", "es")
        session["visitor_name"] = visitor_name
        session["language"] = language
        return redirect(url_for("curriculum"))
    
    visitor_name = session.get("visitor_name")
    language = session.get("language", "es")  # Idioma predeterminado: Español
    return render_template("welcome.html", visitor_name=visitor_name, language=language)

# Página del currículum
@app.route("/curriculum")
def curriculum():
    visitor_name = session.get("visitor_name", "Visitante")
    language = session.get("language", "es")
    generar_grafico()  # Generar el gráfico
    return render_template("curriculum.html", visitor_name=visitor_name, language=language)

# Función para generar el gráfico
def generar_grafico():
    habilidades = ["Python", "R", "SQL", "Power BI", "Inglés"]
    niveles = [4, 3, 4, 3, 5]  # Nivel del 1 al 5
    colores = ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71", "#f1c40f"]

    # Crear gráfico de barras
    plt.figure(figsize=(8, 5))
    plt.bar(habilidades, niveles, color=colores)
    plt.ylim(0, 5)
    plt.title("Habilidades")
    plt.ylabel("Nivel (1-5)")
    plt.xlabel("Habilidades")

    # Guardar el gráfico en la carpeta estática
    os.makedirs(STATIC_FOLDER, exist_ok=True)
    grafico_path = os.path.join(STATIC_FOLDER, "grafico.png")
    plt.savefig(grafico_path)
    plt.close()

# Iniciar el servidor
if __name__ == "__main__":
    app.run(debug=True, port=PORT)
