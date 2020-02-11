const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);

  //console.log("search: " + q.search)  // Buscar objeto
  console.log("Recurso:" + q.pathname)
  console.log("Terminacion:" + path.extname(q.pathname))
  console.log("Nombre:" + path.basename(q.pathname))

  //-- Creamos varaibles para obtener terminaciones y el objeto que queremos
  let terminacion = path.extname(q.pathname)
  let recurso = q.pathname

  //-- Obtener fichero a devolver(Para que coja al principio el index.html)
  if (q.pathname == "/")
    recurso = "index.html"
  //--- OBTENER RECURSO ENTERO
  recurso = "./" + recurso

  //-- Leer fichero
  fs.readFile(recurso, function(err, data) {

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Tipo mime por defecto: html
    let mime = ""

    if (terminacion == ".css"){
      mime = "text/css"

    }else if(terminacion == ".jpg"){
      mime = "image/jpg"

    }else if(terminacion == ".png"){
      mime = "image/png"

    }else {
      mime = "text/html"
    }

    console.log("MIME:" + mime)
    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });


}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
