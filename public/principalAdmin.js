"use strict";

////////////
//
//////////////
/**
 * cargarCursos
 * Accede a la base de datos y recupera la pregunta y las posibles opciones
 */
async function cargarCursosYEncuestas() {
  //1.- Recuperamos los cursos
  let res = await fetch("/getCursos", {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargados los cursos");

  //2.- Cargamos los cursos en el select
  const txtCurso = document.querySelector("#txtCurso");

  response.forEach( v=>{
    txtCurso.innerHTML+=`<option value="${v.id}">${v.id}-${v.id+1}</option>`;
  });
  
  txtCurso.addEventListener('change', e=>{
    curso=e.target.value;
    document.querySelector("#txtCursoCrearEncuesta").value = curso;
    document.querySelector("#txtCursoCrearPregunta").value = curso;
    cargarEncuestas(curso);
  });
  
  cargarEncuestas(curso);
  //console.table(response);
  
}

async function cargarEncuestas(curso) {
    //1.- Recuperamos las encuestas del curso
  let res = await fetch("/getEncuestas?curso="+curso, {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargadas las encuestas del curso " + curso);

  //2.- Cargamos los cursos en el select
  const txtEncuestaCrearPregunta = document.querySelector("#txtEncuestaCrearPregunta");

  txtEncuestaCrearPregunta.innerHTML="";
  response.forEach( v=>{
    txtEncuestaCrearPregunta.innerHTML+=`<option value="${v.id}">${v.nombre}</option>`;
  });

}


/////////////
// MAIN
/////////////
let curso=2023;
cargarCursosYEncuestas();
let nombreAlumno = (new URL(window.location)).searchParams.get("alumno");

document.querySelector("#pNombre").innerHTML ="Bienvenido, "+nombreAlumno + ', puedes ir a la <a href="/principal?alumno='+nombreAlumno+'">página principal en este enlace</a>.';
document.querySelector("#pNombre").innerHTML +=' También puedes ir a <a href="/resultadosAdmin?alumno="'+nombreAlumno+'>la página de resultados</a>.';
  
document.querySelector("#txtCursoCrearEncuesta").value = curso;
document.querySelector("#txtCursoCrearPregunta").value = curso;

