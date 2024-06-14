import Menu from "../components/Comun/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FormVerProyectos from "../components/Comun/FormVerProyectos";

// import TablaProyectosAlumnos from "../components/Main/TablaProyectosAlumnos";
import TablaProyectos from "../components/Comun/TablaProyectos";

import useProyectoStore  from "../zustand/proyectoStore";


const Main = () => {
  const navigate = useNavigate();
  const nombre = window.localStorage.getItem('nombre') ?? "";
  const email = window.localStorage.getItem('email') ?? "";
  const token = window.localStorage.getItem('token') ?? "";
  
  //El estado global con Zustand
  const { proyectos, fetchProyectos } = useProyectoStore();

    //Protegemos la ruta en el cliente, usamos useEffect para que el componente se cargue
  //antes de redirigir.
  useEffect( ()=>{
    if(!token) //TODO: en vez del email usar una propiedad "rol=admin"
      navigate("/");
    if(token && email=="j@j.es")
      navigate("/mainadmin");
  },[token, navigate, email]);

  //Cargamos los proyectos al cargar el componente
  useEffect( ()=>{
    fetchProyectos();
  },[fetchProyectos]);

return (<>
    <Header nombre={nombre} email={email} />
    <Menu />  
    <section className="max-w-4xl mx-auto p-4 bg-slate-50 dark:bg-slate-800">
      <h2 className="text-xl">Acción</h2>
      <FormVerProyectos />
      <TablaProyectos proyectos={proyectos}/>
    </section>
  </>);
}
export default Main;




