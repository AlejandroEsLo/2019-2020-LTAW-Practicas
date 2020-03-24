console.log("Ejecutando cliente JS...");

//-- Obtener los elementos del DOM
const display = document.getElementById("display");
const msg = document.getElementById("msg");
const send = document.getElementById("send");
const cmd = document.getElementById("msg");


//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Se ha recibido el evento 'hello':
//-- Es el mensaje de bienvenida del servidor
socket.on('hello', (msg) => {

  //-- Mostrarlo en la consola del navegador, para
  //-- depurar
  console.log("Mensaje del servidor: " + msg);

  //-- Ponerlo en el párrafo display
  display.innerHTML = msg;
});

//-- Se ha recibido un mensaje
socket.on('msg', (msg) => {
  //-- Añadirlo al párrafo display
  display.innerHTML += "<br> > " + msg;
});

//-- <<<<<Se ha recibido un comando>>>>>:
socket.on('cmd', (msg) => {

  //-- Mostrarlo en la consola del navegador, para
  //-- depurar
  console.log("Mensaje del servidor: " + msg);

  //-- Ponerlo en el párrafo display
  display.innerHTML += "<br> > " + msg;
});


//-- Botón de envío apretado
send.onclick = () => {

  //-- Se envía el mensaje escrito
  //-- Usamos el nombre 'msg' para los mensajes de usuario
  //-- Si no se ha introducido ningún mensaje, no se envía
  if (msg.value[0] != '/' ){
    socket.emit('msg', msg.value)
    //-- Borramos el mensaje escrito
    msg.value="";

  }else {//Si el primer caracter es / se refiere a un comando
    socket.emit('cmd', msg.value)
    //-- Borramos el mensaje escrito
    msg.value="";
  }

}
