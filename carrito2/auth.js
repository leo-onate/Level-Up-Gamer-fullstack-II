// Registro
if (window.location.pathname.endsWith('registro.html')) {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const usuario = document.getElementById('nuevo-usuario').value.trim();
        const email = document.getElementById('nuevo-email').value.trim();
        const password = document.getElementById('nuevo-password').value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.some(u => u.usuario === usuario)) {
            alert('El usuario ya existe. Elige otro nombre de usuario.');
            return;
        }

        usuarios.push({ usuario, email, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = 'index.html';
    });
}

// Login
if (window.location.pathname.endsWith('index.html')) {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value.trim();
        const password = document.getElementById('password').value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let user = usuarios.find(u => u.usuario === usuario && u.password === password);

        if (user) {
            localStorage.setItem('usuarioLogueado', JSON.stringify(user));
            window.location.href = 'menu.html';
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });
}