import fs from 'fs';
import crypto from 'crypto';

// Leer CSV
const csv = fs.readFileSync('/home/lucky/plantas/desbroces-pontevedra-site/contact.csv', 'utf8');
const lines = csv.split('\n');
const headers = lines.shift().split(',');

// Hashear emails
const emailIndex = headers.indexOf('email');
const anonymized = lines.map(line => {
  const cols = line.split(',');
  if(cols[emailIndex]) {
    cols[emailIndex] = crypto.createHash('sha256').update(cols[emailIndex]).digest('hex');
  }
  return cols.join(',');
});

// Guardar CSV anonimizado
fs.writeFileSync('/home/lucky/plantas/desbroces-pontevedra-site/contact_anon.csv', [headers.join(','), ...anonymized].join('\n'));
console.log("CSV anonimizado generado: contact_anon.csv");
