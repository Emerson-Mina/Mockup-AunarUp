document.addEventListener('DOMContentLoaded', () => {
    const regresarAlPanel = document.getElementById('Regresar-al-panel');

    // Evento para redirigir al panel de administración
    regresarAlPanel.addEventListener('click', () => {
        window.location.href = '../InicioAdmin.html';  // Ruta relativa correcta
    });

    const form = document.getElementById('form-registrar');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Detiene el envío del formulario para realizar validación

        // Obtener los valores de los campos
        const usuario = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;
        const rol = document.getElementById('rol').value;
        const primerNombre = document.getElementById('primerNombre').value;
        const apellido = document.getElementById('apellido').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const programaAcademico = document.getElementById('programaAcademico').value;
        const semestre = document.getElementById('semestre').value;
        const telefono = document.getElementById('telefono').value;
        const correoInstitucional = document.getElementById('correoInstitucional').value;

        // Validación de campos vacíos
        if (!usuario || !contraseña || !rol || !primerNombre || !apellido || !fechaNacimiento || !programaAcademico || !semestre || !telefono || !correoInstitucional) {
            alert('Todos los campos son obligatorios.');
            return; // Detiene la ejecución si hay campos vacíos
        }

        // Validación del formato de correo institucional
        const emailPattern = /^[a-zA-Z0-9._%+-]+@aunarvillavicencio\.edu\.co$/;
        if (!emailPattern.test(correoInstitucional)) {
            alert('El correo institucional no es válido. Debe ser de la forma nombre@aunarvillavicencio.edu.co');
            return;
        }

        // Validación del número de teléfono (solo números)
        const phonePattern = /^\d+$/;
        if (!phonePattern.test(telefono)) {
            alert('El número de teléfono debe contener solo números.');
            return;
        }

        // Si todos los campos son válidos, enviamos los datos al servidor
        const data = {
            username: usuario,
            password: contraseña,
            role: rol,
            first_name: primerNombre,
            last_name: apellido,
            birth_date: fechaNacimiento,
            academic_program: programaAcademico,
            semester: semestre,
            phone_number: telefono,
            institutional_email: correoInstitucional
        };

        // Enviar los datos al backend usando fetch
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de enviar el token si es necesario
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert(data.message); // Muestra el mensaje de éxito
                window.location.reload(); // Recarga la página para registrar un nuevo usuario
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un problema al registrar al usuario.');
        });
    });
});
