# Usa la imagen oficial de Nginx
FROM nginx:latest

# Borra el contenido por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos generados por Jekyll
COPY _site/ /usr/share/nginx/html/

# Expone el puerto 80 (HTTP) y 443 (HTTPS si tu proxy/load balancer lo maneja)
EXPOSE 80 443

# Opcional: Copia configuración personalizada de Nginx si quieres redirecciones, gzip, headers, etc.
# COPY nginx.conf /etc/nginx/nginx.conf

# Comando por defecto para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]

