import { ToastStyle, createSpinner, createToast } from "../../utils/toast";





export const fetchProyectos = (referencia:React.RefObject<HTMLTableSectionElement>) =>{
  //Realizamos un fetch a /proyecto para recuperar el array de proyectos
  if(referencia.current)
    referencia.current.innerHTML="";

  fetch('/proyecto')
  .then(response => response.json() )
  .then(json => {
    if(json.length==0){
      if(referencia.current){
        referencia.current.innerHTML += `<tr>
          <td colspan="3" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">No hay ningún proyecto</td>
          </tr>`;
      }
    }
    for(const proyecto of json ){
      // console.log(proyecto.nombre);
      if(referencia.current){
        const tr = document.createElement("tr");
        referencia.current.appendChild(tr);
        
        const td1 = document.createElement("td");
        td1.className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200";
        td1.innerText=proyecto.nombre;
        
        const td2 = document.createElement("td");
        td2.className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200";
        td2.innerText=proyecto.descripcion;
        
        //Acciones:
        const td3 = document.createElement("td");
        td3.className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex flex-col gap-4";

        const buttonEditar = document.createElement("button");
        buttonEditar.className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400";
        buttonEditar.innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>Editar';
        buttonEditar.addEventListener("click", ()=>editarProyecto( proyecto.id, referencia ));
        td3.append(buttonEditar);

        const buttonEliminar = document.createElement("button");
        buttonEliminar.className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400";
        buttonEliminar.innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>Eliminar';
        buttonEliminar.addEventListener("click", ()=>eliminarProyecto( proyecto.id, referencia ));
        td3.append(buttonEliminar);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
      }
    }
  })
  .catch(error => console.log( error ) );
}




//TODO: Editar proyecto
const editarProyecto=(id:number, referencia:React.RefObject<HTMLTableSectionElement>)=>{
  alert("TODO: Editar proyecto "+id + referencia);
}








/**
 * Elimina el proyecto cuyo id se pasa como parámetro
 * @param id - Proyecto a eliminar
 */
const eliminarProyecto=(id:number, referencia:React.RefObject<HTMLTableSectionElement>)=>{
  // const submitter = (ev.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
  // submitter.disabled = true;

  const eliminarSpinner = createSpinner();

  fetch("/proyecto/"+id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
  })
    .then(response => {
      if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
      return response.json();
    })
    .then(data => {
      if (data.message) {
        createToast("Proyecto eliminado correctamente", ToastStyle.SUCCESS, 1000);
        setTimeout(() => {
          eliminarSpinner();
          fetchProyectos(referencia);
          // submitter.disabled = false;
        }, 1000);
      } else {
        createToast("Se produjo un error al intentar realizar la operación", ToastStyle.ERROR, 3000);
        eliminarSpinner();
        // submitter.disabled = false;
      }
    })
    .catch(error => {
      createToast("Se produjo un error al eliminar el proyecto", ToastStyle.ERROR, 3000);
      console.log(error);
      // submitter.disabled = false;
      eliminarSpinner();
    });
}
