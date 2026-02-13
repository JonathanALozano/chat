# Chat en Tiempo Real con Node.js y Socket.IO

## Descripción

Este proyecto implementa una aplicación de chat en tiempo real utilizando **Node.js**, **Express** y **Socket.IO**.  
Permite la comunicación simultánea entre múltiples clientes conectados al servidor mediante WebSockets.

Los mensajes se transmiten instantáneamente sin necesidad de recargar la página.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- Socket.IO
- HTML5
- CSS3
- JavaScript

---

## Funcionamiento

El servidor utiliza:

- **Express** para servir los archivos estáticos.
- **Socket.IO** para manejar conexiones en tiempo real.

Cuando un usuario:
- Se conecta → el servidor notifica a los demás usuarios.
- Envía un mensaje → se transmite a todos los clientes conectados.
- Se desconecta → se notifica al resto.

---



