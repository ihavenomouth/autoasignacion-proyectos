import useProyectoStore from "../../zustand/proyectoStore";

const FormVerProyectos = ( ) =>{
  const { fetchProyectos } = useProyectoStore();

  //TODO: usar un rol en vez del login

  return(<div className="mt-4 border-2 border-slate-500 p-4 flex gap-4">
    <button onClick={()=>fetchProyectos()} type="button" 
      className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 hover:bg-orange-400 dark:bg-orange-700  dark:hover:bg-orange-600  disabled:contrast-50 disabled:pointer-events-none"
    >
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
    Recargar lista
    </button>
    
    {localStorage.getItem("email")=="j@j.es"?
    <button type="button" 
      className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 hover:bg-orange-400 dark:bg-orange-700  dark:hover:bg-orange-600  disabled:contrast-50 disabled:pointer-events-none"
      data-hs-overlay="#hs-overlay-nuevoproyecto"
    >
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
    Nuevo proyecto
    </button>
    :<></>
  }

  </div>);
}
export default FormVerProyectos;