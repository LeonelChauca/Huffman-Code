
function compress() {
    const inputText = document.getElementById('input-text').value;
    const frecuencias = calcularFrecuencias(inputText);
    const arbolHuffman = construirArbol(frecuencias);
    const codigos = {};
    generarCodigos(arbolHuffman, "", codigos);
    const textoComprimido = comprimirTexto(inputText, codigos);
    console.log(frecuencias)
    console.log(arbolHuffman)
    document.getElementById('compressed-text').textContent = textoComprimido;

  }

class Nodo {
  constructor(caracter, frecuencia) {
    this.caracter = caracter;
    this.frecuencia = frecuencia;
    this.izquierda = null;
    this.derecha = null;
  }
}


function calcularFrecuencias(texto) {
  const frecuencias = {};
  for (let i = 0; i < texto.length; i++) {
    if (frecuencias.hasOwnProperty(texto[i])) {
      frecuencias[texto[i]]++;
    } else {
      frecuencias[texto[i]] = 1;
    }
  }
  return frecuencias;
}


function construirArbol(frecuencias) {
  const listaNodos = [];
  for (let caracter in frecuencias) {
    listaNodos.push(new Nodo(caracter, frecuencias[caracter]));
  }

  while (listaNodos.length > 1) {
    listaNodos.sort((a, b) => a.frecuencia - b.frecuencia);

    const nodoIzquierdo = listaNodos.shift();
    const nodoDerecho = listaNodos.shift();

    const nuevoNodo = new Nodo(null, nodoIzquierdo.frecuencia + nodoDerecho.frecuencia);
    nuevoNodo.izquierda = nodoIzquierdo;
    nuevoNodo.derecha = nodoDerecho;

    listaNodos.push(nuevoNodo);
  }

  return listaNodos[0];
}


function generarCodigos(nodo, codigoActual, codigos) {
  if (nodo.caracter !== null) {
    codigos[nodo.caracter] = codigoActual;
  } else {
    generarCodigos(nodo.izquierda, codigoActual + "0", codigos);
    generarCodigos(nodo.derecha, codigoActual + "1", codigos);
  }
}


function comprimirTexto(texto, codigos) {
  let textoComprimido = "";
  for (let i = 0; i < texto.length; i++) {
    textoComprimido += codigos[texto[i]];
  }
  return textoComprimido;
}


