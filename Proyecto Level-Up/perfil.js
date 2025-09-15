document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    console.log("usuarioLogueado:", usuarioLogueado);

    if (!usuarioLogueado) {
        alert("No hay usuario logueado. Redirigiendo...");
        window.location.href = 'index.html';
        return;
    }

    if (usuarioLogueado.usuario === "admin") {
        window.location.href = "admin.html";
        return;
    }

    // Rellenar los campos existentes
    document.getElementById('perfil-usuario').value = usuarioLogueado.usuario;
    document.getElementById('perfil-email').value = usuarioLogueado.email;
    document.getElementById('perfil-password').value = usuarioLogueado.password;

    // === Mostrar edad en el perfil ===
    if (usuarioLogueado.fechaNacimiento) {
        const fn = new Date(usuarioLogueado.fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fn.getFullYear();
        const mes = hoy.getMonth() - fn.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fn.getDate())) {
            edad--;
        }

        const edadElemento = document.getElementById('perfil-edad');
        if (edadElemento) {
            edadElemento.textContent = edad + " años";
        }
    }

    // Guardar cambios en perfil
    document.querySelector('.perfil-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const nuevoUsuario = document.getElementById('perfil-usuario').value.trim();
        const nuevoEmail = document.getElementById('perfil-email').value.trim();
        const nuevoPassword = document.getElementById('perfil-password').value;


        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.map(u => {
            if (u.usuario === usuarioLogueado.usuario && u.email === usuarioLogueado.email) {
                return { 
                    usuario: nuevoUsuario, 
                    email: nuevoEmail, 
                    password: nuevoPassword, 
                    fechaNacimiento: usuarioLogueado.fechaNacimiento 
                };
            }
            return u;
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        const actualizado = { 
            usuario: nuevoUsuario, 
            email: nuevoEmail, 
            password: nuevoPassword, 
            fechaNacimiento: usuarioLogueado.fechaNacimiento 
        };
        localStorage.setItem('usuarioLogueado', JSON.stringify(actualizado));

        alert('¡Datos actualizados correctamente!');
    });
});
