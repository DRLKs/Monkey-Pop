document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío normal del formulario

            // Limpiar mensajes anteriores y quitar borde de error
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            form.querySelectorAll('.question-item').forEach(item => {
                 item.style.border = 'none'; // Limpiar bordes rojos de validación
            });

            // --- Validación ---
            const formData = new FormData(form);
            let allAnswered = true;
            const radioGroups = new Set();
            form.querySelectorAll('input[type="radio"]').forEach(radio => {
                radioGroups.add(radio.name);
            });

            radioGroups.forEach(name => {
                if (!formData.has(name)) {
                    allAnswered = false;
                    // Marcar la primera pregunta sin respuesta encontrada
                    const firstUnanswered = form.querySelector(`input[name="${name}"]`);
                    if (firstUnanswered) {
                         const questionItem = firstUnanswered.closest('.question-item');
                         if(questionItem) {
                             questionItem.style.border = '1px solid red'; // Resaltar
                         }
                    }
                }
            });

            if (!allAnswered) {
                messageDiv.textContent = 'Por favor, responde a todas las preguntas de Sí/No.';
                messageDiv.className = 'message error'; // Usar clase CSS para error
                // Hacer scroll hacia el primer error para que sea visible (opcional)
                 const firstError = form.querySelector('.question-item[style*="border: 1px solid red"]');
                 if (firstError) {
                     firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 }
                return; // Detener el envío
            }

            // --- Envío con Fetch ---
            messageDiv.textContent = 'Enviando respuestas...';
            messageDiv.className = 'message info'; // Mensaje informativo

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json' // Importante para que Formspree responda con JSON
                }
            })
            .then(response => {
                if (response.ok) {
                    // Éxito
                    messageDiv.textContent = '¡Gracias por tus respuestas! Enviado correctamente.';
                    messageDiv.className = 'message success';
                    form.reset(); // Limpiar el formulario después del éxito
                     // Limpiar bordes de validación si los hubiera
                    form.querySelectorAll('.question-item').forEach(item => {
                         item.style.border = 'none';
                    });
                } else {
                    // Error en la respuesta del servidor
                    response.json().then(data => {
                        // Formspree suele devolver errores en data.errors
                        if (Object.hasOwn(data, 'errors')) {
                             // Muestra el primer error detallado de Formspree
                            messageDiv.textContent = `Error: ${data.errors.map(error => error.message).join(", ")}`;
                        } else {
                            messageDiv.textContent = 'Hubo un problema al enviar el formulario. Inténtalo de nuevo.';
                        }
                        messageDiv.className = 'message error';
                    }).catch(error => {
                        // Si la respuesta no es JSON o hay otro error al parsear
                        messageDiv.textContent = 'Error al procesar la respuesta del servidor.';
                        messageDiv.className = 'message error';
                        console.error('Error parsing server response:', error);
                    });
                }
            })
            .catch(error => {
                // Error de red (no se pudo conectar con Formspree, etc.)
                messageDiv.textContent = 'Error de red al intentar enviar el formulario. Comprueba tu conexión.';
                messageDiv.className = 'message error';
                console.error('Network error sending form:', error);
            });
        });
    } else {
        console.error("No se encontró el elemento del formulario con ID 'feedbackForm'");
    }
});