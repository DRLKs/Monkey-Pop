const traducciones = {
    es: {
        title: "AJUSTES",
        volume: "Volumen:",
        language: "Lenguaje:",
        save: "Guardar Ajustes",
        back: "Volver",
        ranking_not_implemented: "Ranking no implementado aún.",
        settings_not_implemented: "Ajustes no implementados aún.",
        settings_saved: "Ajustes guardados correctamente."
    },
    en: {
        title: "SETTINGS",
        volume: "Volume:",
        language: "Language:",
        save: "Save Settings",
        back: "Back",
        ranking_not_implemented: "Ranking not implemented yet.",
        settings_not_implemented: "Settings not implemented yet.",
        settings_saved: "Settings saved successfully."
    },
    fr: {
        title: "PARAMÈTRES",
        volume: "Volume :",
        language: "Langue :",
        save: "Enregistrer les paramètres",
        back: "Retour",
        ranking_not_implemented: "Classement non encore implémenté.",
        settings_not_implemented: "Paramètres non encore implémentés.",
        settings_saved: "Paramètres enregistrés avec succès."
    },
    de: {
        title: "EINSTELLUNGEN",
        volume: "Lautstärke:",
        language: "Sprache:",
        save: "Einstellungen speichern",
        back: "Zurück",
        ranking_not_implemented: "Ranking noch nicht implementiert.",
        settings_not_implemented: "Einstellungen noch nicht implementiert.",
        settings_saved: "Einstellungen erfolgreich gespeichert."
    }
};

// Función para obtener la traducción de una clave
function getTranslation(key) {
    let lang = localStorage.getItem("lenguaje") || "es";
    return traducciones[lang][key] || key;
}
