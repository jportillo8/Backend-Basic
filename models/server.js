import express from 'express'
import cors from 'cors'
import { routerUsuarios  } from '../routes/usuarios.js'
import { routerAuth  } from '../routes/auth.js'
import { dbConnection } from '../database/config.js'
import { routerCategorias } from '../routes/categorias.js'

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
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
        this.app.use(this.paths.usuarios,  routerUsuarios )
        this.app.use(this.paths.categorias,  routerCategorias )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
          })
    }
}
export { Server } 