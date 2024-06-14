import { TypeProyecto } from "../../types/types";
import useProyectoStore from "../../zustand/proyectoStore";

type TablaProyectosRowProps = {
  // key: number;
  proyecto: TypeProyecto;
}

const TablaProyectosRow = ( {proyecto}: TablaProyectosRowProps ) =>{
    //El estado global con Zustand
    const { deleteProyecto, setProyectoEditar } = useProyectoStore();
    
  return(
    <tr className="hover:bg-orange-500/10 dark:hover:bg-slate-700/20"> 

      <td scope="col" className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200">{proyecto.nombre}</td>

      <td scope="col" className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200">
        <pre className="font-sans overflow-x-auto whitespace-pre-wrap">
          {
            proyecto.descripcion.length > 350 ?
          proyecto.descripcion.substring(0,350)+ "..."
          : proyecto.descripcion
          }
        </pre>
      </td>

      <td scope="col" 
      className="px-6 py-4 text-sm font-medium">
  
        <button 
          // onClick={ ()=>alert(proyecto.id) }
          onClick={ ()=>{
            setProyectoEditar(proyecto);
            window.HSOverlay.open('#hs-overlay-editarproyecto')
          }}
        className="inline-flex w-fit items-center gap-x-2 text-sm font-semibold  text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400"
        data-hs-overlay="#hs-overlay-editarproyecto">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          Editar
        </button>

        <button 
          onClick={()=>deleteProyecto(proyecto.id)} 
          className="inline-flex w-fit items-center gap-x-2 text-sm font-semibold text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:hover:text-orange-400">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
          Eliminar
        </button>
  
      </td>
  </tr>
  );
}

export default TablaProyectosRow;
