# Imagen base de Nginx oficial (ligera)
FROM nginx:stable-alpine

# Elimina contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia la carpeta generada por Jekyll
COPY _site/ /usr/share/nginx/html/

# Cambiar Nginx a escuchar en 8080 (Cloud Run usa $PORT=8080)
RUN sed -i 's/listen\s\+80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Exponer puerto 8080
EXPOSE 8080

# Arrancar Nginx
CMD ["nginx", "-g", "daemon off;"]

