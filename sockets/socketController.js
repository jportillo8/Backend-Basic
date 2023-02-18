import { Socket } from "socket.io"
import { comprobarJWT } from "../helpers/generar-jwt.js"
import { ChatMensajes } from "../models/chat-mensajes.js"

// Creamos una instancia de chat mensajes
const chatMensajes = new ChatMensajes()


// El io son todas las conexiones de los clientes a mi servidor de sockets
const socketController = async (socket = new Socket(), io ) => {
    // Validaremos el JWT
    const token = socket.handshake.headers['x-token']
   const usuario =  await comprobarJWT(token)

    if (!usuario) {
        console.log('No se pudo verificar el JWT')
        return socket.disconnect()
    }
    // Cuando el cliente se conecta debo emitir todos los usuarios conectados
    chatMensajes.conectarUsuario(usuario) // Agregamos el usuario que encontramos en el token
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)

    // Conectarlo a una sala especial
    socket.join(usuario.id) // Global, socket.id, usuario.id

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr)

    })

    // Escuchar cuando el cliente manda un mensaje
    socket.on('enviar-mensaje', ({ uid, mensaje }) => {

        if ( uid ) {
            // Mensaje privado
            socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje })
        } else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }

    })

}

export { socketController }