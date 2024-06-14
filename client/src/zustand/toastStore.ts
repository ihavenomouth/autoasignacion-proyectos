import {create} from 'zustand';
import { ToastStyle, TypeToast } from '../utils/Toast';



interface State {
  toasts: TypeToast[];
  addToast: (texto:string, estilo:ToastStyle, duración:number) => number;
  removeToast: (id:number) => void;
  addSpinner: () => number;
  removeSpinner: (id:number) => void;
  // eliminarProyecto: (id:string) => Promise<void>;
}

const MAX_DURACION_SPINNER:number=30000; //30 segundos


export const useToastStore = create<State>((set) => ({
  
  toasts: [],

  addToast: (texto:string, estilo:ToastStyle, duración:number) => {
    const id = Date.now() + Math.floor(Math.random() * 1000); // Utilizamos el timestamp como ID único (+ un número aleatorio por si hubiera varios toasts en el mismo milisegundo)
  
    set((state) => ({
      toasts: [...state.toasts, { id, texto, estilo, duración }]
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id)
      }));
    }, duración);
    return id;
  },

  removeToast: (id:number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  },

  
  addSpinner: () => {
    const id = Date.now() + Math.floor(Math.random() * 1000); // Utilizamos el timestamp como ID único
  
    set((state) => ({
      toasts: [...state.toasts, { id:id, texto:"", estilo:ToastStyle.SPINNER, duración:MAX_DURACION_SPINNER }]
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id)
      }));
    }, MAX_DURACION_SPINNER);
    return id;
  },

  removeSpinner: (id:number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  },


}));

export default useToastStore;