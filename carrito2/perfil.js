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

    
    document.getElementById('perfil-usuario').value = usuarioLogueado.usuario;
    document.getElementById('perfil-email').value = usuarioLogueado.email;
    document.getElementById('perfil-password').value = usuarioLogueado.password;

    
    document.querySelector('.perfil-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const nuevoUsuario = document.getElementById('perfil-usuario').value.trim();
        const nuevoEmail = document.getElementById('perfil-email').value.trim();
        const nuevoPassword = document.getElementById('perfil-password').value;

       
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.map(u => {
            if (u.usuario === usuarioLogueado.usuario && u.email === usuarioLogueado.email) {
                return { usuario: nuevoUsuario, email: nuevoEmail, password: nuevoPassword };
            }
            return u;
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        
        const actualizado = { usuario: nuevoUsuario, email: nuevoEmail, password: nuevoPassword };
        localStorage.setItem('usuarioLogueado', JSON.stringify(actualizado));

        alert('¡Datos actualizados correctamente!');
    });
});