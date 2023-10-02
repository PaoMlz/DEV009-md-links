const funciones = require('../data');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);
const path = require('path');
const fs = require('fs');
const { mdLinks } = require('../index.js');


describe('mdLinks', function() {
  it('Debería procesar un archivo MD correctamente', function() {
    return mdLinks('./PRUEBAS/PRUEBITAS/mini.md').then(resultados => {
      // Verificar los resultados según lo esperado
    });
  });

  it('Debería procesar un directorio correctamente', function() {
    return mdLinks('./PRUEBAS').then(resultados => {
      // Verificar los resultados según lo esperado
    });
  });  
});

describe('mdLinks', () => {
  it('Probar la funcion mdlinks', () => {
    const inputPath = './PRUEBAS/PRUEBITAS/mini.md';
    const expectedOutput = [
      {
        "file": "./PRUEBAS/PRUEBITAS/mini.md",
        "href": "https://es.wikipedia.org/wiki/Markdown",
        "ok": true,
        "status": 200,
        "statusText": "OK",
        "text": "Markdown",
      },
      {
        "file": "./PRUEBAS/PRUEBITAS/mini.md",
        "href": "https://nodejs.org/",
        "ok": true,
        "status": 200,
        "statusText": "OK",
        "text": "Node.js",
      }
    ];

    funciones.pathFile = jest.fn().mockReturnValue(inputPath);
    funciones.rutaExiste = jest.fn().mockResolvedValue(true);
    funciones.verificarArchivoMD = jest.fn().mockResolvedValue(true);
    funciones.leerArchivo = jest.fn().mockResolvedValue('## 1. Preámbulo');
    funciones.searchLinks = jest.fn().mockResolvedValue([
      { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: inputPath, status: 200, statusText: 'OK', ok: true },
      { href: 'https://nodejs.org/', text: 'Node.js', file: inputPath, status: 200, statusText: 'OK', ok: true }
    ]);

    fs.promises.stat = jest.fn().mockResolvedValue({ isFile: () => true });
    axios.head = jest.fn().mockResolvedValue({ status: 200, statusText: 'OK' });

    return mdLinks(inputPath, { validate: true })
      .then(result => {
        expect(result).toEqual(expectedOutput);
        expect(funciones.pathFile).toHaveBeenCalledWith(inputPath);
        expect(funciones.rutaExiste).toHaveBeenCalledWith(inputPath);
        expect(funciones.verificarArchivoMD).toHaveBeenCalledWith(inputPath);
        funciones.searchLinks = jest.fn().mockResolvedValue([
          { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: inputPath, status: 200, statusText: 'OK', ok: true },
          { href: 'https://nodejs.org/', text: 'Node.js', file: inputPath, status: 200, statusText: 'OK', ok: true }
        ]);        
        expect(axios.head).toHaveBeenCalledWith('https://es.wikipedia.org/wiki/Markdown');
        expect(axios.head).toHaveBeenCalledWith('https://nodejs.org/');
      });
  });
});
