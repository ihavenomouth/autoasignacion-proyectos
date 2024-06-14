import { dbPromise } from '../database/database.js';

class ProyectoModel {
  async getAllProyectos() {
    const db = await dbPromise;
    //función inicial
    // return db.all('SELECT * FROM PROYECTO');
    return db.all('SELECT PROYECTO.*, ALUMNO.id as idalumno \
    FROM PROYECTO \
    LEFT JOIN \
    ALUMNO ON PROYECTO.id = ALUMNO.proyecto_id; ');
  }

  async getProyectoById(id) {
    const db = await dbPromise;
    return db.get('SELECT * FROM PROYECTO WHERE id = ?', id);
  }

  async createProyecto(nombre, descripcion) {
    const db = await dbPromise;
    return db.run('INSERT INTO PROYECTO (nombre, descripcion) VALUES (?, ?)', nombre, descripcion);
  }

  async updateProyecto(id, nombre, descripcion) {
    const db = await dbPromise;
    return db.run('UPDATE PROYECTO SET nombre = ?, descripcion = ? WHERE id = ?', nombre, descripcion, id);
  }

  async deleteProyecto(id) {
    const db = await dbPromise;
    return db.run('DELETE FROM PROYECTO WHERE id = ?', id);
  }
}

export default new ProyectoModel();