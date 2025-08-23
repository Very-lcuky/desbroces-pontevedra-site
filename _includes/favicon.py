from PIL import Image, ImageDraw

# Crear una imagen cuadrada de 64x64 píxeles con fondo transparente
size = (64, 64)
image = Image.new("RGBA", size, (0, 0, 0, 0))
draw = ImageDraw.Draw(image)

# Dibujar un círculo verde simple (tu color medio "mediumseagreen")
color = (60, 179, 113, 255)  # mediumseagreen
draw.ellipse([8, 8, 56, 56], fill=color)

# Guardar como favicon.ico
image.save("favicon.ico")
