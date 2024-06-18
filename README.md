# Herramienta básica de autoasignación de proyectos

Los alumnos podrán elegir uno de los proyectos que están disponibles  
en la aplicación.

Para arrancar el contenedor de docker usado durante el desarrollo se debe ejecutar lo siguiente:

'''
docker run -it --name reactexpress -d -p80:80 -p8080:8080 -v ".":/react -w /react -u1000:1000 node:21-alpine3.18 sh
'''

Para conectarnos al contenedor ejecutaremos:

'''
docker exec -it -u 1000 reactexpress /bin/sh
'''

Una vez dentro del contenedor nos metemos en el directorio del cliente y ejecutamos:

'''
cd client
npm run dev
'''

Para el servidor, igualmente una vez dentro del contenedor:
'''
cd server
npm run dev
'''

