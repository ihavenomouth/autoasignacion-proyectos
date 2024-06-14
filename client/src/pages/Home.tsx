import FormLogin from "../components/Login/FormLogin";
import {useNavigate} from "react-router-dom";
import {useEffect} from 'react';

const Home = () => {

  //Si ya se inició sesión en alguna vez se redirige a la página principal
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token')
  useEffect(()=>{
    if( token ){
      if(window.localStorage.getItem('email')==="j@j.es"){
        navigate("/mainAdmin");
        return;
      }
      navigate("/main");
      return;
    }
  },[token, navigate])
  ////

  return (
    <>
      <section className="max-w-4xl mx-auto">
        <MainContent />
      </section>
    </>
  );
};
export default Home;

const MainContent = () => {
  return (
    <>
      <main id="content" className="flex flex-col justify-center sm:items-center mx-auto h-screen bg-slate-50 dark:bg-slate-800">
        <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl">Apúntate ahora para participar en la</h1>
          <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
            <span className="bg-clip-text bg-gradient-to-tr from-orange-600 to-orange-500 text-transparent">
              Autoasignación de proyectos
            </span>
          </h2>
          <FormLogin />
        </div>
      </main>
      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <footer className="absolute bottom-0 inset-x-0 text-center py-5">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500 dark:text-slate-600">
          Javier Mancera <a className="text-orange-500 font-medium hover:text-orange-400"
            href="https://www.youtube.com/@Profesorinfo-x/featured">@Profesorinfo</a>
        </p>
      </div>
    </footer>
  );
};