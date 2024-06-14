import express from 'express';
const router = express.Router();

import alumnoController from '../controllers/AlumnoController.js';

// proyecto/5  |  GET     |  obtiene información del proyecto con id 5
// proyecto    |  GET     |  obtiene información de todos los proyectos
// proyecto    |  POST    |  crea un nuevo proyecto a partir de los datos de la petición
// proyecto/5  |  DELETE  |  elimina el proyecto con id 5
// proyecto/5  |  PUT     |  reemplaza todo el proyecto 5 con los datos de la petición
// proyecto/5  |  PATCH   |  reemplaza parte del proyecto 5 con los datos de la petición



// router.route('/crearCuenta')
//   .get( (req, res) => {
//     console.log("Alumno creado");
//     res.send('Todos los alumnos creados GET');
//   })
//   .post( (req, res) => {
//     console.log("Alumno creado");
//     res.send('Nuevo alumno creado');
//   })


router.route('/')
  .get( alumnoController.getAlumnos )
  .post( alumnoController.postAlumno )
;

router.route('/:idalumno/asignar/:idproyecto')
  .put( alumnoController.asignarProyecto )
;

router.route('/:idalumno/liberar')
  .put( alumnoController.liberarProyecto )
;


/*
router.route('/:id')
  .get( proyectoController.getProyecto )
  .delete( proyectoController.deleteProyecto )
  .put( proyectoController.putProyecto )
;
*/
export default router;