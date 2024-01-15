"use strict";

if(window.location.href.includes("error=true") ){
  document.body.innerHTML+='<p class="notice">Se ha producido un error al hacer login. \
  Revise los datos e inténtelo de nuevo</p>';
}