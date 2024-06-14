import { dbPromise } from '../database/database.js';

class AlumnoModel {
  async getAllAlumnos() {
    const db = await dbPromise;
    return db.all('SELECT * FROM ALUMNO');
  }

  async getAlumnoByEmail(email) {
    const db = await dbPromise;
    return db.get('SELECT * FROM ALUMNO WHERE email = ?', email);
  }

  async createAlumno(nombre, email, clave) {
    const db = await dbPromise;
    return db.run('INSERT INTO ALUMNO (nombre, email, clave) VALUES (?, ?, ?)', nombre, email, clave);
  }

  

  async asignarProyecto(idalumno, idproyecto) {
    const db = await dbPromise;
    //buscamos si el proyecto ya ha sido asignado a un alumno y si es así no se permite asignarlo a otro alumno
    //tampoco permitirá asignarlo si el proyecto no existe
    const proyectoEsCandidato = await db.get('SELECT p.id FROM PROYECTO p \
    LEFT JOIN ALUMNO a ON p.id = a.proyecto_id \
    WHERE p.id = ? AND a.proyecto_id IS NULL;', idproyecto);
    if(proyectoEsCandidato){
      console.log("Proyecto "+ proyectoEsCandidato.id+" se puede asignar a " + idalumno);
      return db.run('UPDATE ALUMNO SET proyecto_id = ? WHERE id = ?', idproyecto, idalumno);
    }
    return {changes:0}; //se impide que se asigne el proyecto
  }



  async resetProyecto(idalumno) {
    const db = await dbPromise;
    //buscamos si el proyecto ya ha sido asignado a un alumno y si es así no se permite asignarlo a otro alumno
    return db.run('UPDATE ALUMNO SET proyecto_id = ? WHERE id = ?', null, idalumno);
  }


  // async updateProyecto(id, nombre, descripcion) {
  //   const db = await dbPromise;
  //   return db.run('UPDATE PROYECTO SET nombre = ?, descripcion = ? WHERE id = ?', nombre, descripcion, id);
  // }

  // async deleteProyecto(id) {
  //   const db = await dbPromise;
  //   return db.run('DELETE FROM PROYECTO WHERE id = ?', id);
  // }
}

export default new AlumnoModel();