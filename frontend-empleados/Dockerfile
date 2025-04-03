# Usa una imagen de Node.js para construir la aplicación
FROM node:18 AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build --prod

# Usa un servidor web para servir la app
FROM nginx:alpine
COPY --from=builder /app/dist/frontend-empleados /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
