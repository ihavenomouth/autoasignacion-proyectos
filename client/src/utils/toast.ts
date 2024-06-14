export enum ToastStyle {
  SUCCESS,
  ERROR,
  INFO,
}


//1.- Creamos la división en la que añadiremos las notificaciones
const divToastArea = document.createElement("div");
divToastArea.classList.add("fixed", "right-16", "top-4", "w-80", "h-0", "z-[100]");
document.body.append(divToastArea);




export const createToast = (texto:string, estilo: ToastStyle, duración: number) => {
  const divToast = document.createElement("div");
  divToast.classList.add("p-4", "m-4", "text-black", "dark:text-white", "rounded", "shadow-md",  "min-w-64");
  if(estilo == ToastStyle.SUCCESS)
    divToast.classList.add("bg-green-400/50");
  else if(estilo == ToastStyle.ERROR)
    divToast.classList.add("bg-red-400/50");
  else if(estilo == ToastStyle.INFO)
    divToast.classList.add("bg-blue-400/50");

  divToast.innerText=texto;
  divToastArea.append(divToast);

  setTimeout( ()=>{
    divToast.remove();
  }
  ,duración);
}


export const createSpinner = () => {
  const divToast = document.createElement("div");
  divToast.classList.add("w-8", "h-8", "border-orange-300", "dark:border-orange-500", "border-4", "rounded-lg", "animate-spin", "mx-auto");
  
  const divToast2 = document.createElement("div");
  divToast2.classList.add("w-6", "h-6", "border-slate-400", "dark:border-slate-400", "border-4", "rounded-full", "animate-ping");

  divToast.append(divToast2);
  divToastArea.append(divToast);

  const eliminarSpinner = ()=>{
    divToast.remove();
  }
  return eliminarSpinner;
}

// export {createToast, ToastStyle};

//1.- Creamos la división en la que añadiremos las notificaciones
// const divToastArea = document.createElement("div");
// divToastArea.style.position="fixed";
// divToastArea.style.top=0;
// divToastArea.style.right="1rem";
// // divToastArea.style.backgroundColor="red";
// divToastArea.style.width="300px";
// divToastArea.style.height="100px";
// document.body.append(divToastArea);