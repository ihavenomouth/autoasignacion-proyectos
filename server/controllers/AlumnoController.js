// import proyectos from '../database/proyectos.json' assert { type: 'json' };
import bcrypt from 'bcrypt';
import alumnoModel from '../models/AlumnoModel.js';
import jwt from 'jsonwebtoken';

class AlumnoController{
  constructor() {  
    //Esto es necesario para fijar this a este objeto, cuando se usa un objeto en un callback
    //(en este caso en una ruta) this pasa a referirse al objeto padre
    this.getTokenFrom = this.getTokenFrom.bind(this);
    //Además, hay que asegurarse de que todos los métodos que usen el método auxiliar getToken
    //tengan también this fijado a la clase ProyectoController
    this.asignarProyecto = this.asignarProyecto.bind(this);
    this.liberarProyecto = this.liberarProyecto.bind(this);
  }
  
  getTokenFrom (req) {  
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')  
    }
    return null
  }
  
  //Hay que comprobar que el id del alumno a asignar corresponde al alumno actual (el del token)
  async asignarProyecto(req, res) {
    // console.log("Intento de asignar el proyecto "+req.params.id + " al alumno " + req.params.idalumno);
    const decodedToken = jwt.verify(this.getTokenFrom(req), process.env.SECRET);
    // console.log("Alumno del token: " + decodedToken.id);
    if (!decodedToken.id || decodedToken.id != req.params.idalumno) {    
      return response.status(401).json({ error: 'token no válido' })
    }

    try {
      const result = await alumnoModel.asignarProyecto(req.params.idalumno, req.params.idproyecto);
      if (result.changes > 0) {
        res.json({ message: 'Proyecto '+req.params.idproyecto+' asignado correctamente' });
      } else {
        res.status(404).json({ message: 'Proyecto no asignado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async getAlumnos(req, res) {
    try {
      const alumnos = await alumnoModel.getAllAlumnos();
      res.json(alumnos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }



  async postAlumno(req, res) {    
    const {nombre, email, clave} = req.body ; 
    // console.log("Creación de un alumno");
    // console.log(req.body);
    const saltRounds = 10
    const claveHash = await bcrypt.hash(clave, saltRounds)

    // console.log(claveHash);
    
    try {
      // Creamos el alumno
      const result = await alumnoModel.createAlumno(nombre, email, claveHash);
      
      //Generamos el token
      const alumnoForToken = {
        email: email,
        id: result.lastID,
      }
  
      const token = jwt.sign(alumnoForToken, process.env.SECRET);

      res.status(201).json({ 
        nombre: nombre,
        email: email,
        token: token,
        id: result.lastID,
        idproyecto:null,
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  //TODO: Sólo se puede liberar el proyecto si el token es del alumno que lo tiene asignado
  async liberarProyecto(req, res) {
    const decodedToken = jwt.verify(this.getTokenFrom(req), process.env.SECRET);
    // console.log("Alumno del token: " + decodedToken.id);
    if (!decodedToken.id || decodedToken.id != req.params.idalumno) {    
      return response.status(401).json({ error: 'token no válido' })
    }

    // console.log(req.params, req.body);
    try {
      const result = await alumnoModel.resetProyecto(req.params.idalumno);
      if (result.changes > 0) {
        res.json({ message: 'Proyecto liberado' });
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // async deleteProyecto(req, res) {
  //   try {
  //     const result = await proyectoModel.deleteProyecto(req.params.id);
  //     if (result.changes > 0) {
  //       res.json({ message: 'Proyecto eliminado' });
  //     } else {
  //       res.status(404).json({ message: 'Proyecto no encontrado' });
  //     }
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }
}

export default new AlumnoController();