import { useEffect } from "react";
import Rutas from "./components/Rutas";
import { useLocation } from "react-router-dom";

import { ToastArea } from "./utils/Toast";

import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-800 dark:to-slate-950 min-h-screen text-slate-900 dark:text-slate-200">
      <ToastArea />
      <Rutas />
    </div>
  );
}
