import { TypeProyecto } from "../../types/types";
import useProyectoStore from "../../zustand/proyectoStore";
import ModalDetalleProyecto from "./ModalDetalleProyexto";

import { useRef } from "react";

type TablaProyectosRowProps = {
  // key: number;
  proyecto: TypeProyecto;
}

const TablaProyectosRowAlumno = ( {proyecto}: TablaProyectosRowProps ) =>{

    //recuperamos el proyecto que tenga asignado el alumno
    const idproyecto = window.localStorage.getItem('idproyecto') ?? "";
    const idalumno = window.localStorage.getItem('idalumno') ?? "";

    //El estado global con Zustand
    const { asignarProyecto, liberarProyecto } = useProyectoStore();
    

  let boton = null;
  if( Number(idproyecto) === proyecto.id){
    boton =  <button 
      onClick={ ()=>{
        liberarProyecto(Number(idalumno));
      }}
    className="inline-flex w-fit items-center gap-x-2 text-sm font-semibold  text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400"
    data-hs-overlay="#hs-overlay-editarproyecto">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l-6 6v4h4l6 -6m1.99 -1.99l2.504 -2.504a2.828 2.828 0 1 0 -4 -4l-2.5 2.5" /><path d="M13.5 6.5l4 4" /><path d="M3 3l18 18" /></svg>
      Liberar
    </button>
  }
  else if(proyecto.idalumno==null){
    boton =  <button 
      onClick={ ()=>{
        asignarProyecto( Number(idalumno), proyecto.id);
      }}
    className="inline-flex w-fit items-center gap-x-2 text-sm font-semibold  text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400"
    data-hs-overlay="#hs-overlay-editarproyecto">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
      Apuntarme
    </button>
  }
  else{
    boton =  <button title="Proyecto ya asignado (intentar apuntarme igualmente por si se liberase)"
    onClick={ ()=>{
      asignarProyecto( Number(idalumno), proyecto.id);
      // window.HSOverlay.open('#hs-overlay-editarproyecto')
    }}
  className="inline-flex w-fit items-center gap-x-2 text-sm font-semibold  text-orange-700 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-700 dark:hover:text-orange-400"
  data-hs-overlay="#hs-overlay-editarproyecto">
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-question"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 20l6 -6l3 -3l1.5 -1.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z" /><path d="M13.5 6.5l4 4" /><path d="M19 22v.01" /><path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
    Asignado
  </button>
  }

  const refModal = useRef<HTMLDivElement>(null);

  return(
    <tr className="hover:bg-orange-500/10 dark:hover:bg-slate-700/20"> 

      <td scope="col" className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">{proyecto.nombre}</td>

      <td scope="col" className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200">
        
        {/* <button type="button" onClick={
          
          ()=>{
            // window.HSOverlay.open('#'+refModal);
            refModal.current.classList.remove('hidden');
          }
        }>  YEAH    
        </button>  */}

        {/* <button type="button" data-hs-overlay={"#hs-modal"+proyecto.id}> */}
        <button type="button" onClick={()=>{
          window.HSStaticMethods.autoInit();
          window.HSOverlay.open("#hs-modal"+proyecto.id);
        }}> 
        <pre className="font-sans overflow-x-auto whitespace-pre-wrap">
          {
            proyecto.descripcion.length > 350 ?
          proyecto.descripcion.substring(0,350)+ "..."
          : proyecto.descripcion
          }
        </pre>
        </button>

        <ModalDetalleProyecto title={proyecto.nombre} referencia={refModal} identificador={"hs-modal"+proyecto.id}>
          <pre className="font-sans overflow-x-auto whitespace-pre-wrap">{proyecto.descripcion}</pre>
        </ModalDetalleProyecto>

      </td>

      <td scope="col" 
      className="px-6 py-4 text-sm font-medium">

          {boton}
  
      </td>
  </tr>
  );
}

export default TablaProyectosRowAlumno;
