import useToastStore from '../zustand/toastStore';


export enum ToastStyle {
  SUCCESS,
  ERROR,
  INFO,
  SPINNER,
}

export type TypeToast = {
  id:number;
  texto:string;
  estilo:ToastStyle;
  duración: number;
}

export type ToastProps = {
  texto:string;
  estilo:ToastStyle;
}



export const ToastArea = () =>{
  const { toasts } = useToastStore();

  return(
    <div className="fixed right-16 top-4 w-80 h-0 z-[100]">
      { 
      toasts.map( toast =>
        // <div key={toast.id}>{toast.texto}</div> 
         <Toast key={toast.id} texto={toast.texto} estilo={toast.estilo} />
        )
      }
    </div>
  )
}


const getToastClassName = (style: ToastStyle): string => {
  switch (style) {
    case ToastStyle.SUCCESS:
      return 'p-4 m-4 text-black -dark:text-white rounded shadow-md min-w-64 bg-green-400/80';
    case ToastStyle.ERROR:
      return 'p-4 m-4 text-black -dark:text-white rounded shadow-md min-w-64 bg-red-400/80';
    case ToastStyle.INFO:
      return 'p-4 m-4 text-black -dark:text-white rounded shadow-md min-w-64 bg-blue-400/80';
    case ToastStyle.SPINNER:
      return 'w-8 h-8 border-orange-300 dark:border-orange-500 border-4 rounded-lg animate-spin mx-auto';
    default:
      return '';
  }
};

export const Toast = ({ texto, estilo }: ToastProps) => {
  const className = getToastClassName(estilo);

  if (estilo === ToastStyle.SPINNER) {
    return (
      <div className={className}>
        <div className="w-6 h-6 border-slate-400 dark:border-slate-400 border-4 rounded-full animate-ping"></div>
      </div>
    );
  }

  return <div className={className}>{texto}</div>;
};
