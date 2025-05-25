import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom';
import { BarraNavegacion } from '../components/BarraNavegacion';
import '../styles/creditos.css';

function Creditos() {
    const [visibleSections, setVisibleSections] = useState({
        equipo: false,
        agradecimientos: false,
        tecnologias: false
    });

    // Función para manejar la animación de elementos al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.fade-in');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight - 100) {
                    section.classList.add('visible');
                    const sectionId = section.id;
                    if (sectionId) {
                        setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Ejecutar una vez para elementos ya visibles al cargar
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Datos del equipo
    const equipoData = [
        {
            nombre: "David",
            rol: "Desarrollador Principal",
            descripcion: "Encargado de la estructura principal del juego y la lógica del frontend.",
            email: "davidmunvalle@uma.es",
            github: "https://github.com/DRLKs"
        },
        {
            nombre: "Suito (Alejandro)",
            rol: "Diseñador de UI/UX",
            descripcion: "Responsable de la experiencia de usuario y diseño de interfaz.",
            email: "alejg411@uma.es",
            github: "https://github.com/suito"
        },
        {
            nombre: "Fran",
            rol: "Desarrollador Frontend",
            descripcion: "Implementación de componentes y funcionalidades interactivas.",
            email: "franramirez@uma.es",
            github: "https://github.com/franra18"
        },
        {
            nombre: "Soraya",
            rol: "Desarrolladora Full Stack",
            descripcion: "Integración de datos y lógica de aplicación.",
            email: "sorayasadqui@uma.es",
            github: "https://github.com/soraya"
        },
        {
            nombre: "Marquito (Marcos)",
            rol: "Diseñador Gráfico",
            descripcion: "Creación de assets visuales y animaciones.",
            email: "maarcoos_8@uma.es",
            github: "https://github.com/marcos"
        }
    ];

    // Tecnologías utilizadas - sin logos
    const tecnologias = [
        { nombre: "React" },
        { nombre: "CSS3" },
        { nombre: "JavaScript" },
        { nombre: "Vite" },
        { nombre: "HTML5" }
    ];

    return (
        <>
        <Helmet>
            <title>Monkey Pop - Creditos</title>
        </Helmet>

            <div className='fondo-creditos'></div>
            <BarraNavegacion />
            
            <div className='creditos-container'>
                <h1 className='creditos-titulo'>Créditos</h1>
                
                {/* Sección del equipo de desarrollo */}
                <section className='seccion-creditos fade-in' id="equipo">
                    <h2 className='seccion-titulo'>Equipo de Desarrollo</h2>
                    <div className='equipo-lista'>
                        {equipoData.map((miembro, index) => (
                            <div className='miembro-equipo' key={index}>
                                <div className='nombre-miembro'>{miembro.nombre}</div>
                                <div className='rol-miembro'>{miembro.rol}</div>
                                <p className='descripcion-miembro'>{miembro.descripcion}</p>
                                <div className='contacto-miembro'>
                                    <a href={`mailto:${miembro.email}`} title="Email">
                                        <span role="img" aria-label="Email">✉️</span> Email
                                    </a>
                                    <a href={miembro.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                                        <span role="img" aria-label="GitHub">💻</span> GitHub
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Sección de tecnologías */}
                <section className='seccion-creditos fade-in' id="tecnologias">
                    <h2 className='seccion-titulo'>Tecnologías Utilizadas</h2>
                    <div className='tecnologias-grid'>
                        {tecnologias.map((tech, index) => (
                            <div className='tecnologia-item' key={index}>
                                {/* Usamos la primera letra como marcador de posición en lugar de un logo */}
                                <div className='tecnologia-logo-placeholder'>{tech.nombre.charAt(0)}</div>
                                <div className='tecnologia-nombre'>{tech.nombre}</div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Sección de agradecimientos */}
                <section className='seccion-creditos fade-in' id="agradecimientos">
                    <h2 className='seccion-titulo'>Agradecimientos</h2>
                    <ul className='agradecimientos-lista'>
                        <li>Bloons TD Battles por la inspiración para el diseño del juego.</li>
                        <li>Profesor de Interfaces de Usuario por la guía y asesoramiento.</li>
                        <li>Universidad de Málaga, Facultad de Informática.</li>
                        <li>Todos los compañeros que probaron el juego y proporcionaron feedback.</li>
                    </ul>
                </section>
                
                {/* Botón para volver al menú */}
                <Link to="/" className='boton-volver'>
                    Volver al Menú
                </Link>
                
                {/* Pie de página */}
                <div className='creditos-footer'>
                    <hr />
                    <p>Monkey Pop &copy; 2025. Todos los derechos reservados.</p>
                    <p>Un proyecto de la asignatura de Interfaces de Usuario.</p>
                    <p className='version-info'>Versión 1.0.0</p>
                </div>
            </div>
        
        <div className='fondo-creditos'></div>
        <BarraNavegacion>

        </BarraNavegacion>
        
        </>
    );
}

export default Creditos;