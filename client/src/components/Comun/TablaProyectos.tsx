import TablaProyectosRow from "../MainAdmin/TablaProyectosRow";
import { TypeProyecto } from "../../types/types";
import TablaProyectosRowAlumno from "../Main/TablaProyectosRowAlumno";

type TablaProyectosAdminProps = {
  proyectos: Array<TypeProyecto>
};

const TablaProyectos = ({proyectos}:TablaProyectosAdminProps) => {
  const email = window.localStorage.getItem('email') ?? "";

  // console.log(proyectos);
  return(
  <div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Nombre</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Descripción</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {
            proyectos.map( (proy) =>{ 
                if(email === "j@j.es")
                  return <TablaProyectosRow key={proy.id} proyecto={proy} />
                else
                  return <TablaProyectosRowAlumno key={proy.id} proyecto={proy} />
              }
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
}

export default TablaProyectos;