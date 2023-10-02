#!/usr/bin/env node

const mdPath = process.argv[2];

const args = require('minimist')(process.argv.slice(2));
const options = {
  validate: args.validate || false,
  stats: args.stats || false
};

const { mdLinks } = require('./index.js');

if (!mdPath) {
  console.error('No hay ruta para analizar');
} else {
  mdLinks(mdPath, options)
    .then((resultados) => {
      if (options.stats) {
        const totalLinks = resultados ? resultados.length : 0;
        const uniqueLinks = new Set(resultados.map(link => link.href)).size;

        if (options.validate) {
          const brokenLinks = resultados.filter(link => link.ok === false).length;

          console.log(`Total de Links: ${totalLinks}`);
          console.log(`Links Únicos: ${uniqueLinks}`);
          console.log(`Links Rotos: ${brokenLinks}`);
        } else {
          console.log(`Total de Links: ${totalLinks}`);
          console.log(`Links Únicos: ${uniqueLinks}`);
        }
      } else if (options.validate) {
        resultados.forEach(link => {
          const texto = link.text.length > 50 ? `${link.text.slice(0, 50)}...` : link.text;
          const statusInfo = link.ok ? ` [OK]` : ` [FAIL]`;
          console.log(`- Ruta: ${link.file}, Texto: ${texto}, URL: ${link.href}${statusInfo},Status:${link.status}`);
        });
      } else {
        resultados.forEach(link => {
          const texto = link.text.length > 50 ? `${link.text.slice(0, 50)}...` : link.text;
          console.log(`- Ruta: ${link.file}, Texto: ${texto}, URL: ${link.href}`);
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
