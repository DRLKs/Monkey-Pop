import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BarraNavegacion } from '../components/BarraNavegacion';
import '../styles/creditos.css';

// Si los logos no existen, podemos crear un objeto con URLs de CDNs públicos
const logosExternos = {
  React: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
  CSS3: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/340px-CSS3_logo_and_wordmark.svg.png",
  JavaScript: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png",
  Vite: "https://vitejs.dev/logo.svg",
  HTML5: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png"
};

function Creditos() {
    // Función para hacer visible todas las secciones inmediatamente
    useEffect(() => {
        const makeAllVisible = () => {
            const sections = document.querySelectorAll('.fade-in');
            sections.forEach(section => {
                section.classList.add('visible');
                section.classList.add('animate');
            });
        };

        // Ejecutar inmediatamente para que todo sea visible
        makeAllVisible();
    }, []);

    // Datos del equipo
    const equipoData = [
        {
            nombre: "David",
            rol: "Desarrollador Backend",
            descripcion: "Encargado de la lógica del juego y la integración con el backend.",
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

    // Tecnologías utilizadas con sus logos
    const tecnologias = [
        { nombre: "React", logo: logosExternos.React, descripcion: "Biblioteca de JavaScript para construir interfaces de usuario" },
        { nombre: "CSS3", logo: logosExternos.CSS3, descripcion: "Lenguaje de estilo para el diseño visual" },
        { nombre: "JavaScript", logo: logosExternos.JavaScript, descripcion: "Lenguaje de programación para el frontend" },
        { nombre: "Vite", logo: logosExternos.Vite, descripcion: "Herramienta de compilación rápida para desarrollo" },
        { nombre: "HTML5", logo: logosExternos.HTML5, descripcion: "Lenguaje de marcado para estructurar el contenido" }
    ];

    return (
        <>
            <Helmet>
                <title>Monkey Pop - Créditos</title>
                <meta name="description" content="Créditos y agradecimientos del juego Monkey Pop" />
            </Helmet>
            
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
                                    <a href={`mailto:${miembro.email}`} title={`Enviar email a ${miembro.nombre}`} aria-label={`Enviar email a ${miembro.nombre}`}>
                                        <span role="img" aria-hidden="true">✉️</span> Email
                                    </a>
                                    <a href={miembro.github} target="_blank" rel="noopener noreferrer" title={`Perfil GitHub de ${miembro.nombre}`} aria-label={`Visitar GitHub de ${miembro.nombre}`}>
                                        <span role="img" aria-hidden="true">💻</span> GitHub
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Sección de tecnologías mejorada con logos */}
                <section className='seccion-creditos fade-in' id="tecnologias">
                    <h2 className='seccion-titulo'>Tecnologías Utilizadas</h2>
                    <div className='tecnologias-grid'>
                        {tecnologias.map((tech, index) => (
                            <div className='tecnologia-item' key={index}>
                                <div className='tecnologia-logo-container'>
                                    <img 
                                        src={tech.logo} 
                                        alt={`Logo de ${tech.nombre}`} 
                                        className='tecnologia-logo'
                                        loading="lazy"
                                    />
                                </div>
                                <div className='tecnologia-info'>
                                    <div className='tecnologia-nombre'>{tech.nombre}</div>
                                    <div className='tecnologia-descripcion'>{tech.descripcion}</div>
                                </div>
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
                
                {/* Botón Volver al Menú - simplificado */}
                <div className="nav-controles">
                    <Link to="/" className='boton-volver'>
                        🏠 Volver al Menú
                    </Link>
                </div>
                
                {/* Pie de página */}
                <div className='creditos-footer'>
                    <hr />
                    <p>Monkey Pop &copy; 2025. Todos los derechos reservados.</p>
                    <p>Un proyecto de la asignatura de Interfaces de Usuario.</p>
                    <p className='version-info'>Versión 1.0.0</p>
                </div>
            </div>
        </>
    );
}

export default Creditos;
