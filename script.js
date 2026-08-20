let movies = []
 
const inputEl   = document.getElementById("input-el")
const addBtn    = document.getElementById("addbtn")
const ulEl      = document.getElementById("ul-el")
const deleteBtn = document.getElementById("deletebtn")
const statsEl   = document.querySelector(".stats")
 
const savedMovies = JSON.parse(localStorage.getItem("movies"))
 
if (savedMovies) {
    movies = savedMovies
    renderMovies()
}

function renderMovies() {
    let listItems = ""
 
    for (let i = 0; i < movies.length; i++) {
        let watchedClass = ""
        if (movies[i].watched === true) {
            watchedClass = "watched"
        }
 
        let watchedBtnText = ""
        if (movies[i].watched === true) {
            watchedBtnText = "Unwatch"
        } else {
            watchedBtnText = "Watched"
        }
 
        listItems += `
            <li class="${watchedClass}">
                <span class="movie-title">${movies[i].title}</span>
                <div class="actions">
                    <button class="btn-watched" onclick="toggleWatched(${i})">${watchedBtnText}</button>
                    <button class="btn-delete"  onclick="deleteMovie(${i})">Delete</button>
                </div>
            </li>
        `
    }
 
    ulEl.innerHTML = listItems
    getCount()
}

function addMovie() {
    if (inputEl.value === "") {
        return
    }
 
    movies.push({ title: inputEl.value, watched: false })
    inputEl.value = ""
    localStorage.setItem("movies", JSON.stringify(movies))
    renderMovies()
}

 
function toggleWatched(index) {
    movies[index].watched = !movies[index].watched
    localStorage.setItem("movies", JSON.stringify(movies))
    renderMovies()
}

function deleteMovie(index) {
    movies.splice(index, 1)
    localStorage.setItem("movies", JSON.stringify(movies))
    renderMovies()
}

function getCount() {
    let watchedCount = 0
 
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].watched === true) {
            watchedCount += 1
        }
    }
 
    statsEl.innerHTML = `${movies.length} movies &nbsp;·&nbsp; <strong>${watchedCount} watched</strong>`
}

addBtn.addEventListener("click", addMovie)
 
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    movies = []
    renderMovies()
})