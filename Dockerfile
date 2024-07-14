FROM node:16

# Instala globalmente ts-node para ejecutar archivos TypeScript
RUN npm install -g ts-node

# Establece el directorio de trabajo en el contenedor
WORKDIR /restaurant-api

# Copia los archivos de paquetes y instala las dependencias del proyecto
COPY package*.json ./

# Copia todos los archivos del directorio actual al contenedor
COPY . . 

RUN npm install

# Exponer el puerto 5000
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
