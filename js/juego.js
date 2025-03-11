// Botón volver
function goBack() {
    window.history.back();
}
document.getElementById('pause-btn').addEventListener('click', function() {
    alert('Ajustes no implementados aún.');
});
document.getElementById('reset-btn').addEventListener('click', function() {
    alert('Ranking no implementado aún.');
});

// Mapa
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const rows = 8; // Filas de la cuadrícula
const cols = 15; // Columnas
const cellSize = 20; // Tamaño de cada celda

// Definir la cuadrícula (0: verde, 1: camino)
const grid = [
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Dibujar la cuadrícula
function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.fillStyle = grid[row][col] === 0 ? "green" : "brown";
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.strokeStyle = "black";
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

drawGrid();

// Manejar clics para colocar monos
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (grid[row][col] === 0) {
        ctx.fillStyle = "blue"; // Color del mono
        ctx.beginPath();
        ctx.arc(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
        ctx.fill();
    }
});