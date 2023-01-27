import express from 'express'
import cors from 'cors'
import { router  } from '../routes/usuarios.js'

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.usuariosPath = '/api/usuarios'

        // Mildewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()

    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))
    }

    // Metodo para las rutas
    routes() {
        this.app.use(this.usuariosPath,  router )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
          })
    }
}
export { Server } 
