import Header from "../components/Header";
import Menu from "../components/Comun/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  const nombre = window.localStorage.getItem('nombre') ?? "";
  const email = window.localStorage.getItem('email') ?? "";
  const token = window.localStorage.getItem('token') ?? "";

  const navigate = useNavigate();

  //Protegemos la ruta en el cliente, usamos useEffect para que el componente se cargue
  useEffect( ()=>{
    if(!token) //TODO: en vez del email usar una propiedad "rol=admin"
      navigate("/");
  },[token, navigate]);


  return (<>
    <Header nombre={nombre} email={email} />
    <Menu />
    <section className="max-w-4xl mx-auto p-4 ">
      <div className="text-center">
        <p className=" mt-8 p-8  text-3xl">Acerca de...</p>
        
        <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
            <span className="bg-clip-text bg-gradient-to-tr from-orange-600 to-orange-500 text-transparent">
              Autoasignación de proyectos
            </span>
          </h2>
        
        <p className="mb-8 py-8 px-10 sm:px-24">Este proyecto ha sido realizado pensando en permitir a los estudiantes explorar y seleccionar proyectos con facilidad.</p>
        
        <p>Algunas de las tecnologías utilizadas son:</p>
        <ul className="list-none grid grid-cols-2 sm:grid-cols-4 gap-4 m-4 border-2 border-orange-200 dark:border-orange-900 
        bg-gradient-to-tr from-orange-200 dark:from-orange-950 to-transparent p-2"> 
          <li>Node JS</li>
          <li>Express</li>
          <li>JWT</li>
          <li>React</li>
          <li>Vite</li>
          <li>Typescript</li>
          <li>Tailwind CSS</li>
          <li>Zustand</li>
          <li>Preline</li>
        </ul>

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
export default About;
