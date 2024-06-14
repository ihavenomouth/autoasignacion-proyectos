// import proyectos from '../database/proyectos.json' assert { type: 'json' };
import proyectoModel from '../models/ProyectoModel.js';
import jwt from 'jsonwebtoken';


class ProyectoController{
  constructor() {  
    //Esto es necesario para fijar this a este objeto, cuando se usa un objeto en un callback
    //(en este caso en una ruta) this pasa a referirse al objeto padre
    this.getTokenFrom = this.getTokenFrom.bind(this);
    //Además, hay que asegurarse de que todos los métodos que usen el método auxiliar getToken
    //tengan también this fijado a la clase ProyectoController
    this.postProyecto = this.postProyecto.bind(this);
    this.deleteProyecto = this.deleteProyecto.bind(this);
    this.putProyecto = this.putProyecto.bind(this);
  }
  
  getTokenFrom (req) {  
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')  
    }
    return null
  }

  

  async getProyecto(req, res) {
    console.log(req.params);
    try {
      const proyecto = await proyectoModel.getProyectoById(req.params.id);
      if (proyecto) {
        res.json(proyecto);
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  


  async getProyectos(req, res) {
    try {
      const proyectos = await proyectoModel.getAllProyectos();
      // console.log(proyectos);
      res.json(proyectos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  //TODO: usar un middleware para verificar que el usuario es el admin
  //TODO: usar un campo rol en vez del email
  async postProyecto(req, res) {
    const proyecto = req.body ; 
    console.log(proyecto);
    console.log(req.get('Authorization'));

    const decodedToken = jwt.verify(this.getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {    
      return response.status(401).json({ error: 'token no válido' })
    }
    if (decodedToken.email!="j@j.es") {
      return response.status(401).json({ error: 'Sólo el administrador puede crear proyectos' })
    }
    // console.log(decodedToken);

    try {
      const result = await proyectoModel.createProyecto(req.body.nombre, req.body.descripcion);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  //TODO: usar un middleware para verificar que el usuario es el admin
  //TODO: usar un campo rol en vez del email
  async putProyecto(req, res) {
    console.log(req.params, req.body);

    const decodedToken = jwt.verify(this.getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {    
      return response.status(401).json({ error: 'token no válido' })
    }
    if (decodedToken.email!="j@j.es") {
      return response.status(401).json({ error: 'Sólo el administrador puede crear proyectos' })
    }

    try {
      const result = await proyectoModel.updateProyecto(req.params.id, req.body.nombre, req.body.descripcion);
      if (result.changes > 0) {
        res.json({ message: 'Proyecto actualizado' });
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //TODO: usar un middleware para verificar que el usuario es el admin
  //TODO: usar un campo rol en vez del email
  async deleteProyecto(req, res) {
    console.log("Intento de eliminar el proyecto "+req.params.id);
    console.log(req.get('Authorization'));

    const decodedToken = jwt.verify(this.getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {    
      return response.status(401).json({ error: 'token no válido' })
    }
    if (decodedToken.email!="j@j.es") {
      return response.status(401).json({ error: 'Sólo el administrador puede crear proyectos' })
    }
    try {
      const result = await proyectoModel.deleteProyecto(req.params.id);
      if (result.changes > 0) {
        res.json({ message: 'Proyecto '+req.params.id+' eliminado' });
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default new ProyectoController();