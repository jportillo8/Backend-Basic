import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import { dbConnection } from '../database/config.js'
import { routerUsuarios  } from '../routes/usuarios.js'
import { routerAuth  } from '../routes/auth.js'
import { routerCategorias } from '../routes/categorias.js'
import { routerProductos } from '../routes/productos.js'
import { routerBuscar } from '../routes/buscar.js'
import { routerUploads } from '../routes/uploads.js'

// WebSockets
import { Server as ServerIo  } from 'socket.io'
import { createServer } from 'http'
import { socketController } from '../sockets/socketController.js'

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Crear el servidor de express y el de websockets
        this.serverIo = createServer(this.app)
        this.io = new ServerIo(this.serverIo)

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'

        }
        // Conectar a base de datos
        this.conectarDB()

        // Mildewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
        
        // Sockets - Configuracion de los sockets
        this.sockets()


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

        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    // Metodo para las rutas
    routes() {
        this.app.use(this.paths.auth,  routerAuth )
        this.app.use(this.paths.buscar,  routerBuscar )
        this.app.use(this.paths.categorias,  routerCategorias )
        this.app.use(this.paths.productos,  routerProductos )
        this.app.use(this.paths.usuarios,  routerUsuarios )
        this.app.use(this.paths.uploads,  routerUploads )
    }

    // Metodo para configurar los sockets
    sockets() {
        this.io.on('connection', socketController)
    }

    listen(){
        this.serverIo.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
          })
    }
}

export { Server } 