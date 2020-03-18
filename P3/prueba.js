const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const PUERTO = 8000

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {

  //-- Mostrar en la consola el recurso al que se accede
  const q = url.parse(req.url, true);
  console.log("Petición: " + q.pathname)

  //-- Creamos varaibles para obtener terminaciones y el objeto que queremos
  let terminacion = path.extname(q.pathname)
  let recurso = q.pathname

  //-- Leer las cookies
  const cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  if (cookie) {
    //-- Separamos elementos de nuestra cadena cookie
    var elementos_cookie = cookie.split(';');
    console.log("ELEMENTOS COOKIES =>>" + elementos_cookie);
    console.log("ELEMENTO [0] =>>" + elementos_cookie[0]);
  }

  //-- Segun el recurso al que se accede
  switch (q.pathname) {

    //-- Pagina principal
    case "/":
      content = "Bienvenido a mi tienda "

      recurso = "index.html"
      //--- OBTENER RECURSO ENTERO
      recurso = "./" + recurso

      //-- No hay ninguna cookie
      if (!cookie) {
        content += "\nNo te conozco... Registrate!\n"
        content += "Accede a /login"

      //-- Hay definida una Cookie.
      } else {
        content += "ALEX"
      }

      res.statusCode = 200;
      break;

    //-- En caso de pulsar el boton de login, nos registramos
    case "/registro.html":

      content = "Registrado! Cookie enviada al navegador!"
      recurso = "registro.html"
      //--- OBTENER RECURSO ENTERO
      recurso = "./" + recurso
      console.log("REGISTRADOOO");

      //-- ESTABLECER LA COOKIE!! En el campo set-cookie metemos la cookie que tengamos
      res.setHeader('Set-Cookie', 'user=ALEX')
      break

    //-- En caso de pulsar el boton de carrito, nos añade producto al carrito
    case "/producto1":

    //--("user=ALEX" in elementos_cookie)   && 

      if (cookie ) {
        if(('user=ALEX' in elementos_cookie) == true){
            content = "Producto añadido al carrito"
            recurso = "producto1.html"
            //--- OBTENER RECURSO ENTERO
            recurso = "./" + recurso
            console.log("Producto 1 añadido");

            //-- ESTABLECER LA COOKIE!! En el campo set-cookie metemos la cookie que tengamos
            res.setHeader('Set-Cookie', 'value=Producto1')
            break
        }
      }else{
        content = "Registrate para añadir productos al carrito"
        recurso = "carrito.html"
        //--- OBTENER RECURSO ENTERO
        recurso = "./" + recurso
        console.log("No puedo añadir producto");

        break
      }

    case "/producto2":

      if (('user=ALEX' in elementos_cookie) == true) {
        content = "Producto añadido al carrito"
        recurso = "producto2.html"
        //--- OBTENER RECURSO ENTERO
        recurso = "./" + recurso
        console.log("Producto 2 añadido");

        //-- ESTABLECER LA COOKIE!! En el campo set-cookie metemos la cookie que tengamos
        res.setHeader('Set-Cookie', 'value=Producto2')
        break
      }else{
        content = "Registrate para añadir productos al carrito"
        recurso = "carrito.html"
        //--- OBTENER RECURSO ENTERO
        recurso = "./" + recurso
        console.log("No puedo añadir producto");

        break
      }


    //-- Se intenta acceder a cualquier otro recurso
    default:
      recurso = q.pathname
      recurso = "./" + recurso
  }

console.log("COOKIES =>> " + cookie);

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
  //-- Generar el mensaje de respuesta
  res.setHeader('Content-Type', mime)
  res.write(data);
  res.write(content);
  res.end();
  });
}

//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(peticion)

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
