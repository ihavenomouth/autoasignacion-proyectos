import { Link } from "react-router-dom";

const Page404 = () => {
  return (<>
    <section className="max-w-4xl mx-auto p-4 h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="border-t-2 mt-8 p-8 border-orange-500 text-3xl">Error</p>
        
        <h2 className="text-9xl px-20 text-orange-500">404</h2>
        
        <p className="border-b-2 mb-8 p-8 border-orange-500">La página a la que ha intentado acceder no existe</p>
        
        <p>  
          <Link to={"/"}> 
           <button type="button" 
            className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 hover:bg-orange-400 dark:bg-orange-700  dark:hover:bg-orange-600  disabled:contrast-50 disabled:pointer-events-none"
            data-hs-overlay="#hs-overlay-nuevoproyecto"
          >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
              Regresar a la página principal
            </button>
          </Link>
        </p>

      </div> 
    </section>
  </>);
}
export default Page404;
