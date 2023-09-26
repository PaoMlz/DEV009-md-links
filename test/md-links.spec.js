const funciones = require('../data');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);
const path = require('path');
const fs = require('fs');
const { mdLinks } = require('../index.js');

//RUTA EXISTE
describe('rutaExiste', () => {
  it('debería devolver "El archivo EXISTE!" si la ruta es válida', () => {
    const filePath = './README.md';
    return funciones.rutaExiste(filePath)
      .then(result => {
        expect(result).toBe('El archivo EXISTE!');
      });
  });
//RUTA NO EXISTE
  it('debería devolver "El archivo NO EXISTE!" si la ruta es inválida', () => {
    const fileNoPath = './path/to/nonexistent/file.md';
    return funciones.rutaExiste(fileNoPath)
      .then(result => {
        expect(result).toBe('El archivo NO EXISTE!');
      });
  });
});

//RUTA ABSOLUTA
describe('pathFile', () => {
  it('debería devolver la ruta absoluta', () => {
    const rutaRelativa = '../README.md';
    const resultado = funciones.pathFile(rutaRelativa);
    expect(resultado).toBe('C:\\Users\\LABORATORIA56\\Desktop\\MDLINKS\\README.md');
  });
});

//PROCESAR COMO ARCHIVO
describe('procesarComoArchivo', () => {
  it('debería procesar correctamente', () => {
    const pathEj = './PRUEBAS/PRUEBITAS/mini.md';

    // Configura la simulación de la solicitud HTTP
    mock.onHead('https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4').reply(200);

    return funciones.procesarComoArchivo(pathEj)
      .then(resultado => {
        expect(resultado.contenido).toContain("## 1. Preámbulo");
      });
  });
});

//PROCESAR SI NO ES MD 
it('debería rechazar la promesa si el archivo no es Markdown', () => {
  const pathNoMD = path.resolve(__dirname, 'cli.js'); 
  const validate = true;
  return funciones.procesarComoArchivo(pathNoMD, validate)
    .then(resultado => {
      expect(true).toBe(false);
    })
    .catch(error => {
      expect(error).toBe('El archivo no es Markdown');
    });
  });

//LEER ARCHIVO 
describe('leerArchivo', () => {
  it('debería leer un archivo correctamente', () => {
    const pathEjemplo = './PRUEBAS/PRUEBITAS/mini.md'; // Ruta de un archivo válido (ajusta según tu caso)

    return funciones.leerArchivo(pathEjemplo).then((contenido) => {
     
      expect(contenido).toContain("## 1. Preámbulo");
    });
  });

  it('debería lanzar un error si el archivo no existe', () => {
    const pathInvalido = 'C:\\ruta\\invalida.txt'; 

    return funciones.leerArchivo(pathInvalido).catch((error) => {
      expect(error.message).toBe(`Error al leer archivo: ENOENT: no such file or directory, open '${pathInvalido}'`);
    });
  });
});

//BUSCAR LINKS
describe('searchLinks', () => {
  it('debería encontrar y retornar los links sin validación', () => {
    const contentD = '[Markdown](https://es.wikipedia.org/wiki/Markdown).';
    const pathAbsoluto = './PRUEBAS/PRUEBITAS/mini.md';
  
     return funciones.searchLinks(contentD, pathAbsoluto).then(links =>{
      expect(links).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: './PRUEBAS/PRUEBITAS/mini.md',
        }
      ]);
     });
  
  });

  it('debería encontrar y retornar los links con validación', () => {
    const contentDs = '[Markdown](https://es.wikipedia.org/wiki/Markdown)';
    const pathAbsolutos = './PRUEBAS/PRUEBITAS/mini.md';
    const validate2 = true;

    // Mock de la petición HEAD
    axios.head = jest.fn().mockResolvedValue({ status: 200 });

    return funciones.searchLinks(contentDs, pathAbsolutos, validate2).then(links => {
      expect(links).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: './PRUEBAS/PRUEBITAS/mini.md',
          status: 200,
          ok: 'ok'
        }
      ]);
    });
  });

  it('debería manejar errores de validación de links', () => {
    const contents = '[link](https://example.com) de prueba.';
    const pathAbsolutes = './PRUEBAS/PRUEBITAS/mini.md';
    const validates = true;

    // Mock de la petición HEAD para simular un error
    axios.head = jest.fn().mockRejectedValue(new Error('Error de validación'));

    return funciones.searchLinks(contents, pathAbsolutes, validates).then(links => {
      expect(links).toEqual([
        {
          href: 'https://example.com',
          text: 'link',
          file: './PRUEBAS/PRUEBITAS/mini.md',
          status: 'Error',
          ok: 'fail'
        }
      ]);
    });
  });
});

