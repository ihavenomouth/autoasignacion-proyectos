import {create} from 'zustand';
import { TypeProyecto } from '../types/types';

//Este store necesita crear Toasts
import useToastStore from './toastStore';
import { ToastStyle } from '../utils/Toast';
// import { ToastStyle } from '../utils/Toast';


interface State {
  proyectos: TypeProyecto[];
  proyectoEditar: TypeProyecto|null; //El proyecto que se está editando
  setProyectoEditar: (proyecto:TypeProyecto) => void;
  fetchProyectos: () => Promise<void>;
  deleteProyecto: (id:number) => Promise<void>;
  addProyecto: (nombre:string, descripcion:string)=> Promise<number|null>
  editProyecto: (id:number, nombre:string, descripcion:string)=> Promise<void>
  getProyecto: (id:number|null)=> TypeProyecto|undefined;
  asignarProyecto: (idAlumno:number,idProyecto:number)=> Promise<void>;
  liberarProyecto: (idAlumno:number)=> Promise<void>;
}


const useProyectoStore = create<State>(
  (set, get) => ({


    proyectos: [],
    proyectoEditar: null,

    setProyectoEditar: (proyecto:TypeProyecto) => set({proyectoEditar:proyecto}),
    getProyecto: (id:number|null)=> {
      const state = get();
      return state.proyectos.find((proyecto) => proyecto.id === id)
    },

    fetchProyectos: async () => {

      const idSpinner = useToastStore.getState().addSpinner();

      try{
        const response = await fetch('/proyecto');
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        const arrProyectos:Array<TypeProyecto> = await response.json();
        set({ proyectos: arrProyectos });
      }
      catch(error){
        console.error(error);
      }
      finally{
        setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
      }
    },


    deleteProyecto: async (id:number) => {
      const idSpinner = useToastStore.getState().addSpinner();
      try{
        const response = await fetch("/proyecto/"+id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });
        
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        const datos = await response.json();
      
        if (datos.message) {
          useToastStore.getState().addToast("Proyecto eliminado correctamente", ToastStyle.SUCCESS, 1000);
          setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
        } else {
          useToastStore.getState().addToast("Se produjo un error al intentar realizar la operación", ToastStyle.ERROR, 3000);
          useToastStore.getState().removeSpinner(idSpinner);
        }

        set((state) => ({
          proyectos: state.proyectos.filter((item) => item.id !== id),
        }));
      }
      catch(error){
        console.error(error);
        useToastStore.getState().addToast(String(error), ToastStyle.ERROR, 3000);
        setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
      }
    },


    addProyecto: async (nombre:string, descripcion:string)=>{ 
      const idSpinner = useToastStore.getState().addSpinner();
      // console.log({ nombre, descripcion });

      try{
        const response = await fetch("/proyecto", {
          body: JSON.stringify({nombre:nombre, descripcion:descripcion}),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        const datos = await response.json();
        
        if (datos.id) {
          useToastStore.getState().addToast("Proyecto "+ datos.id +" creado correctamente", ToastStyle.SUCCESS, 2000);
          setTimeout(() => {
            useToastStore.getState().removeSpinner(idSpinner);
            set((state) => ({
              proyectos: [...state.proyectos, { id:datos.id, nombre:nombre, descripcion:descripcion, idalumno:null}]
            }));    
          }, 500);
        } else {
          useToastStore.getState().addToast("Se produjo un error al intentar realizar la operación", ToastStyle.ERROR, 3000);
          useToastStore.getState().removeSpinner(idSpinner);
        }

        return datos.id;
      }
      catch(error){
        console.error(error);
        useToastStore.getState().addToast(String(error), ToastStyle.ERROR, 3000);
        setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
        return null;
      }
    },


    editProyecto: async (id:number, nombre:string, descripcion:string) => {
      const idSpinner = useToastStore.getState().addSpinner();
      try{
        const response = await fetch("/proyecto/"+id, {
          method: "PUT",
          body: JSON.stringify({nombre:nombre, descripcion:descripcion}),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });
        
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        const datos = await response.json();
      
        if (datos.message) {
          useToastStore.getState().addToast("Proyecto "+id+" editado correctamente", ToastStyle.SUCCESS, 1000);
          setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
        } else {
          useToastStore.getState().addToast("Se produjo un error al intentar realizar la operación", ToastStyle.ERROR, 3000);
          useToastStore.getState().removeSpinner(idSpinner);
        }

        set((state) => ({
          proyectos: state.proyectos.map((item) => item.id === id ? {...item, nombre:nombre, descripcion:descripcion} : item),
        }));
      }
      catch(error){
        console.error(error);
        useToastStore.getState().addToast(String(error), ToastStyle.ERROR, 3000);
        setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
      }
    },


    asignarProyecto: async (idAlumno:number, idProyecto:number)=> {
      const idSpinner = useToastStore.getState().addSpinner();
      try{
        const response = await fetch("/alumno/"+idAlumno+"/asignar/"+idProyecto, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });
        
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        const datos = await response.json();
      
        if (datos.message) {
          useToastStore.getState().addToast("Proyecto "+idProyecto+" asignado correctamente", ToastStyle.SUCCESS, 1000);
          setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
          window.localStorage.setItem('idproyecto', String(idProyecto));
          
          set((state) => ({
            proyectos: state.proyectos.map(
              (proy) => {
                if (proy.id === idProyecto) {
                  return {...proy, idalumno:idAlumno};
                }
                else if(proy.idalumno === idAlumno){
                  return {...proy, idalumno:null};
                }
                return proy;
              }
            ),
          }));

        } else {
          useToastStore.getState().addToast("Se produjo un error al intentar realizar la operación", ToastStyle.ERROR, 3000);
          useToastStore.getState().removeSpinner(idSpinner);
        }
      }
      catch(error){
        console.error(error);
        useToastStore.getState().addToast("Se produjo un error al asignar el proyecto ¿tal vez el proyecto ya esté asignado a otro alumno?", ToastStyle.ERROR, 3000);
        setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
      }
    },



    liberarProyecto: async (idAlumno:number)=> {
      const idSpinner = useToastStore.getState().addSpinner();
      try{
        const response = await fetch("/alumno/"+idAlumno+"/liberar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });
        
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        const datos = await response.json();
      
        if (datos.message) {
          useToastStore.getState().addToast("Proyecto liberado correctamente", ToastStyle.SUCCESS, 1000);
          setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);        
          window.localStorage.setItem('idproyecto', "");
          //Forzamos un refrescado de la página
          get().fetchProyectos();

        } else {
          useToastStore.getState().addToast("Se produjo un error al intentar realizar la operación", ToastStyle.ERROR, 3000);
          useToastStore.getState().removeSpinner(idSpinner);
        }
      }
      catch(error){
        console.error(error);
        useToastStore.getState().addToast("Se produjo un error al asignar el proyecto ¿tal vez el proyecto ya esté asignado a otro alumno?", ToastStyle.ERROR, 3000);
        setTimeout(() => { useToastStore.getState().removeSpinner(idSpinner); }, 500);
      }
    },

  })
);


export default useProyectoStore;
