// DIBUJAMOS EL MAPA
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurar dimensiones del canvas
canvas.width = 1920; // Ajusta según la imagen
canvas.height = 500; // Ajusta según la imagen


// Variables del juego
let coins = 100;
let enemies = [];
let monkeys = [];
const enemyPath = [{x: 0, y: 250}, {x: 1920, y: 250}, {x: 500, y: 300}, {x: 500, y: 0}];

// Clase de Enemigo
class Enemy {
    constructor() {
        this.x = enemyPath[0].x;
        this.y = enemyPath[0].y;
        this.width = 20;
        this.height = 20;
        this.speed = 1;
        this.pathIndex = 0;
        this.health = 10;
    }

    move() {
        if (this.pathIndex < enemyPath.length - 1) {
            let target = enemyPath[this.pathIndex + 1];
            let dx = target.x - this.x;
            let dy = target.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.speed) {
                this.pathIndex++;
            } else {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }
        }
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


// Generar enemigos periódicamente
setInterval(() => {
    enemies.push(new Enemy());
}, 2000);

// Bucle del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPath();

    // Dibujar y mover enemigos
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].move();
        enemies[i].draw();

        /*
        if (enemies[i].health <= 0) {
            enemies.splice(i, 1);
            coins += 10;
            document.getElementById("coins").textContent = coins;
        }
            */
    }

    requestAnimationFrame(gameLoop);
}



// Dibujar el camino
function drawPath() {
    ctx.fillStyle = "#A9A9A9"; // Color gris para el camino
    ctx.beginPath();
    ctx.moveTo(0, 250); // Punto inicial (izquierda)
    ctx.lineTo(1920, 250); // Punto final (derecha)
    ctx.lineTo(1920, 350);
    ctx.lineTo(0, 350);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Botón de pausa
const pauseBtn = document.getElementById('pause-btn');
if (pauseBtn) {
    pauseBtn.addEventListener('click', function() {
        alert(getTranslation("settings_not_implemented"));
    });
}

// Botón de reinicio
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        alert(getTranslation("ranking_not_implemented"));
    });
}

// Manejador de eventos para guardar los ajustes
const ajustesForm = document.getElementById("controlForm");
if (ajustesForm) {
    ajustesForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Guardar volumen y lenguaje seleccionados
        let newVolumen = document.getElementById("volumen").value;
        let newLenguaje = document.getElementById("lenguaje").value;

        localStorage.setItem("volumen", newVolumen);
        localStorage.setItem("lenguaje", newLenguaje);

        alert(getTranslation("settings_saved"));

        // Redirigir al menú principal
        window.location.href = 'index.html';
    });
}

// Función para volver atrás sin guardar cambios
function goBack() {
    window.history.back();
}

// Cargar los valores guardados en los ajustes
function loadDefaults() {
    let savedVolumen = localStorage.getItem("volumen") || 50;
    let savedLenguaje = localStorage.getItem("lenguaje") || "es";

    document.getElementById("volumen").value = savedVolumen;
    document.getElementById("lenguaje").value = savedLenguaje;

    applyLanguage(savedLenguaje);
}

// Cambia el idioma de la página según la selección
function applyLanguage(lang) {
    localStorage.setItem("lenguaje", lang); // Guarda el idioma
    document.documentElement.lang = lang; // Cambia el atributo de idioma

    // Traducir textos dinámicamente
    document.querySelector("h1").textContent = getTranslation("title");
    document.querySelector("label[for='volumen']").textContent = getTranslation("volume");
    document.querySelector("label[for='lenguaje']").textContent = getTranslation("language");
    document.getElementById("boton-submit").textContent = getTranslation("save");
}

console.log("Iniciando el bucle del juego...");
gameLoop();

// Evento para cambiar idioma en tiempo real //Esta función está mal, da errores
document.getElementById("lenguaje").addEventListener("change", function() {
    applyLanguage(this.value);
});



// Cargar configuración inicial
loadDefaults();
// Nunca llega a esto