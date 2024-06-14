
type ModalDetalleProyectoProps = {
  children: React.ReactNode;
  title: string;
  referencia?: React.MutableRefObject<HTMLDivElement | null>;
  identificador?: string;
};

const ModalDetalleProyecto = ({ title, children, referencia, identificador }: ModalDetalleProyectoProps) => {

  // return(
  //   <div 
  //   ref={referencia}
  //   id={identificador} 
  //   className="hidden fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none size-full">
  //     <div className="dark:bg-slate-800 mt-0 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
  //     <div className="mt-8 p-8 flex flex-col justify-center items-center py-3 px-4 border-b dark:border-neutral-700">
  //       <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
  //       {children}
  //     </div>
  //     </div>
  //   </div>
  // );
  
  return (
    
    <div
      ref={referencia}
      id={identificador} 
      className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="w-full max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-700/70">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-slate-700">
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-orange-500 dark:hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none dark:text-white"
              data-hs-overlay={'#'+identificador}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <div className="space-y-4">{children}</div>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button
              type="button"

              className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 hover:bg-orange-400 dark:bg-orange-600  dark:hover:bg-orange-500  disabled:contrast-50 disabled:pointer-events-none"
              data-hs-overlay={'#'+identificador}
            >
              Cerrar
            </button>

            {/* <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Save changes
        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleProyecto;
