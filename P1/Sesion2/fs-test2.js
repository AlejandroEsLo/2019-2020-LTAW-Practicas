const fs = require('fs');

console.log("Este mensaje está AL COMIENZO del código")

//-- Leer el fichero. Al terminar se invoca a la función show_file
fs.readFile('test.txt', 'utf8', show_file);

//-- Funcion llamada cuando se ha terminado de leer el fichero
function show_file(err, data) {
    console.log("---> Comienzo del fichero leido")
    console.log(data)
    console.log("---> Final del fichero")
}

console.log("Este mensaje está al FINAL del código")

// Para ver que es conexion asincrona , no se queda esperando a
// que llegue lo siguiente, cuando le toque se ejecuta sin esperar.
