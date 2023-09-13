const { mdLinks } = require('../index.js');
const funciones = require('../data.js');

test('función mdLinks devuelve una promesa', () => {
  const result = mdLinks('./README.md');
  expect(result).toBeInstanceOf(Promise); // Comprueba que mdLinks devuelve una promesa
});

test('función de búsqueda de enlaces', () => {
  const content = '[Markdown](https://es.wikipedia.org/wiki/Markdown)';
  // Llama a la función searchLinks pasando el contenido
  const linksEncontrados = funciones.searchLinks(content);
  expect(linksEncontrados).toHaveLength(1); // Comprueba que se encontraron dos enlaces
  expect(linksEncontrados[0]).toEqual({ href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown' }); // Asegura que el primer enlace es correcto
});

test('función revisar si la ruta existe', () => {
  const ruta = './README.md'; // Reemplaza con la ruta correcta al archivo que deseas verificar
  const existe = funciones.rutaExiste(ruta);
  expect(existe).toBe(true); // Comprueba que la ruta existe
});

test('función revisar si el archivo es Markdown', () => {
  const filePath = './README.md'; // Reemplaza con la ruta correcta al archivo .md
  const resultado = funciones.verificarArchivoMD(filePath);
  expect(resultado).toBe('el archivo es markDown'); // Comprueba que el resultado sea la cadena esperada
});


