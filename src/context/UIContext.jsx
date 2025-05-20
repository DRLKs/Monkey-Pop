import React, { createContext, useState, useEffect, useRef } from 'react';
import backgroundMusic from '../assets/sounds/musicaFondo.mp3'; // Asumiendo que esta es la ruta correcta
import { cargarConfiguracion } from '../utils/funciones'; // Asumiendo que tienes esta función

// Crear el contexto
export const UIContext = createContext();

// Componente proveedor del contexto
export const UIProvider = ({children}) => {
    const audioRef = useRef(null);
    const [isAudioReady, setIsAudioReady] = useState(false);
    
    // Estado para configuraciones de accesibilidad
    const [accessibilitySettings, setAccessibilitySettings] = useState({
        highContrast: false,
        colorblindMode: 'normal',
        textSize: 'medium',
        reduceMotion: false,
        gameSpeed: 'normal',
        audioDescriptions: false,
        keyboardNavigation: true
    });

    // Cargar y aplicar configuración de accesibilidad al inicio
    useEffect(() => {
        const savedAccessibilitySettings = localStorage.getItem('accessibilitySettings');
        if (savedAccessibilitySettings) {
            const parsedSettings = JSON.parse(savedAccessibilitySettings);
            setAccessibilitySettings(parsedSettings);
            applyAccessibilitySettings(parsedSettings);
        }
    }, []);

    // Configurar el audio
    useEffect(() => {
        // Obtener configuración de volumen desde localStorage
        const configuracionSonido = cargarConfiguracion();
        const isMuted = configuracionSonido.efectos;
        const savedVolume = configuracionSonido.volumen;
        
        // Convertir el volumen de escala 1-100 a escala 0-1
        const normalizedVolume = isMuted ? 0 : (savedVolume ? parseInt(savedVolume) / 100 : 0.5);
        
        // Crear elemento de audio
        audioRef.current = new Audio(backgroundMusic);
        audioRef.current.loop = true;
        audioRef.current.volume = normalizedVolume;
        
        console.log(`Audio configurado - Volumen: ${normalizedVolume * 100}%, Silenciado: ${isMuted}`);
        setIsAudioReady(true);
        
        // Función de limpieza
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    // Reproducir audio después de la interacción del usuario
    useEffect(() => {
        if (!isAudioReady) return;
        
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(err => {
                    console.log("Error al reproducir audio:", err);
                });
                // Remover listeners después de la primera interacción exitosa
                document.removeEventListener('click', playAudio);
                document.removeEventListener('keydown', playAudio);
                document.removeEventListener('touchstart', playAudio);
            }
        };
        
        // Escuchar varios tipos de interacciones
        document.addEventListener('click', playAudio);
        document.addEventListener('keydown', playAudio);
        document.addEventListener('touchstart', playAudio);
        
        return () => {
            document.removeEventListener('click', playAudio);
            document.removeEventListener('keydown', playAudio);
            document.removeEventListener('touchstart', playAudio);
        };
    }, [isAudioReady]);

    // Actualizar configuración de audio cuando se emite el evento 'configuracionActualizada'
    useEffect(() => {
        const handleConfiguracionActualizada = (event) => {
            const { volumen, efectos } = event.detail;
            if (audioRef.current) {
                audioRef.current.volume = efectos ? 0 : (volumen / 100);
                console.log(`Audio actualizado - Volumen: ${volumen}%, Silenciado: ${efectos}`);
            }
        };

        window.addEventListener('configuracionActualizada', handleConfiguracionActualizada);

        return () => {
            window.removeEventListener('configuracionActualizada', handleConfiguracionActualizada);
        };
    }, []);

    // Función para cambiar la música de fondo
    const changeBackgroundMusic = (newMusicSrc) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = newMusicSrc;
            audioRef.current.play().catch(err => {
                console.log("Error al cambiar música:", err);
            });
        }
    };

    // Función para aplicar configuraciones de accesibilidad
    const applyAccessibilitySettings = (settings) => {
        // Alto contraste
        if (settings.highContrast) {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        } else {
            document.documentElement.setAttribute('data-high-contrast', 'false');
        }
        
        // Modo daltonismo
        document.documentElement.setAttribute('data-colorblind', settings.colorblindMode);
        
        // Tamaño de texto
        document.documentElement.setAttribute('data-text-size', settings.textSize);
        
        // Reducir movimiento
        if (settings.reduceMotion) {
            document.documentElement.setAttribute('data-reduce-motion', 'true');
        } else {
            document.documentElement.setAttribute('data-reduce-motion', 'false');
        }
        
        // Emitir evento para que otros componentes puedan reaccionar
        const event = new CustomEvent('accessibilitySettingsChanged', { 
            detail: settings 
        });
        window.dispatchEvent(event);
        
        // Guardar configuración en localStorage
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    };

    // Función para actualizar una configuración de accesibilidad
    const updateAccessibilitySetting = (key, value) => {
        const newSettings = { ...accessibilitySettings, [key]: value };
        setAccessibilitySettings(newSettings);
        localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
        
        // Aplicar cambios inmediatamente
        applyAccessibilitySettings(newSettings);
        
        return newSettings; // Retornar las nuevas configuraciones por si se necesitan
    };

    // Valores y funciones para compartir en el contexto
    const contextValue = {
        changeBackgroundMusic,
        accessibilitySettings,
        updateAccessibilitySetting,
        applyAccessibilitySettings
    };

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    );
}

export default UIProvider;