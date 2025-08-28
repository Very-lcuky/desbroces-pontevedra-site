import { create } from 'ipfs-http-client';
import fs from 'fs';
import crypto from 'crypto';

// Tu API Key de Alchemy
const ALCHEMY_API_KEY = 'hpm3wjQJZ31MCYtCUfJen';
const ALCHEMY_IPFS_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/ipfs`;

// Rutas de los archivos
const CSV_PATH = '/home/lucky/plantas/desbroces-pontevedra-site/contact.csv';
const CSV_ANON_PATH = '/home/lucky/plantas/desbroces-pontevedra-site/contact_anon.csv';

async function main() {
  try {
    // Leer CSV original
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = csv.split('\n');
    const headers = lines.shift().split(',');
    const emailIndex = headers.indexOf('email');

    // Anonimizar emails
    const anonymizedLines = lines.map(line => {
      const cols = line.split(',');
      if (cols[emailIndex]) {
        cols[emailIndex] = crypto.createHash('sha256').update(cols[emailIndex]).digest('hex');
      }
      return cols.join(',');
    });

    // Guardar CSV anonimizado
    fs.writeFileSync(CSV_ANON_PATH, [headers.join(','), ...anonymizedLines].join('\n'));
    console.log(`CSV anonimizado creado en: ${CSV_ANON_PATH}`);

    // Conectar a Alchemy IPFS
    const ipfs = create({ url: ALCHEMY_IPFS_URL });

    // Leer CSV anonimizado
    const file = fs.readFileSync(CSV_ANON_PATH);

    // Subir a IPFS
    const result = await ipfs.add(file);

    console.log("Archivo subido a IPFS con hash:", result.path);
    console.log("URL pública:", `https://ipfs.io/ipfs/${result.path}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();

