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
    cargarAlumnos(curso);
  });
  
  cargarEncuestas(curso);
  cargarAlumnos(curso);
  //console.table(response);
  
}


/**
CARGAR ENCUESTAS
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

  //2.- Cargamos los cursos en el select
  const txtEncuesta = document.querySelector("#txtEncuesta");

  txtEncuesta.innerHTML="";
  response.forEach( v=>{
    txtEncuesta.innerHTML+=`<option value="${v.id}">${v.nombre}</option>`;
  });

}



/**
CARGAR ALUMNOS
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




async function cargarResultados() {
  //frmCargarResultados
  
  //0.- Rcuperamos el id de la encuesta a cargar
  let encuesta = document.querySelector("#txtEncuesta").value;
  let alumnoExaminado = document.querySelector("#txtAlumnoExaminado").value;
  
  if(encuesta==""){
    alert("Tienes que seleccionar una encuesta");
    return;
  }
  else if(curso==""){
    alert("Tienes que seleccionar un curso");
    return;
  }
  else if(alumnoExaminado==""){
    alert("Tienes que seleccionar un alumno");
    return;
  }
  
  
    //1.- Recuperamos las respuestas del curso
  let res = await fetch("/getResultados?encuesta="+encuesta+"&alumnoExaminado="+alumnoExaminado, {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargados los resultados");

  //2.- Cargamos las preguntas
  //console.log(response);
  borrar=response;
  const divResultado = document.querySelector("#divResultado");
  
  // Recuperamos los id de las preguntas (quitamos los repetidos)
  const arrIdPreguntas = response.map( r=>r.id_pregunta ).filter( (id,i,b)=> b.indexOf(id)==i  );

  divResultado.innerHTML = "Cargando...";
  //console.log(arrIdPreguntas)

  //por cada id de pregunta motramos los datos
  let preguntasMostrar = arrIdPreguntas.map( (idUnico)=>{  return response.filter( p=> {return idUnico == p.id_pregunta} )   })
  //borrar = preguntasMostrar;
  
  let sumaFinalNotas=0;
  let sumaFinalPesos=0;
  let s='';
  for(let arrPregunta of preguntasMostrar){
    let mediaNotas=0;
    s += `<table><tr><th colspan="2">${arrPregunta[0].nombre_pregunta}</th></tr>`;
    for(let respuesta of arrPregunta){
      s += `<tr><td>${respuesta.alumno}</td><td>${respuesta.nota} (${respuesta.peso})</td></tr>`;
      mediaNotas += respuesta.nota;
    }
    mediaNotas = mediaNotas / arrPregunta.length;
    sumaFinalPesos+=arrPregunta[0].peso;
    sumaFinalNotas+= (arrPregunta[0].peso*mediaNotas);
    s += `<tr><td>Media notas</td><td>${mediaNotas}</td></tr>`;    
    s+="</table>";
  }
  let notaFinal = sumaFinalNotas *10/sumaFinalPesos;
  divResultado.innerHTML= `<p>Nota final: ${notaFinal.toFixed(2)} (${sumaFinalNotas.toFixed(2)}/${sumaFinalPesos.toFixed(2)})</p>`+s;
  

  /*
  id_pregunta, nota, respuesta.peso as peso,pregunta.nombre as nombre_pregunta, alumno.nombre as alumno
  */
/*  divResultado.innerHTML = "Cargando...";
  let s='';
  response.forEach( v=>{
    s+=`<div>${v.alumno}: ${v.id_pregunta} - ${v.nombre_pregunta} - ${v.nota} - ${v.peso}</div>`;
  });
  divResultado.innerHTML=s;  
  */
}



/////////////
// MAIN
/////////////
let curso=2023;
cargarCursosYEncuestas();
let nombreAlumno = (new URL(window.location)).searchParams.get("alumno");

document.querySelector("#pNombre").innerHTML ="Bienvenido, "+nombreAlumno + ', puedes ir a la <a href="/principal?alumno='+nombreAlumno+'">página principal en este enlace</a>.';
document.querySelector("#pNombre").innerHTML +=' También puedes ir a <a href="/principalAdmin?alumno="'+nombreAlumno+'>la página de administración</a>.';

document.querySelector("#btnCargarResultados").addEventListener('click', cargarResultados);

let borrar;