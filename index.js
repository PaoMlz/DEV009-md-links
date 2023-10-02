const fs = require('fs');
const path = require('path');
const axios = require('axios');
const funciones = require('./data.js');


const mdLinks = (inputPath, options = {}) => {
  const pathAbsolute = funciones.pathFile(inputPath);

  if (!funciones.rutaExiste(pathAbsolute)) {
    return Promise.reject('La ruta no existe');
  }

  try {
    const stats = fs.statSync(pathAbsolute);

    if (stats.isFile() && funciones.verificarArchivoMD(pathAbsolute)) {
      return funciones.procesarComoArchivo(pathAbsolute, options.validate)
        .then(resultados => {
          return options.validate ? funciones.validarLinks(resultados) : Promise.resolve(resultados);
        });
    } else if (stats.isDirectory()) {
      return funciones.procesarComoDirectorio(pathAbsolute, options.validate);
    } else {
      throw new Error('La ruta no es ni un archivo ni un directorio');
    }
  } catch (error) {
    return Promise.reject(error.message || 'Ocurrió un error desconocido');
  }
};

module.exports = {
  mdLinks
};
