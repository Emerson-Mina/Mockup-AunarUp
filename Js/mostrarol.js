document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay token en el almacenamiento local');
      return;
    }

    // Configuración de la solicitud HTTP
    const response = await fetch('http://127.0.0.1:3000/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Incluimos el token en la cabecera
      }
    });

    // Manejo de la respuesta de la API
    if (!response.ok) {
      throw new Error('No se pudo obtener el perfil del usuario');
    }

    const data = await response.json();
    if (data.success) {
      const nombreUsuario = document.getElementById('nombre-usuario');
      const rolUsuario = document.getElementById('rol-usuario');

      // Mostrar los datos en la página
      nombreUsuario.textContent = `${data.firstName} ${data.lastName}`;
      
      // Reemplazar 'admin' por 'Administrador' y 'user' por 'Estudiante'
      let role = data.userRole;
      if (role === 'admin') {
        role = 'Administrador';
      } else if (role === 'user') {
        role = 'Estudiante';
      }
      rolUsuario.textContent = role; // Asignar el rol traducido
    } else {
      console.log('Error al obtener los datos del perfil:', data.message);
    }

  } catch (error) {
    console.log('Error al cargar el perfil:', error);
  }
});
