// import {Link} from 'react-router-dom';
import FormCrearCuenta from '../components/CrearCuenta/FormCrearCuenta';


const CrearCuenta = () => {

return (<>
    <section className="max-w-4xl mx-auto">
      <MainContent/>
    </section>
  </>);
}
export default CrearCuenta;



const MainContent = () =>{
  return(
    <>
<main id="content" className="flex flex-col justify-center sm:items-center mx-auto h-screen bg-slate-50 dark:bg-slate-800">
  <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl sm:text-4xl">Para poder acceder tienes que</h1>
    <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
      <span className="bg-clip-text bg-gradient-to-tr from-orange-600 to-orange-500 text-transparent">crear una cuenta</span>
    </h2>

    <FormCrearCuenta />

    </div>
  </main>

    </>
  );
}


