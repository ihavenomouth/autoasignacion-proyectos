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
    cargarEncuestas(curso);
    cargarAlumnos(curso)
  });
  
  cargarEncuestas(curso);
  cargarAlumnos(curso);
  //console.table(response);
  
}


/**
*/
async function cargarEncuestas(curso) {
    //1.- Recuperamos las encuestas del curso
  let res = await fetch("/getEncuestas?curso="+curso, {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargadas las encuestas del curso " + curso);

  //2.- Cargamos las encuestas en el select
  const txtEncuesta = document.querySelector("#txtEncuesta");
  txtEncuesta.innerHTML ="";
  response.forEach( v=>{
    txtEncuesta.innerHTML+=`<option value="${v.id}">${v.nombre}</option>`;
  });
}



/**
*/
async function cargarAlumnos(curso) {
    //1.- Recuperamos las encuestas del curso
  let res = await fetch("/getAlumnos?curso="+curso, {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargados los alumnos");

  //2.- Cargamos los alumnos en el select
  const txtAlumnoExaminado = document.querySelector("#txtAlumnoExaminado");
  txtAlumnoExaminado.innerHTML ="";
  response.forEach( v=>{
    txtAlumnoExaminado.innerHTML+=`<option value="${v.id}">${v.nombre}</option>`;
  });
}





async function cargarPreguntas() {
  //0.- Rcuperamos el id de la encuesta a cargar
  let encuesta = document.querySelector("#txtEncuesta").value;
  if(encuesta==""){
    alert("Tienes que seleccionar una encuesta");
    return;
  }
    //1.- Recuperamos las encuestas del curso
  let res = await fetch("/getPreguntas?encuesta="+encuesta, {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargadas las preguntas");

  //2.- Cargamos las preguntas
  //console.log(response);
  document.querySelector("#fieldPreguntas").classList.remove("oculto");
  const divPreguntas = document.querySelector("#divPreguntas");
  
  divPreguntas.innerHTML = "Cargando...";
  let s='';
  response.forEach( v=>{
    s+='<div class="pregunta">';
    s+=`<p class="pregunta"><strong>Pregunta:</strong> ${v.nombre}</p>`;
    s+=`<p>${v.texto}</p>`;
    s+=`<p>Peso: ${v.peso}</p>`;
    s+=`  <select id="txtNota-${v.id}" data-id="${v.id}" data-peso="${v.peso}">
            <option value="0"> Mal, copiado o incompleto</option>
            <option value="0.25"> Sin terminar, errores importantes</option>
            <option value="0.5"> Lo mínimo exigible</option>
            <option value="0.75"> Bien aunque con errores</option>
            <option value="1"> Perfecto o muy bien</option>
          </select>`;
    s+='</div>';
  });
  divPreguntas.innerHTML=s;  
}


/* Cuandos se pulsa el botón de de puntuar */
const mandarPuntos = async (e) =>{
  
  //let formdata = new FormData();
  
  //formdata.append("txtEncuesta", window.txtEncuesta.value);
  //formdata.append("txtAlumnoExaminado", window.txtAlumnoExaminado.value);
  
  let arrRespuestas=[];
  window.frmPuntuar.querySelectorAll("div.pregunta select").forEach(r=>{
    let resp={
      "id" : r.dataset.id,
      "peso" : r.dataset.peso,
      "nota" : r.value 
    };
    arrRespuestas.push(resp);
  });
  //formdata.append("arrRespuestas", JSON.stringify(arrRespuestas));
  
  //console.log(formdata);
  let datos = {
    txtEncuesta : window.txtEncuesta.value,
    txtAlumnoExaminado : window.txtAlumnoExaminado.value,
    arrRespuestas : JSON.stringify(arrRespuestas)
  }
  console.log(datos);
  
  let res = await fetch("/puntuar", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-Type": "application/json" },
    //headers: { "Content-Type": "multipart/form-data" },
  });
  let response = await res.json();
  console.log(response.message);
  const dialogo = document.querySelector("#dialogo");
  const pDialogo = document.querySelector("#dialogo p");
  const pDialogoSummary = document.querySelector("#dialogo summary");
  pDialogo.innerHTML = response.detalle;
  pDialogoSummary.innerHTML = response.mensaje;
  dialogo.showModal();
}


/////////////
// MAIN
/////////////
let curso=2023;
cargarCursosYEncuestas();
let nombreAlumno = (new URL(window.location)).searchParams.get("alumno");

document.querySelector("#pNombre").innerHTML ="Bienvenido, "+nombreAlumno + '.';
document.querySelector("#btnCargarPreguntas").addEventListener('click', cargarPreguntas);
document.querySelector("#btnPuntuar").addEventListener("click", mandarPuntos);