//PROCESAR RUTA
describe('procesarRuta', () => {
  it('debería retornar un objeto con rutaExiste=true, verificarArchivoMD=true, contenido y linksEncontrados cuando se proporciona una ruta de archivo válida y validate7=false', () => {
    const path7 = './PRUEBAS/PRUEBITAS/mini.md';
    const validate7 = false;

    const expected = {
      rutaExiste: true,
      verificarArchivoMD: true,
      contenido: expect.stringContaining('## 1. Preámbulo'),
      linksEncontrados: [
        {
          file: './PRUEBAS/PRUEBITAS/mini.md',
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown'
        },
        {
          file: './PRUEBAS/PRUEBITAS/mini.md',
          href: 'https://nodejs.org/',
          text: 'Node.js'
        }
      ]
    };

    // Simulando fs.stat
    jest.spyOn(fs, 'stat').mockImplementation((path7, callback) => {
      callback(null, { isFile: () => true });
    });

    // Simulando funciones.procesarComoArchivo
    jest.spyOn(funciones, 'procesarComoArchivo').mockResolvedValue(expected);

    return funciones.procesarRuta(path7, validate7).then((result) => {
      expect(result.rutaExiste).toEqual(expected.rutaExiste);
      expect(result.verificarArchivoMD).toEqual(expected.verificarArchivoMD);
      expect(result.contenido).toEqual(expected.contenido);
      expect(result.linksEncontrados).toEqual(expected.linksEncontrados);
    });
  });
});

//PROCESAR SI NO ES RUTA 
describe('procesarRuta', () => {
  it('debería rechazar la promesa con un mensaje de error si la ruta no es ni un archivo ni un directorio', () => {
    const path = './PRUEBAS/ruta_invalida';
    const validate = true;

    // Simulando fs.stat
    jest.spyOn(fs, 'stat').mockImplementation((path, callback) => {
      // Simulando el caso en el que la ruta no sea ni archivo ni directorio
      callback(null, { isFile: () => false, isDirectory: () => false });
    });

    return expect(funciones.procesarRuta(path, validate)).rejects.toMatch('La ruta no es ni un archivo ni un directorio');
  });
});

//MDLINKS 
it('debería devolver un objeto con la ruta, booleano de existencia, booleano de markdown, contenido del archivo y un array de enlaces con propiedades adicionales cuando se proporciona una ruta válida a un archivo Markdown y la opción de validación está activada', () => {

  // Mocking input
  const inputPath = './PRUEBAS/PRUEBITAS/mini.md';

  // Mocking expected output
  const expectedOutput = {
    rutaExiste: true,
    verificarArchivoMD: true,
    contenido: expect.stringContaining('## 1. Preámbulo'), 
      linksEncontrados: [
      expect.objectContaining({
        file: expect.stringContaining(inputPath), 
        href: 'https://es.wikipedia.org/wiki/Markdown',
        ok: true
      }),
    ]
  };
    
  // Mocking functions
  funciones.pathFile = jest.fn().mockReturnValue(inputPath);
  funciones.rutaExiste = jest.fn().mockReturnValue(true);
  funciones.verificarArchivoMD = jest.fn().mockReturnValue(true);
  funciones.leerArchivo = jest.fn().mockResolvedValue('## 1. Preámbulo');
  funciones.searchLinks = jest.fn().mockResolvedValue([
    { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: inputPath },
  ]);

  // Mocking fs.promises.stat
  fs.promises.stat = jest.fn().mockResolvedValue({ isFile: () => true });

  // Mocking axios.head
  axios.head = jest.fn();
  axios.head.mockResolvedValue({ status: 200, statusText: 'OK' });

  // Calling mdLinks function
  return mdLinks(inputPath, true)
    .then(result => {
      expect(result).toEqual(expectedOutput);
      expect(funciones.pathFile).toHaveBeenCalledWith(inputPath);
      expect(funciones.rutaExiste).toHaveBeenCalledWith(inputPath);
      expect(funciones.verificarArchivoMD).toHaveBeenCalledWith(inputPath);
      expect(funciones.leerArchivo).toHaveBeenCalledWith(inputPath);
      expect(funciones.searchLinks).toHaveBeenCalledWith('## 1. Preámbulo', inputPath, true);
      expect(axios.head).toHaveBeenCalledWith('https://es.wikipedia.org/wiki/Markdown');
    });
});
