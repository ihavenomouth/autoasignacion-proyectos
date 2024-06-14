import { useRef } from "react";
import { ToastStyle } from "../../utils/Toast";
import Input from "../Input";
import Checkbox from "../Checkbox";
import useProyectoStore from "../../zustand/proyectoStore";
import useToastStore from "../../zustand/toastStore";
import Textarea from "../Textarea";

const FormNuevoProyecto = () =>{
  const { addProyecto } = useProyectoStore();
  const { addToast } = useToastStore();
  const refNombre = useRef<HTMLInputElement | null>(null);
  // const refDescripcion = useRef<HTMLInputElement|null>(null);
  const refDescripcion = useRef<HTMLTextAreaElement|null>(null);
  const refCerrarAlCrear = useRef<HTMLInputElement|null>(null);

  const gestionarCrearProyecto = async (ev:React.MouseEvent<HTMLElement>) => {
    // const submitter = (ev.nativeEvent as Event).submitter as HTMLButtonElement
    const button = ev.target as HTMLButtonElement;
  
    //desactivamos el botón
    button.disabled = true;
  
    let error = false;
    if (refNombre.current!.value == "") { //La exclamación es para que TypeScript sepa que yo he coprobado que no será null
      error = true;
      addToast("El nombre del proyecto no puede estar vacío", ToastStyle.ERROR, 3000);
    }
    if (refDescripcion.current!.value == "") {
      error = true;
      addToast("La descripción del proyecto no puede estar vacía", ToastStyle.ERROR, 3000);
    }
    if (error) {
      setTimeout(() => {
        button.disabled = false;
      }, 1000);
      return;
    }
  
    await addProyecto(refNombre.current!.value, refDescripcion.current!.value);
    button.disabled = false;
    if(refCerrarAlCrear.current!.checked)
      window.HSOverlay.close('#hs-overlay-nuevoproyecto');
  };

  return(<>
  <div id="hs-overlay-nuevoproyecto" className="hs-overlay hs-overlay-open:translate-y-0 -translate-y-full fixed top-0 inset-x-0 transition-all duration-300 transform max-h-[40rem] size-full z-[80] bg-white border-b dark:bg-slate-800 dark:border-neutral-700 hidden" >
  <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
    <h3 className="font-bold text-gray-800 dark:text-white">
      Crear nuevo proyecto
    </h3>
    <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-white hover:bg-orange-600" data-hs-overlay="#hs-overlay-nuevoproyecto">
      <span className="sr-only">Cerrar modal</span>
      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  </div>
  <div className="p-4">
    <p className="text-gray-800 dark:text-neutral-400">
      Para crear un proyecto nuevo se necesita únicamente el nombre y la descripción.
    </p>
    <form>
      <div className="mt-8 space-y-4 max-w-3xl">
        
        <Input type="text" name="nombre" label="Nombre" inputRef={refNombre}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-abc"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 16v-6a2 2 0 1 1 4 0v6" /><path d="M3 13h4" /><path d="M10 8v6a2 2 0 1 0 4 0v-1a2 2 0 1 0 -4 0v1" /><path d="M20.732 12a2 2 0 0 0 -3.732 1v1a2 2 0 0 0 3.726 1.01" /></svg>
        </Input>

        <Textarea name="descripcion" label="Descripción" textareaRef={refDescripcion}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-description"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17h6" /><path d="M9 13h6" /></svg>
        </Textarea>
        {/* <Input type="text" name="descripcion" label="Descripción" inputRef={refDescripcion}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-description"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17h6" /><path d="M9 13h6" /></svg>
        </Input> */}

        <Checkbox label="Cerrar diálogo al crear el proyecto" name="cerrarAlCrear" checked={true} inputRef={refCerrarAlCrear}/>
        
        <button type="button" onClick={gestionarCrearProyecto}
          className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 hover:bg-orange-400 dark:bg-orange-600  dark:hover:bg-orange-500  disabled:contrast-50 disabled:pointer-events-none"
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
          Crear proyecto
        </button>
      </div>
    </form>
  </div>
</div>
  </>);
}
export default FormNuevoProyecto;