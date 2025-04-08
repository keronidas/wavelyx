FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev  # Instala solo dependencias de producción
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Agrega esta línea para configurar Nginx correctamente:
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]