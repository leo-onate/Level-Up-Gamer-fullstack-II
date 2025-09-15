
// ====== Filtro por categorías para menú de productos ======
// Requiere que cada .producto-card tenga data-categoria="consolas" (o varias: "juegos,consolas")

(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  //DOMContentLoaded sirve para asegurarse de que tu JavaScript se ejecute cuando el HTML ya existe, evitando errores de que no se encontró este elemento.
  ready(function () {
    const grid = document.querySelector('.productos-grid') || document.querySelector('.productos');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.producto-card'));
    if (!cards.length) return;

    // --- Crear/inyectar contenedor de filtros ---
    let toolbar = document.getElementById('filtros-toolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'filtros-toolbar';
      toolbar.className = 'filtros-toolbar';
      grid.parentNode.insertBefore(toolbar, grid);
    }

    // Obtener categorías desde el DOM
    const setCats = new Set();
    cards.forEach(card => {
      const raw = (card.dataset.categoria || 'otros').toLowerCase();
      raw.split(',').map(s => s.trim()).filter(Boolean).forEach(c => setCats.add(c));
    });
    const categorias = ['todos', ...Array.from(setCats).sort()];

    // Construir UI
    toolbar.innerHTML = `
      <label for="filtro-categoria" class="filtro-label">Categoría:</label>
      <select id="filtro-categoria" class="filtro-select"></select>
      <button id="limpiar-filtro" class="filtro-btn" type="button">Limpiar</button>
      <span id="contador-resultados" class="filtro-contador"></span>
    `;

    const sel = toolbar.querySelector('#filtro-categoria');
    categorias.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat[0].toUpperCase() + cat.slice(1);
      sel.appendChild(opt);
    });

    const contador = toolbar.querySelector('#contador-resultados');
    const limpiar = toolbar.querySelector('#limpiar-filtro');

    // Aplicar desde URL 
    const params = new URLSearchParams(window.location.search);
    const saved = localStorage.getItem('filtroCategoria');
    const initial = params.get('cat') || saved || 'todos';
    if (categorias.includes(initial)) sel.value = initial;

    function aplicarFiltro() {
      const cat = sel.value;
      let visibles = 0;
      cards.forEach(card => {
        const raw = (card.dataset.categoria || 'otros').toLowerCase();
        const list = raw.split(',').map(s => s.trim());
        const show = (cat === 'todos') || list.includes(cat);
        card.style.display = show ? '' : 'none';
        if (show) visibles++;
      });
      contador.textContent = `${visibles} resultado${visibles===1?'':'s'}`;
      localStorage.setItem('filtroCategoria', cat);
      // Actualiza querystring sin recargar
      const url = new URL(window.location);
      if (cat === 'todos') url.searchParams.delete('cat'); else url.searchParams.set('cat', cat);
      window.history.replaceState({}, '', url);
    }

    sel.addEventListener('change', aplicarFiltro);
    limpiar.addEventListener('click', function () {
      sel.value = 'todos';
      aplicarFiltro();
    });

    aplicarFiltro();
  });
})();
