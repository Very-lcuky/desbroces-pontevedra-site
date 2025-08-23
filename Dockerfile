# Usa la imagen oficial de Nginx
FROM nginx:latest

# Copia los archivos generados (en tu caso, parece que están en la carpeta _site)
COPY ./_site /usr/share/nginx/html

# Exponer el puerto 443 para HTTPS (si el Load Balancer maneja el SSL)
EXPOSE 80 443

