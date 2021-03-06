//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);

//<<<<< contador usuarios >>>>>
let cont_usu = 0;

//-- Puerto donde lanzar el servidor
const PORT = 8000

//-- Variable para luego mostrar la fecha
var fecha = new Date();

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Otra vista de prueba
app.get('/woala', (req, res) => {
  res.send('WOALA! Chuck Norris approved!! :-)');
  console.log("Acceso a /woala");
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  //<<<<< Sumamos uno al contador >>>>>
  cont_usu += 1;

  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado!. Socket id: ' + socket.id);

  //-- Le damos la bienvenida a través del evento 'hello'
  //-- ESte evento lo hemos creado nosotros para nuestro chat
  socket.emit('hello', "Bienvenido al Chat. Eres el usuario numero:" + cont_usu);

  //-- Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);

    //-- Enviar el mensaje a TODOS los clientes que estén conectados
    io.emit('msg', msg);
  })


  socket.on('cmd', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);

    if(msg =='/help'){
      socket.emit('cmd', " Comandos posibles: /help , /list, /hello, /date ");
    }else if (msg =='/list') {
      socket.emit('cmd', " Numero de usuarios conectados:  " + cont_usu);
    }else if (msg =='/hello') {
      socket.emit('cmd', "Hello");
    }else if (msg =='/date') {
      socket.emit('cmd', fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
    }else {
      socket.emit('cmd', " Comando Erroneo: ejecute /help para ver los comandos permitidos ");
    }
  })


  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
    //<<<<< Restamos uno al contador >>>>>
    cont_usu -= 1;
  });
});
