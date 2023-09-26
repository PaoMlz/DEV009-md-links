const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Convertir en una ruta absoluta
const pathFile = (rutaRelativa) => {
  return path.resolve(rutaRelativa);
};

const rutaExiste = (path) => {
  return fs.promises.access(path)
    .then(() => "El archivo EXISTE!")
    .catch(() => "El archivo NO EXISTE!");
};

function procesarRuta(path, validate) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(`Error al obtener estadísticas de archivo: ${err.message}`);
      } else {
        if (stats.isFile()) {
          procesarComoArchivo(path, validate)
            .then(resolve)
            .catch(reject);
        } else if (stats.isDirectory()) {
          procesarComoDirectorio(path, validate)
            .then(resolve)
            .catch(reject);
        } else {
          reject('La ruta no es ni un archivo ni un directorio');
        }
      }
    });
  });
}

function procesarComoArchivo(path, validate) {
  return new Promise((resolve, reject) => {
    if (!verificarArchivoMD(path)) {
      reject('El archivo no es Markdown');
      return;
    }

    leerArchivo(path)
      .then((contenido) => {
        searchLinks(contenido, path, validate)
          .then((links) => {
            const resultados = {
              rutaExiste: true,
              verificarArchivoMD: true,
              contenido,
              linksEncontrados: links,
            };
            resolve(resultados);
          })
          .catch((error) => reject(error.message || 'Ocurrió un error desconocido'));
      })
      .catch((error) => reject(error.message || 'Ocurrió un error desconocido'));
  });
}

function procesarComoDirectorio(ruta, validate) {
  return new Promise((resolve, reject) => {
    fs.readdir(ruta, (err, dirContents) => {
      if (err) {
        reject(`Error al leer directorio: ${err.message}`);
      } else {
        const archivosMD = dirContents.filter((archivo) => {
          const archivoPath = path.join(ruta, archivo);
          try {
            const stat = fs.statSync(archivoPath);
            return stat.isFile() && verificarArchivoMD(archivoPath);
          } catch (error) {
            return false;
          }
        });

        const promesas = archivosMD.map((archivo) => {
          const archivoPath = path.join(ruta, archivo);
          return leerArchivo(archivoPath)
            .then((contenido) => searchLinks(contenido, archivoPath, validate));
        });

        Promise.all(promesas)
          .then((links) => {
            resolve({
              rutaExiste: true,
              verificarArchivoMD: archivosMD.length > 0,
              linksEncontrados: links.flat(),
            });
          })
          .catch((error) => reject(`Error al procesar como directorio: ${error.message}`));
      }
    });
  });
}

// Leer el archivo 
const leerArchivo = (filePath) => {
  return fs.promises.readFile(filePath, 'utf8')
    .then((contenido) => contenido)
    .catch((error) => {
      throw new Error(`Error al leer archivo: ${error.message}`);
    });
};

// Asegurar que el archivo es markdown 
const verificarArchivoMD = (filePath) => {
  const archivoMD = path.extname(filePath);

  if (archivoMD === ".md") {
    return true;
  } else {
    return false;
  }
};

// Encontrar los links dentro del documento 
const searchLinks = (content, pathAbsolute, validate = false) => {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
  const linksEnDoc = [];

  let match;
  let promiseChain = Promise.resolve();

  while ((match=regex.exec(content))  !== null){
    const linkObj = {
      href: match[2],
      text: match[1],
      file: pathAbsolute,
    };

    if (validate) {
      promiseChain = promiseChain.then(() => {
        return axios.head(linkObj.href)
          .then(response => {
            linkObj.status = response.status;
            linkObj.ok = response.status >= 200 && response.status <= 299 ? 'ok' : 'fail';
          })
          .catch(error => {
            linkObj.status = 'Error';
            linkObj.ok = 'fail';
          });
      });
    }

    linksEnDoc.push(linkObj);
  }

  return promiseChain.then(() => linksEnDoc);
};


module.exports = { searchLinks, leerArchivo, verificarArchivoMD, rutaExiste, pathFile, procesarRuta, procesarComoDirectorio, procesarComoArchivo,  };

