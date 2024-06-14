import { FormEvent } from "react";
import Input from "../Input";
import { createToast, ToastStyle, createSpinner } from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { formDataToJson } from "../../utils/utils";

const FormLogin = () => {
  const navigate = useNavigate();

  const gestionarLogin = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form: HTMLFormElement = ev.target;

    //desactivamos el botón
    // let submitter = ev.submitter;
    const submitter = (ev.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    submitter.disabled = true;

    let error = false;
    if (form.email.value == "") {
      error = true;
      createToast("El email no puede estar vacío", ToastStyle.ERROR, 3000);
    }
    if (form.clave.value == "") {
      error = true;
      createToast("El campo de clave no puede estar vacío", ToastStyle.ERROR, 3000);
    }
    if (error) {
      setTimeout(() => {
        submitter.disabled = false;
      }, 1000);
      return;
    }
    const data = new FormData(form);
    const jsonData = formDataToJson(data);
    const eliminarSpinner = createSpinner();

    fetch("http://localhost/api/login", {
      body: jsonData,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) throw new Error("Se produjo un error al realizar la operación");
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data) {
          window.localStorage.setItem('nombre', data.nombre);
          window.localStorage.setItem('email', data.email);
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('idalumno', data.id);
          window.localStorage.setItem('idproyecto', data.idproyecto);
          
          eliminarSpinner();
          if(data.email==="j@j.es"){
            navigate("/mainAdmin");
            return;
          }
          navigate("/main");
        } else {
          createToast("Se produjo un error al intentar realizar el login", ToastStyle.ERROR, 3000);
          eliminarSpinner();
          submitter.disabled = false;
        }
      })
      .catch(error => {
        createToast("Se produjo un error al intentar realizar el login", ToastStyle.ERROR, 3000);
        console.log(error);
        submitter.disabled = false;
        eliminarSpinner();
      });
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={gestionarLogin}>
      <div className="mt-8 space-y-4">
        <Input type="email" name="email" label="Email">
          <svg
            className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </Input>

        <Input type="password" name="clave" label="Clave">
          <svg
            className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8 v15 h4 m0-4 h-3" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Input>

        <div className="grid">
          <button
            type="submit"
            className="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-500 hover:bg-orange-400 dark:bg-orange-700  dark:hover:bg-orange-600  disabled:contrast-50 disabled:pointer-events-none"
          >
            Ingresar
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div>
          <Link className="sm:p-4 py-1 px-4 text-sm font-light" to={"/crearcuenta"}>
            Crear cuenta
          </Link>
        </div>
      </div>
    </form>
  );
};

export default FormLogin;
