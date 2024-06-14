import Menu from "../components/Comun/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FormNuevoProyecto from "../components/MainAdmin/FormNuevoProyecto";
import FormVerProyectos from "../components/Comun/FormVerProyectos";
import TablaProyectos from "../components/Comun/TablaProyectos";

import useProyectoStore  from "../zustand/proyectoStore";
import FormEditarProyecto from "../components/MainAdmin/FormEditarProyecto";

const MainAdmin = () => {
  const navigate = useNavigate();
  const nombre = window.localStorage.getItem('nombre') ?? "";
  const email = window.localStorage.getItem('email') ?? "";
  const token = window.localStorage.getItem('token') ?? "";

  //El estado global con Zustand
  const { proyectos, fetchProyectos } = useProyectoStore();
  
  //Protegemos la ruta en el cliente, usamos useEffect para que el componente se cargue
  //antes de redirigir.
  useEffect( ()=>{
    if(!token || email!="j@j.es") //TODO: en vez del email usar una propiedad "rol=admin"
      navigate("/");
  },[token, navigate, email]);
  
  //Cargamos los proyectos al cargar el componente
  useEffect( ()=>{
    fetchProyectos();
  },[fetchProyectos]);


return (<>
    <Header nombre={nombre} email={email} />
    <Menu />  
    <section className="max-w-4xl mx-auto p-4 bg-slate-50 dark:bg-slate-800 8">
      <h2 className="text-xl">Acción</h2>
      <FormVerProyectos />
      <TablaProyectos proyectos={proyectos}/>
      <FormNuevoProyecto />
      <FormEditarProyecto />
    </section>
  </>);
}
export default MainAdmin;


