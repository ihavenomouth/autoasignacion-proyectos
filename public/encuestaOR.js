"use strict"

////////////////////
// FUNCTIONS
/////////////////



function crearGráficoNormalizado(){
    // 1.- Habrá que averiguar cuál es el número más grande (el valor máximo) en el array listaNumeros.
    //     Esa información la guardaremos en la variable valorMaximo
    let valorMaximo = respuestas.reduce( (max, actual) => { return (max>actual.contador ? max : actual.contador);},0); //el último 0 es el valor inicial

    //var valorMaximo = Math.max(...listaNumeros); //mucho más rápido

    
    // 2.- Crear un array numerosNormalizados con los mismos elementos del array listaNumeros donde los números
    //     sean los números normalizados. Para normalizar los valores, se usará la siguiente
    //     fórmula (una regla de 3):
    //     nuevoValor = valor*500/valorMaximo
    let numerosNormalizados = respuestas.map( (valor)=>{return valor.contador*500/valorMaximo;} );    

    // 3.- Llamar a la función crearGrafico(numerosNormalizados);
    crearGrafico(numerosNormalizados);
}

function crearGrafico(numeros){
    divGrafico.innerHTML="";
    
    numeros.forEach( (valor,i) => {
        divGrafico.innerHTML+='<div style="width: '+valor+'px;">'+respuestas[i].contador+'</div>';
    });
}

/**
* mostrarResultados
* Muestra los resultados de la encuesta actualmente
*/
const mostrarResultados = () => {
  //1.- Recorremos el array de respuestas mostrando su contenido
  for(let r of respuestas){
    divResultado.innerHTML+=`<p>Id: ${r.id} - Texto: ${r.texto} - Votos: ${r.contador}</p>`;
  }
  
  //TODO: terminarlo para que muestre un gráfico
  crearGráficoNormalizado();
}



/**
* votar
* Aumenta en la base de datos el contador de votos de la respuesta
*/
const votar = (arrIdRespuestas) => {
  for(let r of arrIdRespuestas){  
    let data = { respuesta_id: r };
 
    let res = fetch("/votar", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
//  let response =  await res.json();
 
//  console.log( response.id );
//  console.log("Último id: "+response.id);
//  idEncuesta= response.id;
//  divResultado.innerHTML=`<p>Encuesta con id <strong>${idEncuesta}</strong> creada correctamente</p>`;
  }
}



/**
* votarEncuesta
* Permite votar por las opciones que nos interesen en una encuesta y ver el resultado 
*/
const votarEncuesta = async (e) => {
  //1.- Borro el contenido de la división resultado
  divResultado.innerHTML="";
  
  //2.- Recopilar los id de las respuestas marcadas
  //Y si no se ha marcado ninguna, se mostrarán los resultados
  let arrIdRespuestasMarcadas=[];
 document.querySelectorAll('input[type="checkbox"]:checked').forEach(e=>{
   arrIdRespuestasMarcadas.push(e.id)
   
   //recogemos la respuesta que corresponde a la marcada e incrementamos su contador
   let res=respuestas.find(r => r.id == e.id );
   res.contador++;
 });
  
  
  // console.log(arrIdRespuestasMarcadas);
  
  //3.- Si se ha marcado alguna respuesta, se procede a la votación
  if(arrIdRespuestasMarcadas.length!=0){
    votar(arrIdRespuestasMarcadas);
  }
  
  mostrarResultados();
  
// //   divResultado.innerHTML=`<p>${pregunta.value}</p>`;
  
  
//   //2.- Generarse un id de encuesta
//   // un hash aleatorio en el servidor?
  
//   //3.- Escribir la pregunta en la tabla y recuperar el id de la encuesta
  
//   let data = { pregunta: pregunta.value };
  
//   let idEncuesta; //el id de la encuesta que se ha creado
  
  
//   let res = await fetch("/addEncuesta", {
//      method: "POST",
//      body: JSON.stringify(data),
//      headers: { "Content-Type": "application/json" }
//    })
//  let response =  await res.json();
 
//  console.log( response.id );
//  console.log("Último id: "+response.id);
//  idEncuesta= response.id;
//  divResultado.innerHTML=`<p>Encuesta con id <strong>${idEncuesta}</strong> creada correctamente</p>`;

  
  
//  //4.- Escribir todas las respuestas
//  let arrRespuestas=[];
//  document.querySelectorAll(".respuesta").forEach(e=> arrRespuestas.push(e.value)  );
  
 
//  data= {idEncuesta: idEncuesta, respuestas: arrRespuestas};
//  res = await fetch("/addRespuestas", {
//      method: "POST",
//      body: JSON.stringify(data),
//      headers: { "Content-Type": "application/json" }   
//  })
//  response =  await res.json();
//  divResultado.innerHTML+=`<p>Creadas las respuestas para la encuesta con id <strong>${idEncuesta}</strong></p>`;
  
//   //5.- Indicamos la url donde responder la encuesta
//   divResultado.innerHTML+=`<p>Puede contestar la encuesta aquí: <a href="https://encuesta-sql.glitch.me/encuesta?id=${idEncuesta}">https://encuesta-sql.glitch.me/encuesta?id=${idEncuesta}</a></p>`;

  
}



/**
* cargarEncuesta
* Accede a la base de datos y recupera la pregunta y las posibles opciones
*/
async function cargarEncuesta(){
 //1.- Recuperamos el id de la encuesta de la URL
 let idEncuesta=Number(window.location.href.split("=")[1]);
  
 //2.- Recuperamos los datos de la encuesta
 let res = await fetch("/getEncuesta?id="+idEncuesta, {
     method: "GET",
     // body: JSON.stringify(data),
     headers: { "Content-Type": "application/json" }   
 })
 let response =  await res.json();
 divResultado.innerHTML+=`<p>Cargada la encuesta con id <strong>${idEncuesta}</strong></p>`;
  
  
 //3.- Cargamos la pregunta leída
 pregunta.innerHTML = response.pregunta;
  
 //4.- Cargamos las posibles respuestas
  divRespuestas.innerHTML="";
  response.respuestas.forEach( (e,i,a) =>{
    divRespuestas.innerHTML+=`<input type="checkbox" id="${e.id}" name="respuestas" value="${e.texto}">`;
    divRespuestas.innerHTML+=`<label for="${e.id}">${e.texto}</label><br>`;
    
  });
  
  respuestas= response.respuestas;

}

////////////////////
//MAIN
/////////////////

let respuestas; //array que contiene los objetos que representan las repuestas

let divResultado=document.getElementById("divResultado");
let divGrafico=document.getElementById("divGrafico");
let pregunta = document.getElementById("pregunta");
let divRespuestas=document.getElementById("divRespuestas");

document.querySelector("#btnVotar").addEventListener('click', votarEncuesta);


cargarEncuesta();