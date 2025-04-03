# Usa una imagen de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start"]
