


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

/*
    SUITOOOO, no se para que servían estas funciones, pero no hay nada con id = lenguaje
    No con lo otro, ni lo otr

    Todas dan errores, creo que te equivocaste de JS

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


// Evento para cambiar idioma en tiempo real //Esta función está mal, da errores
document.getElementById("lenguaje").addEventListener("change", function() {
    applyLanguage(this.value);
});



// Cargar configuración inicial
loadDefaults();

*/