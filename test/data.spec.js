const funciones = require('../data.js'); 
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);
const path = require('path');
const fs = require('fs');

// RUTA EXISTE
describe('rutaExiste', () => {
  it('debería devolver "El archivo EXISTE!" si la ruta es válida', () => {
    const filePath = './README.md';
    return funciones.rutaExiste(filePath)
      .then(result => {
        expect(result).toBe('El archivo EXISTE!');
      });
  });
});

  // RUTA NO EXISTE
  it('debería devolver "El archivo NO EXISTE!" si la ruta es inválida', () => {
    const fileNoPath = './path/to/nonexistent/file.md';
    return funciones.rutaExiste(fileNoPath)
      .then(result => {
        expect(result).toBe('El archivo NO EXISTE!');
      });
  });

  // PATH FILE
describe('pathFile', () => {
  it('debería devolver la ruta absoluta', () => {
    const rutaRelativa = '../README.md';
    const resultado = funciones.pathFile(rutaRelativa);
    expect(resultado).toBe('C:\\Users\\LABORATORIA56\\Desktop\\MDLINKS\\README.md');
  });
});

// PROCESAR COMO DIRECTORIO
describe('procesarComoDirectorio', () => {
  it('debería procesar un directorio correctamente', () => {
    const pathq = './PRUEBAS/PRUEBITAS'; 
    const validate78 = true;
    return funciones.procesarComoDirectorio(pathq, validate78).then(resultados => {
      expect(resultados).toHaveLength(2); 
    });
  });
});

//PROCESAR COMO ARCHIVO
describe('procesarComoArchivo', () => {
  it('debería procesar correctamente un archivo Markdown', () => {
    const filePath = './PRUEBAS/PRUEBITAS/mini.md'; 
    const validate = true; 

    return funciones.procesarComoArchivo(filePath, validate)
      .then(resultados => {
        expect(resultados.length).toBe(2); 
        resultados.forEach(enlace => {
          expect(enlace.error).toBeUndefined(); 
        });
      })
      .catch(error => {
        expect(error).toBeUndefined(); 
      });
  });

  it('deberia decir que el archivo NO ES MD', () => {
    const filePathNoMarkdown = './PRUEBAS/PRUEBITAS/data.js'; 
    const validate = true;

    return funciones.procesarComoArchivo(filePathNoMarkdown, validate)
      .catch(error => {
        expect(error).toBe('El archivo no es Markdown');
      });
  });
});


// LEER ARCHIVO
describe('leerArchivo', () => {
  it('debería leer un archivo correctamente', () => {
    const pathEjemplo = './PRUEBAS/PRUEBITAS/mini.md'; 

    return funciones.leerArchivo(pathEjemplo).then(contenido => {
      expect(contenido).toContain("## 1. Preámbulo");
    });
  });

  it('debería lanzar un error si el archivo no existe', () => {
    const pathInvalido = 'C:\\ruta\\invalida.txt';

    return funciones.leerArchivo(pathInvalido).catch(error => {
      expect(error.message).toBe(`Error al leer archivo: ENOENT: no such file or directory, open '${pathInvalido}'`);
    });
  });

  it('debería manejar un error desconocido al leer el archivo', () => {
    return expect(funciones.leerArchivo('archivo_inexistente.txt')).rejects.toThrow(`Error al leer archivo: ENOENT: no such file or directory, open 'C:\\Users\\LABORATORIA56\\Desktop\\MDLINKS\\DEV009-md-links\\archivo_inexistente.txt'`);
  });
});

// SEARCH LINKS
describe('searchLinks', () => {
  it('debería encontrar y retornar los links sin validación', () => {
    const contentD = '[Markdown](https://es.wikipedia.org/wiki/Markdown).';
    const pathAbsoluto = './PRUEBAS/PRUEBITAS/mini.md';

    return funciones.searchLinks(contentD, pathAbsoluto).then(links => {
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

//LISTAR ARCHIVOS
describe('listarArchivosMD', () => {
  it('debería listar correctamente los archivos MD en un directorio', () => {
    const ruta = './PRUEBAS/PRUEBITAS';

    return funciones.listarArchivosMD(ruta).then(archivos => {
      expect(archivos).toEqual(['mini.md']);
    });
  });

  it('debería manejar errores al listar archivos', () => {
    const ruta = './RUTA/INEXISTENTE';

    return funciones.listarArchivosMD(ruta).catch(error => {
      expect(error).toContain('Error al leer directorio');
    });
  });

  it('debería devolver un arreglo vacío cuando no hay archivos MD', () => {
    const ruta = './test';

    return funciones.listarArchivosMD(ruta).then(archivos => {
      expect(archivos).toEqual([]);
    });
  });
});

//VERIFICAR ARCHIVO MD
describe('verificarArchivoMD', () => {
  it('debería retornar true para un archivo Markdown', () => {
    const filePathMD = './PRUEBAS/PRUEBITAS/mini.md';
    const result = funciones.verificarArchivoMD(filePathMD);
    expect(result).toBe(true);
  });

  it('debería retornar false para un archivo que no es Markdown', () => {
    const filePathNoMD = './PRUEBAS/PRUEBITAS/data.js';
    const result = funciones.verificarArchivoMD(filePathNoMD);
    expect(result).toBe(false);
  });
});

// VALIDAR LINKS
describe('validarLinks', () => {
  it('debería manejar errores de validación de links', () => {
    const links = [
      { href: 'https://www.example.com/notfound', text: 'Not Found', file: 'test.md' },
    ];

    return funciones.validarLinks(links).then(validatedLinks => {
      validatedLinks.forEach(link => {
        expect(link.ok).toBe(false);
        expect(link.status).toBe("Error");
        expect(link.statusText).toBe("Error de validación"); 
      });
    });
  });
});

