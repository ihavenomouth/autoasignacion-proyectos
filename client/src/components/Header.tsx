import { Link } from "react-router-dom";

type propHeader = {nombre:string, email:string}

const Header = ({nombre, email}:propHeader) => {

  //Protegemos la ruta en el cliente, usamos useEffect para que el componente se cargue
  //antes de redirigir.

  //TODO: en vez del email usar una propiedad "rol=admin"
  let ruta;
  if(email!="j@j.es")
    ruta="/main";
  else
    ruta="/mainadmin";

  return (
    <div>
      <h1 className="p-4 text-3xl flex items-center gap-10 justify-between bg-gradient-to-r dark:from-slate-800 dark:to-black from-slate-200 to-white">
        <Link className="hover:shadow-orange-500 hover:text-orange-500 hover:shadow-[0px_0px_20px_2px]  rounded-full" to={ruta}> 
          <svg  xmlns="http://www.w3.org/2000/svg"  width="48"  height="48"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-atom-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 21l0 .01" /><path d="M3 9l0 .01" /><path d="M21 9l0 .01" /><path d="M8 20.1a9 9 0 0 1 -5 -7.1" /><path d="M16 20.1a9 9 0 0 0 5 -7.1" /><path d="M6.2 5a9 9 0 0 1 11.4 0" /></svg>
        </Link>
        Usuario: {nombre} ({email})
      </h1>
    </div>
  );
};
export default Header;