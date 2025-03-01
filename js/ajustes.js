function goBack() {
    window.history.back();
}

/* GUARDAMOS LOS CONTROLES MEDIANTE localStorage */
const controlKeys = {
    up: localStorage.getItem("keyUp") || "W",
    down: localStorage.getItem("keyDown") || "S",
    left: localStorage.getItem("keyLeft") || "A",
    right: localStorage.getItem("keyRight") || "D"
};

function updateControlsDisplay() {
    document.getElementById("keyUp").textContent = controlKeys.up;
    document.getElementById("keyDown").textContent = controlKeys.down;
    document.getElementById("keyLeft").textContent = controlKeys.left;
    document.getElementById("keyRight").textContent = controlKeys.right;
}

/* ACTUALIZA LOS DATOS */
document.getElementById("controlForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let newUp = document.getElementById("inputUp").value.toUpperCase() || controlKeys.up;
    let newDown = document.getElementById("inputDown").value.toUpperCase() || controlKeys.down;
    let newLeft = document.getElementById("inputLeft").value.toUpperCase() || controlKeys.left;
    let newRight = document.getElementById("inputRight").value.toUpperCase() || controlKeys.right;

    controlKeys.up = newUp;
    controlKeys.down = newDown;
    controlKeys.left = newLeft;
    controlKeys.right = newRight;

    localStorage.setItem("keyUp", newUp);
    localStorage.setItem("keyDown", newDown);
    localStorage.setItem("keyLeft", newLeft);
    localStorage.setItem("keyRight", newRight);

    updateControlsDisplay();
});

/* Añade al forms los valores actuales */
function loadDefaults() {
    document.getElementById("inputUp").textContent = localStorage.getItem("keyUp") || "W";
    document.getElementById("inputDown").textContent = localStorage.getItem("keyDown") || "S";
    document.getElementById("inputLeft").textContent = localStorage.getItem("keyLeft") || "A";
    document.getElementById("inputRight").textContent = localStorage.getItem("keyRight") || "D";
}

loadDefaults();