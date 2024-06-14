import express from 'express';
const router = express.Router();

import proyectoController from '../controllers/ProyectoController.js';


// proyecto/5  |  GET     |  obtiene información del proyecto con id 5
// proyecto    |  GET     |  obtiene información de todos los proyectos
// proyecto    |  POST    |  crea un nuevo proyecto a partir de los datos de la petición
// proyecto/5  |  DELETE  |  elimina el proyecto con id 5
// proyecto/5  |  PUT     |  reemplaza todo el proyecto 5 con los datos de la petición
// proyecto/5  |  PATCH   |  reemplaza parte del proyecto 5 con los datos de la petición



// router.route('/')
//   .get( (req, res) => {
//     res.send('Todos los proyectos');
//   })
//   .post( (req, res) => {
//     res.send('Nuevo proyecto');
//   })

router.route('/')
  .get( proyectoController.getProyectos )
  .post( proyectoController.postProyecto )
;



router.route('/:id')
  .get( proyectoController.getProyecto )
  .delete( proyectoController.deleteProyecto )
  .put( proyectoController.putProyecto )
;


export default router;