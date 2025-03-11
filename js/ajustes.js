// Función para volver atrás sin guardar cambios
function goBack() {
    window.history.back();
}

// Manejo de eventos para los botones (si existen)
document.getElementById('pause-btn')?.addEventListener('click', function() {
    alert(getTranslation("settings_not_implemented"));
});

document.getElementById('reset-btn')?.addEventListener('click', function() {
    alert(getTranslation("ranking_not_implemented"));
});

// Manejador de eventos para guardar los ajustes
document.getElementById("controlForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let newVolumen = document.getElementById("volumen").value;
    let newLenguaje = document.getElementById("lenguaje").value;

    localStorage.setItem("volumen", newVolumen);
    localStorage.setItem("lenguaje", newLenguaje);

    alert(getTranslation("settings_saved"));

    window.location.href = 'index.html';
});

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
    localStorage.setItem("lenguaje", lang);
    document.documentElement.lang = lang;

    document.querySelector("h1").textContent = getTranslation("title");
    document.querySelector("label[for='volumen']").textContent = getTranslation("volume");
    document.querySelector("label[for='lenguaje']").textContent = getTranslation("language");
    document.getElementById("boton-submit").textContent = getTranslation("save");
}

// Cargar configuración inicial
loadDefaults();
/*  Esto no se si va bien */