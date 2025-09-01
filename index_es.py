from elasticsearch import Elasticsearch, helpers
import os
from bs4 import BeautifulSoup

# 1️⃣ Conexión a Elasticsearch
client = Elasticsearch(
    "https://my-elasticsearch-project-d30e7e.es.europe-west1.gcp.elastic.cloud:443",
    api_key="UWRYRUFaa0JkVGhoNGxRQVp6SDQ6OENWRkl2UlNPRkEyaTRSVlF5R2RUUQ=="
)

# 2️⃣ Nombre del índice
index_name = "desbroces-pontevedra"

# 3️⃣ Crear índice con mapping si no existe
if not client.indices.exists(index=index_name):
    mappings = {
        "mappings": {
            "properties": {
                "title": {"type": "text"},
                "content": {"type": "text"},
                "url": {"type": "keyword"}
            }
        }
    }
    response = client.indices.create(index=index_name, body=mappings)
    print("Índice creado:", response)
else:
    print("Índice ya existe:", index_name)

# 4️⃣ Indexar todas las páginas de _site (o solo index.html si prefieres)
docs = []
site_dir = "_site"  # Carpeta generada por Jekyll/Netlify

for root, dirs, files in os.walk(site_dir):
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()
                soup = BeautifulSoup(html, "html.parser")
                title = soup.title.string if soup.title else file
                content = soup.get_text(separator=" ", strip=True)
                url = "/" + os.path.relpath(path, site_dir)
                docs.append({
                    "_index": index_name,
                    "_source": {
                        "title": title,
                        "content": content,
                        "url": f"https://desbroces-pontevedra.fun{url}"
                    }
                })

# 5️⃣ Indexar documentos
helpers.bulk(client, docs)
print("Documentos indexados correctamente:", len(docs))

# 6️⃣ Probar búsqueda
query = {
    "query": {
        "match": {
            "content": "limpieza y desbroce"
        }
    }
}

res = client.search(index=index_name, body=query)
print("\nResultados de búsqueda:")
for hit in res['hits']['hits']:
    print("-", hit['_source']['title'], "| URL:", hit['_source']['url'])

