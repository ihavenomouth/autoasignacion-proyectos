import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import alumnoModel from '../models/AlumnoModel.js';

class LoginController{
  constructor() {  }
  
  async postLogin(req, res) {    
    const {email, clave} = req.body ; 
    const alumno = await alumnoModel.getAlumnoByEmail( email );
    // console.log("Intento de login de:");
    // console.log(alumno, email, clave);
    let loginCorrecto = false;
    if( alumno && await bcrypt.compare(clave, alumno.clave) )
      loginCorrecto = true;

    if (!loginCorrecto) {
      console.log("Login incorrecto");
      return res.status(401).json({
        error: "Usuario o password incorrecto"
      });
    }

    const alumnoForToken = {
      email: alumno.email,
      id: alumno.id,
    }

    const token = jwt.sign(alumnoForToken, process.env.SECRET);
    // const token = jwt.sign(alumnoForToken, process.env.SECRET, { expiresIn: 3600 })
    res
      .status(200)
      .send({ token, nombre: alumno.nombre, email: alumno.email, id:alumno.id, idproyecto: alumno.proyecto_id })
    ;
  }
}

export default new LoginController();