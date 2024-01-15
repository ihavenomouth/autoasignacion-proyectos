"use strict";

document.forms[0].addEventListener("submit", (e) => {
  const c1 = document.querySelector("#txtClave").value;
  const c2 = document.querySelector("#txtClave2").value;
  
  if (c1 != c2){ 
    e.preventDefault();
    let pErrores = document.querySelector("#errores");
    if(pErrores){
      pErrores.innerText="Las contraseñas no coinciden."
    }
    else{
      document.body.innerHTML+='<p id="errores" class="notice">Las contraseñas no coinciden.</p>';
    }
    return;
  }
});

if(window.location.href.includes("error=true") ){
  document.body.innerHTML+='<p class="notice">Se ha producido un error al realizar el registro. \
  Revise los datos e inténtelo de nuevo. También es posible que la cuenta ya exista.</p>';
}

/**
 * cargarCursos
 * Accede a la base de datos y recupera la pregunta y las posibles opciones
 */
async function cargarCursos() {
  //1.- Recuperamos los cursos
  let res = await fetch("/getCursos", {
    method: "GET",
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  console.log("Cargados los cursos");

  //2.- Cargamos los cursos en el select
  const txtCursos = document.querySelector("#txtCurso");

  response.forEach( v=>{
    txtCursos.innerHTML+=`<option value="${v.id}">${v.id}-${v.id+1}</option>`;
  });
  
  console.table(response);
}

cargarCursos();
