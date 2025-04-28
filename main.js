class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = {};
    }

    inscribirMateria(materia) {
        this.materias.push(materia);
    }

    asignarCalificacion(materia, calificacion) {
        this.calificaciones[materia] = calificacion;
    }

    obtenerPromedio() {
        const calificaciones = Object.values(this.calificaciones);
        const suma = calificaciones.reduce((acc, curr) => acc + curr, 0);
        return calificaciones.length ? suma / calificaciones.length : 0;
    }
}

class Grupo {
    constructor(nombre) {
        this.nombre = nombre;
        this.alumnos = [];
    }

    agregarAlumno(alumno) {
        this.alumnos.push(alumno);
    }

    obtenerPromedioGrupo() {
        const sumaPromedios = this.alumnos.reduce((acc, alumno) => acc + alumno.obtenerPromedio(), 0);
        return this.alumnos.length ? sumaPromedios / this.alumnos.length : 0;
    }
}

const alumnos = [];
const grupos = [];

document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('name').value;
    const apellidos = document.getElementById('surname').value;
    const edad = document.getElementById('age').value;

    const alumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(alumno);
    guardarDatos();
    mostrarAlumnos();
});

document.getElementById('group-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreGrupo = document.getElementById('group-name').value;

    const grupo = new Grupo(nombreGrupo);
    grupos.push(grupo);
    guardarDatos();
    mostrarGrupos();
});

function mostrarAlumnos() {
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');
        studentDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${alumno.nombre}</p>
            <p><strong>Apellidos:</strong> ${alumno.apellidos}</p>
            <p><strong>Edad:</strong> ${alumno.edad}</p>
            <p><strong>Materias:</strong> ${alumno.materias.join(', ')}</p>
            <p><strong>Calificaciones:</strong> ${JSON.stringify(alumno.calificaciones)}</p>
            <p><strong>Promedio:</strong> ${alumno.obtenerPromedio()}</p>
            <button onclick="inscribirMateria(${index})">Inscribir Materia</button>
            <button onclick="asignarCalificacion(${index})">Asignar Calificación</button>
            <button onclick="agregarAlumnoAGrupo(${index})">Agregar a Grupo</button>
        `;
        studentsList.appendChild(studentDiv);
    });
}

function mostrarGrupos() {
    const groupsList = document.getElementById('groups-list');
    groupsList.innerHTML = '';
    grupos.forEach((grupo, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        groupDiv.innerHTML = `
            <p><strong>Nombre del Grupo:</strong> ${grupo.nombre}</p>
            <p><strong>Alumnos:</strong> ${grupo.alumnos.map(alumno => alumno.nombre).join(', ')}</p>
            <p><strong>Promedio del Grupo:</strong> ${grupo.obtenerPromedioGrupo()}</p>
        `;
        groupsList.appendChild(groupDiv);
    });
}

function inscribirMateria(index) {
    const materia = prompt('Ingrese la materia:');
    alumnos[index].inscribirMateria(materia);
    guardarDatos();
    mostrarAlumnos();
}

function asignarCalificacion(index) {
    const materia = prompt('Ingrese la materia:');
    const calificacion = parseFloat(prompt('Ingrese la calificación:'));
    alumnos[index].asignarCalificacion(materia, calificacion);
    guardarDatos();
    mostrarAlumnos();
}

function agregarAlumnoAGrupo(index) {
    const nombreGrupo = prompt('Ingrese el nombre del grupo:');
    const grupo = grupos.find(grupo => grupo.nombre === nombreGrupo);
    if (grupo) {
        grupo.agregarAlumno(alumnos[index]);
        guardarDatos();
        mostrarGrupos();
    } else {
        alert('Grupo no encontrado');
    }
}

function buscarPorNombre() {
    const nombre = document.getElementById('search-name').value;
    const resultados = alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());
    mostrarResultadosBusqueda(resultados);
}

function buscarPorApellido() {
    const apellido = document.getElementById('search-surname').value;
    const resultados = alumnos.filter(alumno => alumno.apellidos.toLowerCase() === apellido.toLowerCase());
    mostrarResultadosBusqueda(resultados);
}

function mostrarResultadosBusqueda(resultados) {
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = '';
    resultados.forEach((alumno, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');
        studentDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${alumno.nombre}</p>
            <p><strong>Apellidos:</strong> ${alumno.apellidos}</p>
            <p><strong>Edad:</strong> ${alumno.edad}</p>
            <p><strong>Materias:</strong> ${alumno.materias.join(', ')}</p>
            <p><strong>Calificaciones:</strong> ${JSON.stringify(alumno.calificaciones)}</p>
            <p><strong>Promedio:</strong> ${alumno.obtenerPromedio()}</p>
            <button onclick="inscribirMateria(${index})">Inscribir Materia</button>
            <button onclick="asignarCalificacion(${index})">Asignar Calificación</button>
            <button onclick="agregarAlumnoAGrupo(${index})">Agregar a Grupo</button>
        `;
        studentsList.appendChild(studentDiv);
    });
}

function obtenerPromedioGrupo() {
    const sumaPromedios = alumnos.reduce((acc, alumno) => acc + alumno.obtenerPromedio(), 0);
    return alumnos.length ? sumaPromedios / alumnos.length : 0;
}
        
           
function ordenarPorCalificacion(ascendente = true) {
                return alumnos.sort((a, b) => {
                    const promedioA = a.obtenerPromedio();
                    const promedioB = b.obtenerPromedio();
                    return ascendente ? promedioA - promedioB : promedioB - promedioA;
                });
            }
            
            function guardarDatos() {
                localStorage.setItem('alumnos', JSON.stringify(alumnos));
            }
            
            function cargarDatos() {
                const datos = localStorage.getItem('alumnos');
                if (datos) {
                    const parsedData = JSON.parse(datos);
                    parsedData.forEach(data => {
                        const alumno = new Alumno(data.nombre, data.apellidos, data.edad);
                        alumno.materias = data.materias;
                        alumno.calificaciones = data.calificaciones;
                        alumnos.push(alumno);
                    });
                    mostrarAlumnos();
                }
            }
            
            window.onload = cargarDatos;
            