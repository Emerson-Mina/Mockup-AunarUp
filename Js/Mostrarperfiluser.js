document.addEventListener('DOMContentLoaded', async () => {
  try {
      const token = localStorage.getItem('token');
      if (!token) {
          console.log('No hay token en el almacenamiento local');
          return;
      }

      const response = await fetch('http://127.0.0.1:3000/profile', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}` // Incluir el token en la cabecera
          }
      });

      if (!response.ok) {
          throw new Error('No se pudo obtener el perfil del usuario');
      }

      const data = await response.json();

      if (data && data.success) {
          // Asignar los valores a los campos
          document.getElementById('nombreusuario').textContent = data.username; // Mostrar el nombre de usuario
          document.getElementById('rolusuario').textContent = data.userRole === 'admin' ? 'Administrador' : 'Estudiante';
          document.getElementById('primerNombre').textContent = data.firstName;
          document.getElementById('apellido').textContent = data.lastName;
          document.getElementById('fechaNacimiento').textContent = new Date(data.birthDate).toLocaleDateString(); // Formato de fecha
          document.getElementById('programaAcademico').textContent = data.academicProgram;
          document.getElementById('semestre').textContent = data.semester;
          document.getElementById('telefono').textContent = data.phoneNumber;
          document.getElementById('correoInstitucional').textContent = data.institutionalEmail;
      } else {
          console.log('Error al obtener los datos del perfil:', data.message);
      }

  } catch (error) {
      console.log('Error al cargar el perfil:', error);
  }

  // Agregar el evento para redirigir a "Editar Perfil" cuando se haga clic en el botón
  const editarPerfilBtn = document.getElementById('Editar-Perfil'); // Asegúrate de que el botón tenga el id adecuado

  if (editarPerfilBtn) {
      editarPerfilBtn.addEventListener('click', () => {
          window.location.href = 'EditarperfilUser.html'; // Redirige a la página de "Editar Perfil"
      });
  }

  // Agregar el evento para redirigir al panel de administración
  const regresarAlPanel = document.getElementById('Regresar-al-panel');

  if (regresarAlPanel) {
      regresarAlPanel.addEventListener('click', () => {
          window.location.href = '../InicioEstudiante.html';  // Ruta relativa correcta
      });
  }
});
