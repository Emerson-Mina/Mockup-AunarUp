document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('usuario').value;
        const password = document.getElementById('contraseña').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);

                // Decodifica el token para obtener el rol del usuario
                const userRole = JSON.parse(atob(data.token.split('.')[1])).role;

                // Redirecciona según el rol del usuario
                if (userRole === 'admin') {
                    window.location.href = '../Html/InicioAdmin.html';
                    alert('Sesión exitos');

                } else if (userRole === 'user') {
                    window.location.href = '../Html/InicioEstudiante.html';
                    alert('Sesión exitos');
                } else {
                    alert('Rol no reconocido');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            alert('Error al intentar iniciar sesión');
        }
    });
});
