const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");

const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBtn");

const movieList = document.getElementById("movieList");

let movies = [];
let nextId = 1;

// Guardamos qué película está seleccionada (para los botones grandes)
let selectedId = null;

function renderMovies() {
  movieList.innerHTML = "";

  for (const m of movies) {
    const li = document.createElement("li");
    li.className = "item";
    li.dataset.id = String(m.id);

    // Marcar visualmente la selección
    if (m.id === selectedId) {
      li.classList.add("selected");
    }

    li.innerHTML = `
      <div>
        <strong>${escapeHtml(m.title)}</strong>
        <span class="badge">${m.year}</span>
      </div>
      <div class="actions">
        <button class="small del" data-action="delete">Eliminar</button>
        <button class="small edt" data-action="edit">Editar</button>
      </div>
    `;

    movieList.appendChild(li);
  }
}

// (Opcional pero recomendable) evita que se rompa el HTML si alguien mete "<" o "&"
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function addMovie() {
  const title = titleInput.value.trim();
  const year = Number(yearInput.value);

  if (!title || Number.isNaN(year) || year <= 0) {
    alert("Introduce un título y un año válido.");
    return;
  }

  const newMovie = { id: nextId++, title, year };
  movies.push(newMovie);

  // Al añadir, seleccionamos la nueva (opcional, pero útil)
  selectedId = newMovie.id;

  titleInput.value = "";
  yearInput.value = "";
  renderMovies();
}

function editMovieById(id) {
  const movie = movies.find(m => m.id === id);
  if (!movie) return;

  const newTitle = prompt("Nuevo título:", movie.title);
  if (newTitle === null) return;

  const newYearStr = prompt("Nuevo año:", String(movie.year));
  if (newYearStr === null) return;

  const newYear = Number(newYearStr);

  if (!newTitle.trim() || Number.isNaN(newYear) || newYear <= 0) {
    alert("Datos no válidos.");
    return;
  }

  movie.title = newTitle.trim();
  movie.year = newYear;
  renderMovies();
}

function deleteMovieById(id) {
  movies = movies.filter(m => m.id !== id);

  // Si borramos la seleccionada, quitamos selección
  if (selectedId === id) selectedId = null;

  renderMovies();
}

// ----------------------
// Eventos
// ----------------------

// Botón grande: Añadir
addBtn.addEventListener("click", addMovie);

// Botón grande: Editar (sobre selección)
editBtn.addEventListener("click", () => {
  if (selectedId === null) {
    alert("Selecciona una película de la lista para editar.");
    return;
  }
  editMovieById(selectedId);
});

// Botón grande: Eliminar (sobre selección)
deleteBtn.addEventListener("click", () => {
  if (selectedId === null) {
    alert("Selecciona una película de la lista para eliminar.");
    return;
  }
  const movie = movies.find(m => m.id === selectedId);
  const ok = confirm(`¿Eliminar "${movie?.title ?? "película"}"?`);
  if (!ok) return;

  deleteMovieById(selectedId);
});

// Click en la lista:
// - Si pinchas en un item: selecciona
// - Si pinchas en botones pequeños: ejecuta acción
movieList.addEventListener("click", (e) => {
  const li = e.target.closest("li.item");
  if (!li) return;

  const id = Number(li.dataset.id);
  if (Number.isNaN(id)) return;

  // Si se pulsa un botón dentro del li
  const btn = e.target.closest("button[data-action]");
  if (btn) {
    const action = btn.dataset.action;

    if (action === "edit") {
      selectedId = id;
      renderMovies();
      editMovieById(id);
      return;
    }

    if (action === "delete") {
      const movie = movies.find(m => m.id === id);
      const ok = confirm(`¿Eliminar "${movie?.title ?? "película"}"?`);
      if (!ok) return;

      deleteMovieById(id);
      return;
    }
  }

  // Si no era botón, era click normal: seleccionar
  selectedId = id;
  renderMovies();
});

// Render inicial
renderMovies();