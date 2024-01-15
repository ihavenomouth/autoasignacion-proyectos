// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

//Bcrypt
const bcrypt = require('bcrypt');
const salt = process.env.SALTCLAVES;


// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE ALUMNO (\
       id INTEGER PRIMARY KEY AUTOINCREMENT, \
       nombre TEXT NOT NULL, \
       email TEXT NOT NULL UNIQUE, \
       clave TEXT NOT NULL\
       )"
    );
    
    db.run(
	    "CREATE TABLE PROYECTO (\
	     id INTEGER PRIMARY KEY AUTOINCREMENT, \
	     nombre TEXT, \
	     descripcion INTEGER, \
       keywords TEXT, \
       id_alumno INTEGER , \
       FOREIGN KEY(id_alumno) REFERENCES ALUMNO(id) \
       ON DELETE CASCADE ON UPDATE CASCADE\
	     )"
    );
    console.log("Creadas las tablas");

    // insertamos cursos
    db.serialize(() => {
       db.run(
         `INSERT INTO ALUMNO (nombre, email, clave) VALUES \
          ('${process.env.NOMBREADMIN}', '${process.env.EMAILADMIN}', '${process.env.CLAVEADMIN}')`
       );
       //sqlite3 ./.data/sqlite.db "insert into encuesta(nombre, id_curso) VALUES('CV DIW(DAW)', '2023');"
    });

    console.log("Cradas las tablas y el admin");
  } else {
    console.log('La BD está ya creada');
  }
});





////////////////////////////////
// SESION y LOGIN
////////////////////////////////
const sessions = require('express-session'); 
const cookieParser = require("cookie-parser");

const quinceDias = 1000 * 60 * 60 * 24*15;
app.use(sessions({
    secret: `${process.env.CLAVECOOKIES}`,
    saveUninitialized:true,
    cookie: { maxAge: quinceDias },
    resave: false 
}));

app.use(cookieParser());


// a variable to save a session
let session;





////////////////////////////////////////////
// ENRUTAMIENTO
////////////////////////////////////////////

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  
  console.log(request.session.id_alumno)
  
  session=request.session;
  if(session.id_alumno){
    if(session.admin)
      response.redirect('/principalAdmin');
    else
      response.redirect('/principal');
  }
  else{
    response.sendFile(`${__dirname}/views/index.html`);
  }
});


app.get("/principal", (request, response) => {
  session=request.session;
  if(session.id_alumno){
    response.sendFile(`${__dirname}/views/principal.html`);
  }
  else{
    response.sendFile(`${__dirname}/views/index.html`);
  }
});

app.get("/principalAdmin", (request, response) => {
  session=request.session;
  if(session.id_alumno){
    if(session.admin)
      response.sendFile(`${__dirname}/views/principalAdmin.html`);
    else
      response.redirect('/principal');
  }
  else{
    response.sendFile(`${__dirname}/views/index.html`);
  }
});

app.get("/registro", (request, response) => {
  response.sendFile(`${__dirname}/views/registro.html`);
});


app.post("/login", (request, response) => {
  const email = cleanseString(request.body.txtEmail).toLowerCase();
  const clave = cleanseString(request.body.txtClave);
  
  console.log("Hola desde login");
  
  //db.get(`SELECT * FROM ALUMNO WHERE email='${email}' AND clave='${clave}'`, (error, rows) => {
  db.get(`SELECT * FROM ALUMNO WHERE email='${email}'`, (error, rows) => {
    if(error){
      console.log("Error desde login");
      response.sendFile(`${__dirname}/views/index.html?error=true`);
    }else{
      console.log("Todo bien desde login. " + rows);
      //¿Existe el usuario?
      if(!rows){
        console.log("El usuario no existe");
        response.redirect('/?error=true');
        return;
      }
      bcrypt.compare(clave, rows['clave'], function(err, result) {
        if(result==true){
          let nombre = rows["nombre"];
          let id_alumno = rows["id"];
          console.log(`Nombre: ${nombre} id: ${id_alumno}`);
          session = request.session;
          session.id_alumno = id_alumno;
          session.nombre = nombre;
          if(email===process.env.EMAILADMIN && 
             nombre===process.env.NOMBREADMIN &&
             clave===process.env.CLAVEADMIN){
             session.admin = true;
             response.redirect('/principalAdmin?alumno=' + ( nombre.replace(/ /g,"+") ));
          }
          else{
            session.admin = false;
            response.redirect('/principal?alumno=' + ( nombre.replace(/ /g,"+") ));
          }
        }
        else{
          console.log("Clave incorrecta");
          response.redirect('/?error=true');
        }
      });
    }
  });  
});




