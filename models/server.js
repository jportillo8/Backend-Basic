import express from 'express'
import cors from 'cors'
import { router  } from '../routes/usuarios.js'
import { dbConnection } from '../database/config.js'

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Conectar a base de datos
        this.conectarDB()

        // Mildewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()

    }

    async conectarDB() {
        await dbConnection()    
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