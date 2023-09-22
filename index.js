const fs = require('fs');
const path = require('path');
const axios = require('axios');
const funciones = require('./data.js');

const mdLinks = (inputPath, validate = false) => {
  const pathAbsolute = funciones.pathFile(inputPath);

  if (!funciones.rutaExiste(pathAbsolute)) {
    return Promise.reject('La ruta no existe');
  }

  return fs.promises.stat(pathAbsolute)
    .then(stats => {
      if (stats.isFile() && funciones.verificarArchivoMD(pathAbsolute)) {
        return funciones.leerArchivo(pathAbsolute)
          .then(contenido => funciones.searchLinks(contenido, pathAbsolute, validate))
          .then(links => {
            const resultados = {
              rutaExiste: true,
              verificarArchivoMD: true,
              contenido: '',
              linksEncontrados: links,
            };
            return validate ? validarLinks(resultados) : resultados;
          });
      } else if (stats.isDirectory()) {
        return fs.promises.readdir(pathAbsolute)
          .then(contents => {
            const promises = contents.map(item => {
              const itemPath = path.join(pathAbsolute, item);
              return mdLinks(itemPath, validate);
            });
            return Promise.all(promises);
          })
          .then(results => {
            return results.reduce((acc, result) => acc.concat(result), []); // Combinar resultados
          });
      } else {
        throw new Error('La ruta no es ni un archivo ni un directorio');
      }
    })
    .catch(error => {
      throw error.message || 'Ocurrió un error desconocido';
    });
};


const validarLinks = (resultados) => {
  const promesasValidacion = resultados.linksEncontrados.map(link => {
    return axios.head(link.href)
      .then(response => {
        link.status = response.status;
        link.statusText = response.statusText;
        link.ok = response.status >= 200 && response.status <= 299;
        return link;
      })
      .catch(error => {
        link.status = 'Error';
        link.statusText = error.message;
        link.ok = false;
        return link;
      });
  });

  return Promise.all(promesasValidacion)
    .then(validatedLinks => {
      resultados.linksEncontrados = validatedLinks;
      return resultados;
    });
};

module.exports = {
  mdLinks
};
