import express from 'express'
import cors from 'cors'

import { dbConnection } from '../database/config.js'
import { routerUsuarios  } from '../routes/usuarios.js'
import { routerAuth  } from '../routes/auth.js'
import { routerCategorias } from '../routes/categorias.js'
import { routerProductos } from '../routes/productos.js'
import { routerBuscar } from '../routes/buscar.js'

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
        }
        // this.usuariosPath = '/api/usuarios'

        // Autenciacion
        // this.authPath = '/api/auth'

        // Categorias
        // this.categoriasPath = '/api/categorias'

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
        this.app.use(this.paths.auth,  routerAuth )
        this.app.use(this.paths.buscar,  routerBuscar )
        this.app.use(this.paths.categorias,  routerCategorias )
        this.app.use(this.paths.productos,  routerProductos )
        this.app.use(this.paths.usuarios,  routerUsuarios )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
          })
    }
}

export { Server } 