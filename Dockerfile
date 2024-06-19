# Creación de la imagen:
# docker run --rm --name auto -d -p80:80 ihavenomouth/autoasignacion-proyectos:1.0

FROM node:21-alpine3.18
EXPOSE 80
WORKDIR /server
USER 1000:1000

#Docker por defecto no soporta la copia de ficheros de usuarios que no sean root
COPY --chown=1000:1000 ./server /server

# RUN npm install
# VOLUME . /server
CMD ["npm", "run", "start"]
