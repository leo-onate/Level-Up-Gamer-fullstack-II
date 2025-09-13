document.addEventListener('DOMContentLoaded', function() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const lista = document.getElementById('usuarios-lista');

    function renderUsuarios() {
        lista.innerHTML = '';
        usuarios.forEach((u, idx) => {
            const div = document.createElement('div');
            div.className = 'admin-usuario-card';
            div.innerHTML = `
                <form data-idx="${idx}" class="admin-user-form">
                    <label>Usuario: <input type="text" name="usuario" value="${u.usuario}" required></label>
                    <label>Email: <input type="email" name="email" value="${u.email}" required></label>
                    <label>Contraseña: <input type="text" name="password" value="${u.password}" required></label>
                    <button type="submit">Guardar</button>
                    <button type="button" class="eliminar-usuario" data-idx="${idx}" style="background:#ff4444;color:#fff;margin-left:10px;">Eliminar</button>
                </form>
                <hr>
            `;
            lista.appendChild(div);
        });

        // Guardar cambios de usuario
        document.querySelectorAll('.admin-user-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const idx = this.getAttribute('data-idx');
                usuarios[idx] = {
                    usuario: this.usuario.value,
                    email: this.email.value,
                    password: this.password.value
                };
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Usuario actualizado');
                renderUsuarios();
            });
        });

        // Eliminar usuario
        document.querySelectorAll('.eliminar-usuario').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = this.getAttribute('data-idx');
                if (confirm('¿Seguro que deseas eliminar este usuario?')) {
                    usuarios.splice(idx, 1);
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    renderUsuarios();
                }
            });
        });
    }

    // Crear usuario nuevo
    const crearDiv = document.createElement('div');
    crearDiv.className = 'admin-usuario-card';
    crearDiv.innerHTML = `
        <form id="crear-usuario-form">
            <h3>Crear nuevo usuario</h3>
            <label>Usuario: <input type="text" name="usuario" required></label>
            <label>Email: <input type="email" name="email" required></label>
            <label>Contraseña: <input type="text" name="password" required></label>
            <button type="submit">Crear</button>
        </form>
        <hr>
    `;
    lista.appendChild(crearDiv);

    document.getElementById('crear-usuario-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoUsuario = {
            usuario: this.usuario.value,
            email: this.email.value,
            password: this.password.value
        };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario creado');
        renderUsuarios();
        this.reset();
    });

    renderUsuarios();
});