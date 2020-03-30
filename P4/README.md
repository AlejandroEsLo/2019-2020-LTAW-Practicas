# Práctica 4:CHAT
Funcionamiento de CHAT:

1) Para arrancar el servidor :
    node chat-server.js

2) Para enviar un mensaje normal, escribir en el parrafo y dar SEND.
LLegara a los otros usuarios, a nosotros y por linea de comandos.

3)El servidor, además, responderá a estos comandos:

    /help: Mostrará una lista con todos los comandos soportados
    /list: Devolverá el número de usuarios conectados
    /hello: El servidor nos devolverá el saludo
    /date: Nos devolverá la fecha

Cuando el servidor detecta que llega un mensaje que empieza por el carácter '/',
lo interpretará como un comando y lo procesará (pero no lo enviará al resto de usuarios del chat).
El resto de mensajes que no sean comandos sí los re-enviará a los participantes del chat.
