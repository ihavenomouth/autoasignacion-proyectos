"use strict"

////////////////////
// FUNCTIONS
/////////////////

/**
* todoCorrecto
* Comprueba si hay al menos dos respuestas y la pregunta está rellena
*/
const todoCorrecto = () =>{
  if(pregunta.value == ""){
    return false;
  }

  let respuestasConContenido=0;
  document.querySelectorAll(".respuesta").forEach(e => {
    if(e.value!=""){
    respuestasConContenido++;
    }
  });
  
  if(respuestasConContenido<2){
    return false;
  }
  
  return true;
}



const crearEncuesta = async (e) => {
  //1.- Borro el contenido de la divisioón resultado
  divResultado.innerHTML="";
   
  //2.- comprobaciones
  if( !todoCorrecto() ){
    divResultado.innerHTML="Debe rellenar la pregunta y al menos dos respuestas";
    return;
  }
  
  //3.- Escribir la pregunta en la tabla y recuperar el id de la encuesta
  
  let data = { pregunta: pregunta.value };
  
  let idEncuesta; //el id de la encuesta que se ha creado
  
  
  let res = await fetch("/addEncuesta", {
     method: "POST",
     body: JSON.stringify(data),
     headers: { "Content-Type": "application/json" }
   })
 let response =  await res.json();
 
 console.log( response.id );
 console.log("Último id: "+response.id);
 idEncuesta= response.id;
 divResultado.innerHTML=`<p>Encuesta con id <strong>${idEncuesta}</strong> creada correctamente</p>`;

  
  
 //4.- Escribir todas las respuestas
 let arrRespuestas=[];
 document.querySelectorAll(".respuesta").forEach(e=>{
   if(e.value !="")
     arrRespuestas.push(e.value)  
 });
  
 
 data= {idEncuesta: idEncuesta, respuestas: arrRespuestas};
 res = await fetch("/addRespuestas", {
     method: "POST",
     body: JSON.stringify(data),
     headers: { "Content-Type": "application/json" }   
 })
 response =  await res.json();
 divResultado.innerHTML+=`<p>Creadas las respuestas para la encuesta con id <strong>${idEncuesta}</strong></p>`;
  
  //5.- Indicamos la url donde responder la encuesta
  divResultado.innerHTML+=`<p>Puede contestar la encuesta aquí: <a href="https://encuesta-sql.glitch.me/encuesta?id=${idEncuesta}">https://encuesta-sql.glitch.me/encuesta?id=${idEncuesta}</a></p>`;

  
}


/**
* añadirRespuesta
* Añade un textbox para contener una respuesta
*/
const añadirRespuesta = (e) =>{

  //1.- Recuperamos los values en los inputs
  let arrRespuestas=[];
  
  document.querySelectorAll(".respuesta").forEach(e => {
    arrRespuestas.push(e.value);
  });
  
  //2.- Añado el textbox
  divRespuestas.innerHTML+='<input class="respuesta" placeholder="Escriba una respuesta" type="text">';
  
  //3.- Reescribo los valores en los inputs
  document.querySelectorAll(".respuesta").forEach( (e,i) => {
    if(i< arrRespuestas.length)
      e.value = arrRespuestas[i];
  });

}




////////////////////
//MAIN
/////////////////


let divResultado=document.getElementById("divResultado");
let divRespuestas = document.getElementById("divRespuestas");
let pregunta = document.getElementById("pregunta");

document.querySelector("#btnCrear").addEventListener('click', crearEncuesta);
document.querySelector("#btnRespuesta").addEventListener('click', añadirRespuesta);


  
  
  
  
  
  
  
// client-side js
// run by the browser each time your view template referencing it is loaded

// request the dreams from our app's sqlite database
// fetch("/getDreams", {})
//   .then(res => res.json())
//   .then(response => {
//     response.forEach(row => {
//       appendNewDream(row.dream);
//     });
//   });

// // a helper function that creates a list item for a given dream
// const appendNewDream = dream => {
// };

// // listen for the form to be submitted and add a new dream when it is
// dreamsForm.onsubmit = event => {
//   // stop our form submission from refreshing the page
//   event.preventDefault();

//   const data = { dream: dreamInput.value };

//   fetch("/addDream", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(res => res.json())
//     .then(response => {
//       console.log(JSON.stringify(response));
//     });
//   // get dream value and add it to the list
//   dreams.push(dreamInput.value);
//   appendNewDream(dreamInput.value);

//   // reset form
//   dreamInput.value = "";
//   dreamInput.focus();
// };


// clearButton.addEventListener('click', event => {
//   fetch("/clearDreams", {})
//     .then(res => res.json())
//     .then(response => {
//       console.log("cleared dreams");
//     });
//   dreamsList.innerHTML = "";
// });
