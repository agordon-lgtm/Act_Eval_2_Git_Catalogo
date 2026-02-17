const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");

const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBtn");

const movieList = document.getElementById("movieList");

let movies = [];
let nextId = 1;

function renderMovies() {
  movieList.innerHTML = "";

  for (const m of movies) {
    const li = document.createElement("li");
    li.className = "item";
    li.dataset.id = String(m.id);

  li.innerHTML = `
      <div>
        <strong>${m.title}</strong>
        <span class="badge">${m.year}</span>
      </div>
      <div class="actions">
        <button class="small del" data-action="delete">Eliminar</button>
      </div>
    `;


    movieList.appendChild(li);
  }
}

function addMovie() {
  const title = titleInput.value.trim();
  const year = parseInt(yearInput.value, 10);

  if (!title || Number.isNaN(year)) {
    alert("Introduce título y año.");
    return;
  }

  movies.push({ id: nextId++, title, year });
  titleInput.value = "";
  yearInput.value = "";
  renderMovies();
}
``

function deleteMovieById(id) {
  movies = movies.filter(m => m.id !== id);
  renderMovies();
}

// Solo funciona añadir al inicio
addBtn.addEventListener("click", addMovie);

// Estos eventos se completarán en ramas
deleteBtn.addEventListener("click", () => alert("Se implementa en rama eliminar"));
editBtn.addEventListener("click", () => alert("Se implementa en rama editar"));

movieList.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const li = e.target.closest("li.item");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (btn.dataset.action === "delete") {
    deleteMovieById(id);
  }
});

renderMovies();
