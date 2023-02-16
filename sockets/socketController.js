import { Socket } from "socket.io"

// TODO: borrar new Socket y el import "socket.io"

const socketController = (socket = new Socket ) => {
    console.log('Cliente conectado', socket.id)
}

export { socketController  }