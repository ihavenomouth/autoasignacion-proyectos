import { ToastStyle, createSpinner, createToast } from "../../utils/toast";




export const fetchProyectos = (referencia:React.RefObject<HTMLTableSectionElement>) =>{

  //recuperamos el proyecto que tenga asignado
  const idproyecto = window.localStorage.getItem('idproyecto') ?? "";

  //Realizamos un fetch a /proyecto para recuperar el array de proyectos
  if(referencia.current)
    referencia.current.innerHTML="";

  fetch('http://localhost/proyecto')
  .then(response => response.json() )
  .then(json => {
    if(json.length==0){
      if(referencia.current){
        referencia.current.innerHTML += `<tr>
          <td colspan="3" className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 dark:text-neutral-200">No hay ningún proyecto</td>
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

        const buttonAccion = document.createElement("button");
        buttonAccion.className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400";

        if(idproyecto==proyecto.id){
          buttonAccion.innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l-6 6v4h4l6 -6m1.99 -1.99l2.504 -2.504a2.828 2.828 0 1 0 -4 -4l-2.5 2.5" /><path d="M13.5 6.5l4 4" /><path d="M3 3l18 18" /></svg>Liberar';
          buttonAccion.addEventListener("click", ()=>liberarProyecto( proyecto.id, referencia ));
        }else{
          // console.log(`proyecyo ${proyecto.id} asignado a +${proyecto.idalumno}+`)
          if(proyecto.idalumno==null){
            buttonAccion.innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>Apuntarme';
          }
          else{
            buttonAccion.innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-question"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 20l6 -6l3 -3l1.5 -1.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z" /><path d="M13.5 6.5l4 4" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>Ya asignado';
            buttonAccion.title="Ya asignado (intentar apuntarme igualmente por si queda liberado)";
          }
          buttonAccion.addEventListener("click", ()=>asignarProyecto( proyecto.id, referencia ));

        }
        td3.append(buttonAccion);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
      }
    }
  })
  .catch(error => console.log( error ) );
}





/**
 * libera el proyecto cuyo id se pasa como parámetro
 * @param idproyecto - Proyecto a eliminar
 */
const liberarProyecto=(idproyecto:number, referencia:React.RefObject<HTMLTableSectionElement>)=>{
  alert("Liberado "+idproyecto);
}


/**
 * asigna al alumno actual el proyecto cuyo id se pasa como parámetro
 * @param idproyecto - Proyecto a eliminar
 */
const asignarProyecto=(idproyecto:number, referencia:React.RefObject<HTMLTableSectionElement>)=>{
  // const submitter = (ev.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
  // submitter.disabled = true;

  const eliminarSpinner = createSpinner();
  const idalumno = window.localStorage.getItem('idalumno') ?? "";

  fetch("http://localhost/alumno/"+idalumno+"/asignar/"+idproyecto, {
    method: "PUT",
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
        createToast("Proyecto asignado correctamente", ToastStyle.SUCCESS, 1000);
        setTimeout(() => {
          eliminarSpinner();
          window.localStorage.setItem('idproyecto', String(idproyecto));
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
      createToast("Se produjo un error al asignar el proyecto ¿tal vez el proyecto ya esté asignado a otro alumno?", ToastStyle.ERROR, 3000);
      console.log(error);
      // submitter.disabled = false;
      eliminarSpinner();
    });
}
