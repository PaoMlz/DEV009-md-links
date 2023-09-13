//REVISA EL USO
const { mdLinks } = require('./index.js'); // Asegúrate de que la ruta sea correcta

mdLinks('./Pruebasdirec', true) // Pasar 'true' como segundo argumento para habilitar la validación
  .then((resultados) => {
    // Mostrar los resultados en la consola
    console.log('Resultados de mdLinks:');
    console.log('Ruta Existe:', resultados.rutaExiste);
    console.log('Verificar Archivo MD:', resultados.verificarArchivoMD);
    console.log('Contenido del Archivo:', resultados.contenido);
    console.log('Links Encontrados:', resultados.linksEncontrados);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
