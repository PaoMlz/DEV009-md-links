const fs = require('fs');
const path = require('path');
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
            return resultados;
          });
      } else if (stats.isDirectory()) {
        return funciones.procesarComoDirectorio(pathAbsolute, validate);
      } else {
        throw new Error('La ruta no es ni un archivo ni un directorio');
      }
    })
    .catch(error => {
      throw error.message || 'Ocurrió un error desconocido';
    });
};

module.exports = {
  mdLinks
};

