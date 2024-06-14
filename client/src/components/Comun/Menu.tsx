import {Link} from 'react-router-dom';

const Menu = () => {
  return(<>

<nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between bg-slate-100 dark:bg-slate-700 py-2 border-b-2 border-t-2 border-orange-500" aria-label="Global">
    <div className="sm:hidden">
      <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10" data-hs-collapse="#navbar-with-collapse" aria-controls="navbar-with-collapse" aria-label="Toggle navigation">
        <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
        <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div id="navbar-with-collapse" className="hidden transition-all duration-[0.1ms] overflow-hidden basis-full grow sm:block">
      <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
        <Link to={'/'} className="font-medium hover:text-orange-500">Principal</Link>
        <Link to={'/about'} className="font-medium hover:text-orange-500">Acerca de...</Link>
        <Link onClick={()=>{
          localStorage.removeItem('token');
          localStorage.removeItem('nombre');
          localStorage.removeItem('email');
          localStorage.removeItem('idalumno');
          localStorage.removeItem('idproyecto');
        }} to={'/'} className="font-medium hover:text-orange-500">Cerrar sesión</Link>
      </div>
    </div>
  </nav>

  </>);
}

export default Menu;
