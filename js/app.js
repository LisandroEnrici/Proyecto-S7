// VARIABLES GLOBALES
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody')

// EVENTLISTENERS
cargarEventListeners();

function cargarEventListeners() {
    //Click agregar carrito
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    listaCarrito.addEventListener('click', quitarCurso);

}


// FUNCIONES

// Añadr curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation:
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        const infoCurso = leerInfoCurso(curso);
        insertarEnCarrito(infoCurso);
    } else {console.log('no')};
}

// Lee los datos de la info card de curso
function leerInfoCurso(curso) {
    const infoCurso = {
        imagenSrc: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };
    return infoCurso;
}

// Agrega al carrito el curso segun info del parámetro
function insertarEnCarrito(infoCurso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${infoCurso.imagenSrc}" width=100></td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td><a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a></td>
        `
    listaCarrito.appendChild(row);
}

// Quita un curso del carrito
function quitarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}