import React, { useEffect, useRef, createContext, useState } from 'react'

import backgroundMusic from '../assets/sounds/musicaFondo.mp3';

import { cargarConfiguracion } from '../utils/funciones';

// Crear el contexto
export const UIContext = createContext();

// Componente proveedor del contexto
export const UIProvider = ({children}) => {
    const audioRef = useRef(null);
    const [isAudioReady, setIsAudioReady] = useState(false);

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
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    // Reproducir audio después de la interacción del usuario
    useEffect(() => {
        if (!isAudioReady) return;
        
        const playAudio = () => {
            audioRef.current.play().catch(error => {
                console.log("Error al reproducir audio:", error);
            });
            // Eliminar el evento después de la primera interacción
            document.removeEventListener('click', playAudio);
            document.removeEventListener('keydown', playAudio);
            document.removeEventListener('touchstart', playAudio);
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
            const nuevaConfiguracion = cargarConfiguracion();
            // Actualizar volumen, etc.
            if (audioRef.current) {
                const isMuted = nuevaConfiguracion.efectos;
                const volume = nuevaConfiguracion.volumen / 100;
                audioRef.current.volume = isMuted ? 0 : volume;
            }
        };

        window.addEventListener('configuracionActualizada', handleConfiguracionActualizada);

        return () => {
            window.removeEventListener('configuracionActualizada', handleConfiguracionActualizada);
        };
    }, []);    // Función para cambiar la música de fondo
    const changeBackgroundMusic = (newMusicSrc) => {
        if (!audioRef.current) return;
        
        // Guardar el volumen actual
        const currentVolume = audioRef.current.volume;
        const currentTime = audioRef.current.currentTime;
        const wasPlaying = !audioRef.current.paused;
        
        // Pausar la música actual
        audioRef.current.pause();
        
        // Cambiar la fuente de la música
        audioRef.current.src = newMusicSrc;
        audioRef.current.volume = currentVolume;
        
        // Si estaba reproduciendo, continuar reproduciendo
        if (wasPlaying) {
            audioRef.current.play().catch(error => {
                console.log("Error al reproducir la nueva música:", error);
            });
        }
        
    };

    // Valores y funciones para compartir en el contexto
    const contextValue = {
        changeBackgroundMusic,
        // Otras funciones que quieras exponer
    };

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    );
}

export default UIProvider;