/*
app.get("/getCursos", (request, response) => {
   db.all("SELECT * from CURSO", (err, rows) => {
     if(err) response.send(JSON.stringify(err));
     else response.send(JSON.stringify(rows));
   });
});


app.get("/getEncuestas", (request, response) => {
   const curso = cleanseString(request.query.curso);
   db.all("SELECT * from ENCUESTA WHERE id_curso='"+curso+"';", (err, rows) => {
     if(err) response.send(JSON.stringify(err));
     else response.send(JSON.stringify(rows));
   });
});

app.get("/getPreguntas", (request, response) => {
   const encuesta = cleanseString(request.query.encuesta);
   db.all("SELECT * from PREGUNTA WHERE id_encuesta='"+encuesta+"';", (err, rows) => {
     if(err) response.send(JSON.stringify(err));
     else response.send(JSON.stringify(rows));
   });
});


app.get("/getAlumnos", (request, response) => {
   const curso = cleanseString(request.query.curso);
   db.all("SELECT id, nombre FROM alumno WHERE id_curso='"+curso+"';", (err, rows) => {
     if(err) response.send(JSON.stringify(err));
     else response.send(JSON.stringify(rows));
   });
});




// Punto de entrada para añadir un alumno
app.post("/crearAlumno", (request, response) => {

  const nombre = cleanseString(request.body.txtNombre);
  const email = cleanseString(request.body.txtEmail).toLowerCase();
  const clave = cleanseString(request.body.txtClave);
  const curso = cleanseString(request.body.txtCurso);
  
  console.log(`Añadir alumno ${nombre}, ${email}, ${curso}`);
  bcrypt.hash(clave, salt, function(err, claveCifrada) {
        
    db.run(`INSERT INTO ALUMNO (nombre, email, clave, id_curso) VALUES ('${nombre}', '${email}', '${claveCifrada}', '${curso}');`, error => {
      if (error) {
        console.log("Error en el registro, redirigiendo: " + error);
        response.redirect('/registro?error=true');
      } else {
        console.log("Correcto el registro, redirigiendo a verEncuesta");

        //Intentamos recuperar el id
        db.get("SELECT last_insert_rowid()", (error, succes) => {
          if(error)
            response.redirect('/');
          else{
            //console.log(succes);
            let lastid=succes["last_insert_rowid()"];
            //response.send({ message: "Alumno creado exitosamente ", id: lastid });
            session = request.session;
            session.id_alumno = lastid;
            session.nombre = nombre;
            session.admin = false;
            response.redirect('/principal?alumno=' + ( nombre.replace(/ /g,"+") ));
          }
        });
      } 
    });
  });
});




app.post("/crearEncuesta", (request, response) => {
  session=request.session;
  console.log(session)
  if(session.id_alumno){
    if(session.admin)
      crearEncuesta(request, response);
    else
      response.redirect('/?error=true');
  }
  else{
    response.redirect('/?error=true');
  }
});


const crearEncuesta = (request, response)=>{
  const nombre = cleanseString(request.body.txtNombreEncuesta);
  const curso = cleanseString(request.body.txtCursoCrearEncuesta);
  
  console.log(`Añadir encuesta ${nombre}, ${curso}`);
         
  db.run(`INSERT INTO ENCUESTA (nombre, id_curso) VALUES ('${nombre}', '${curso}');`, error => 
  {
    if (error) {
      console.log("Error al crear la encuesta, redirigiendo: " + error);
      response.redirect('/principalAdmin?error=true');
    } 
    else {
      console.log("correcto");
      response.redirect('/principalAdmin?alumno=' + ( session.nombre.replace(/ /g,"+") ));
    }
  });
}



app.post("/crearPregunta", (request, response) => {
  session=request.session;
  console.log(session)
  if(session.id_alumno){
    if(session.admin)
      crearPregunta(request, response);
    else
      response.redirect('/?error=true');
  }
  else{
    response.redirect('/?error=true');
  }
});


const crearPregunta = (request, response)=>{
  const nombre = cleanseString(request.body.txtNombrePregunta);
  const texto = cleanseString(request.body.txtTextoPregunta);
  const peso = cleanseString(request.body.txtPesoCrearPregunta);
  const id_encuesta = cleanseString(request.body.txtEncuestaCrearPregunta);

  console.log(`Añadir pregunta ${nombre}, a la encuesta ${id_encuesta}`);
       
  db.run(`INSERT INTO PREGUNTA (nombre, texto, peso, id_encuesta) VALUES ('${nombre}', '${texto}', '${peso}', '${id_encuesta}');`, error => 
  {
    if (error) {
      console.log("Error al crear la pregunta, redirigiendo: " + error);
      response.redirect('/principalAdmin?error=true');
    } 
    else {
      console.log("correcto, se pudo crear la pregunta");
      response.redirect('/principalAdmin?alumno=' + ( session.nombre.replace(/ /g,"+") ));
    }
  });
}

app.post("/puntuar", (request, response) => {
  session=request.session;
  if(session.id_alumno){
    crearPuntuación(request, response, session.id_alumno);
  }
  else{
    response.redirect('/?error=true');
  }
});


const crearPuntuación = (request, response, alumno)=>{
  const id_alumnoExaminado = cleanseString(request.body.txtAlumnoExaminado);
  const id_encuesta = cleanseString(request.body.txtEncuesta);
  
  const arrRespuestas = JSON.parse(cleanseString(request.body.arrRespuestas));
  let s="";
  arrRespuestas.forEach(r=>{
    s+=`('${alumno}','${id_alumnoExaminado}','${id_encuesta}','${r.id}','${r.nota}','${r.peso}'),`;
  });
  s = s.slice(0,-1);
  

  db.run(`INSERT INTO RESPUESTA (id_alumno, id_alumno_examinado, id_encuesta,id_pregunta, nota, peso) VALUES ${s};`, error => 
  {
    if (error) {
      console.log("Error al crear la respuesta " + error);
      response.send({ mensaje: "Se produjo un error", detalle: "Error al guardar las puntuaciones:<br>"+error });
    } 
    else {
      console.log("correcto, se pudo crear la respuesta");
      response.send({ mensaje: "Puntuaciones guardadas", detalle: "Puntuaciones guardadas correctamente, <br>recuerda que no podrás volver a puntuar al mismo<br> alumno en la misma encuesta." });
    }
  });
}
*/

