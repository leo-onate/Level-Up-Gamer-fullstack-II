// Registro
if (window.location.pathname.endsWith('registro.html')) {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const usuario = document.getElementById('nuevo-usuario').value.trim();
        const email = document.getElementById('nuevo-email').value.trim();
        const password = document.getElementById('nuevo-password').value;
        const fechaNacimientoInput = document.getElementById('fechaNacimiento')?.value;

        if(!validarCorreo(email)){
            alert('Tipo de correo no permitido')
            return
        }

        if (!fechaNacimientoInput) {
            alert('Por favor, ingresa tu fecha de nacimiento.');
            return;
        }
        const _fn = new Date(fechaNacimientoInput);
        if (isNaN(_fn.getTime())) {
            alert('Fecha de nacimiento inválida.');
            return;
        }
        const _hoy = new Date();
        let edad = _hoy.getFullYear() - _fn.getFullYear();
        const _mes = _hoy.getMonth() - _fn.getMonth();
        if (_mes < 0 || (_mes === 0 && _hoy.getDate() < _fn.getDate())) {
            edad--;
        }
        if (edad < 18) {
            alert('Debes tener al menos 18 años para registrarte.');
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.some(u => u.usuario === usuario)) {
            alert('El usuario ya existe. Elige otro nombre de usuario.');
            return;
        }



        usuarios.push({ usuario, email, password, fechaNacimiento: fechaNacimientoInput, edad });
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

function validarCorreo(mail){
    mail = mail.toLowerCase();
    return (
        mail.endsWith('@duoc.cl') ||
        mail.endsWith('@profesor.duoc.cl') ||
        mail.endsWith('@gmail.com')
    )
}
