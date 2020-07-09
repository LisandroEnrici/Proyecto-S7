// VARIABLES GLOBALES
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// EVENTLISTENERS
cargarEventListeners();

function cargarEventListeners() {
    //Click agregar carrito
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    listaCarrito.addEventListener('click', quitarCurso);

    //Cuando vacia el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Cargar DOM con datos del LS
    document.addEventListener('DOMContentLoaded', cargarCarritoLS)
};


// FUNCIONES

// Añadr curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation:
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        const infoCurso = leerInfoCursoCard(curso);
        insertarEnCarrito(infoCurso);
        guardarCursoLS(infoCurso);
    };
};

// Lee los datos de la info card de curso
function leerInfoCursoCard(curso) {
    const infoCurso = {
        imagenSrc: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };
    return infoCurso;
};

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
};

// Quita un curso del carrito
function quitarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        let curso = e.target.parentElement.parentElement;
        let idCurso = leerIdCursoCarrito(curso);
        borrarCursoLS(idCurso);

        curso.remove();
    };
};

//Limpia el listado de carritos
function vaciarCarrito(e) {
    e.preventDefault();
    //Forma lenta pero facil
    //listaCarrito.innerHTML = '';

    //Forma rapida y recomendada
    while(listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    };
    //Vaciar local Storage
    localStorage.setItem('cursos', '[]');

    return false; //Para que no se cierre el carrito cuando limpias
};

//Almacena curso en el carrito en LS
function guardarCursoLS(infoCurso) {
    let cursosLS;
    cursosLS = obtenerCursosLS();

    //El curso seleccionado se agrega al arreglo
    cursosLS.push(infoCurso);

    localStorage.setItem('cursos', JSON.stringify(cursosLS))
};

// Devuelve arreglo con infoCursos del Local storage
function obtenerCursosLS() {
    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS =JSON.parse(localStorage.getItem('cursos'));
    };

    return cursosLS;
};

function cargarCarritoLS() {
    let cursosLS = obtenerCursosLS();

    cursosLS.forEach(function(curso) {
        
        insertarEnCarrito(curso);
    });
};

function borrarCursoLS(idCurso) {
    let cursosLS = obtenerCursosLS();
    cursosLS.forEach(function(curso, index) {
        if(idCurso === curso.id) {
            cursosLS.splice(index, 1);
        };
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
};

function leerIdCursoCarrito(curso) {
    return curso.querySelector('a').getAttribute('data-id')
};