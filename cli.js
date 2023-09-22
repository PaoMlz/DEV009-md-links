#!/usr/bin/env node

const mdPath = process.argv[2];

const args = require('minimist')(process.argv.slice(2));
const validate = args.validate || false;
const stats = args.stats || false;

const { mdLinks } = require('./index.js');

if (!mdPath) {
  console.error('No hay ruta para analizar');
} else {
  mdLinks(mdPath, validate)
    .then((resultados) => {
      if (validate && stats) {
        const totalLinks = resultados.linksEncontrados ? resultados.linksEncontrados.length : 0;
        const uniqueLinks = new Set(resultados.linksEncontrados.map(link => link.href)).size;

        const brokenLinks = resultados.linksEncontrados.filter(link => link.ok === false).length;

        console.log('Estadísticas:');
        console.log(`Total de Links: ${totalLinks}`);
        console.log(`Links Únicos: ${uniqueLinks}`);
        console.log(`Links Rotos: ${brokenLinks}`);
      } else if (validate) {
        // Mostrar validación
        resultados.linksEncontrados.forEach(link => {
          const texto = link.text.length > 50 ? `${link.text.slice(0, 50)}...` : link.text;
          const statusInfo = link.ok ? ` [OK]` : ` [FAIL]`;
          console.log(`- Ruta: ${link.file}, Texto: ${texto}, URL: ${link.href}${statusInfo}`);
        });
      } else if (stats) {
        // Mostrar solo estadísticas
        const totalLinks = resultados.linksEncontrados ? resultados.linksEncontrados.length : 0;
        const uniqueLinks = new Set(resultados.linksEncontrados.map(link => link.href)).size;

        console.log('Estadísticas:');
        console.log(`Total de Links: ${totalLinks}`);
        console.log(`Links Únicos: ${uniqueLinks}`);
      } else {
        // Mostrar los links sin validación
        resultados.linksEncontrados.forEach(link => {
          const texto = link.text.length > 50 ? `${link.text.slice(0, 50)}...` : link.text;
          console.log(`- Ruta: ${link.file}, Texto: ${texto}, URL: ${link.href}`);
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