//////////////////////////////
// Ver resultados
//////////////////////////////

app.get("/resultadosAdmin", (request, response) => {
  session=request.session;
  if(session.id_alumno){
    if(session.admin)
      response.sendFile(`${__dirname}/views/resultadosAdmin.html`);
    else
      response.redirect('/?error=true');
  }
  else{
    response.redirect('/?error=true');
  }
});


app.get("/getResultados", (request, response) => {
  session=request.session;
  if(session.id_alumno){
    if(session.admin)
      cargarResultados(request, response);
    else
      response.redirect('/?error=true');
  }
  else{
    response.redirect('/?error=true');
  }
});


const cargarResultados = (request, response) => {
   const encuesta = cleanseString(request.query.encuesta);
   // const curso = cleanseString(request.query.curso);
   const alumnoExaminado = cleanseString(request.query.alumnoExaminado);
  
   db.all(`SELECT id_pregunta, nota, respuesta.peso as peso,pregunta.nombre as nombre_pregunta, alumno.nombre as alumno
           FROM respuesta,pregunta,alumno WHERE 
           id_alumno_examinado='${alumnoExaminado}' AND 
           respuesta.id_encuesta='${encuesta}' AND pregunta.id_encuesta=respuesta.id_encuesta AND 
           pregunta.id=respuesta.id_pregunta AND
           respuesta.id_alumno=alumno.id;`, (err, rows) => {
     //console.log(JSON.stringify(rows))
     if(err) response.send(JSON.stringify(err));
     else response.send(JSON.stringify(rows));
   });
// getResultados?encuesta="+encuesta+"&alumnoExaminado="+alumnoExaminado
}




//////////////////////////////////////





app.get("*", function (req, res) {
    res.redirect('/'); 
});

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});