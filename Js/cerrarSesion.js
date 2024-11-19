document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionLink = document.getElementById('cerrar-sesion');

    if (cerrarSesionLink) {
        cerrarSesionLink.addEventListener('click', () => {
            try {
                // Eliminar el token del localStorage
                localStorage.removeItem('token');

                // Mostrar el mensaje de sesión cerrada
                alert('Sesión cerrada exitosamente');

                // Redirigir al usuario al inicio
                window.location.href = '../index.html'; // Asegúrate de que esta ruta sea correcta
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                alert('Error al intentar cerrar la sesión');
            }
        });
    }
});
