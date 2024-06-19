# Herramienta básica de autoasignación de proyectos

Los alumnos podrán elegir uno de los proyectos que están disponibles  
en la aplicación.


## Desarrollo:

El desarrollo consta de dos proyectos diferentes: uno para el cliente  
y otro para el servidor. En el cliente se usan:
* React
* Typescript
* Tailwind
* Preline

En el servidor:
* NodeJS
* Nodemon
* Express

Para arrancar el contenedor de docker usado durante el desarrollo se  
debe ejecutar lo siguiente:

```
docker run -it --name reactexpress -d -p80:80 -p8080:8080 -v ".":/react -w /react -u1000:1000 node:21-alpine3.18 sh
```

Para conectarnos al contenedor ejecutaremos:

```
docker exec -it -u 1000 reactexpress /bin/sh
```

Una vez dentro del contenedor nos metemos en el directorio del cliente y ejecutamos:

```
cd client
npm run dev
```

Para el servidor, igualmente una vez dentro del contenedor:
```
cd server
npm run dev
```

En el fichero del servidor `index.js` se han comentado las líneas de cors, que serán  
necesarias durante el desarrollo (porque el cliente utiliza otro puerto).
Y también la redirección al puerto del cliente.


# Creación de la imagen de Docker

Partiendo de este Dockerfile:
```
FROM node:21-alpine3.18
EXPOSE 80
WORKDIR /server
USER 1000:1000

#Docker por defecto no soporta la copia de ficheros de usuarios que no sean root
COPY --chown=1000:1000 ./server /server
CMD ["npm", "run", "start"] 
```

Crearemos la imagen con esta orden:
```
docker buildx build --no-cache -t ihavenomouth/autoasignacion-proyectos:1.0 
```

La subiremos a dockerhub:
```
docker pull ihavenomouth/autoasignacion-proyectos:1.0
```

Arrancamos el contenedor para poder ejecutar la aplicación.
```
docker run --name autoasignacion -d -p80:80 ihavenomouth/autoasignacion-proyectos:1.0
```

**Nota:** Dentro del directorio `server` necesitamos que exista un fichero `.env` que contenga 
al menos la variable `SECRET` usada para guardar las claves de los usuarios. Ejemplo de fichero:
```
SECRET=Tyop2143_SecretoSecretosoMuyHorroroso_Ç98s
```
