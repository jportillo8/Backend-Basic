import { Router } from 'express'
import { check } from 'express-validator'  
import { actualizarImagen, cargarArchivo, mostrarImagen, actualizarImagenCloudinary } from '../controllers/uploads.js'
import { coleccionesPermitidas } from '../helpers/db-validators.js'
import { validarCampos, validarArchivoSubir  } from '../middlewares/index.js'


const routerUploads = Router()

routerUploads.post( '/' ,validarArchivoSubir, cargarArchivo)
routerUploads.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check( 'id' , 'El id debe ser de mongo' ).isMongoId(),
    check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios' , 'productos' ])),
    validarCampos
] ,actualizarImagenCloudinary)
// ] ,actualizarImagen)

routerUploads.get( '/:coleccion/:id', [
    check( 'id' , 'El id debe ser de mongo' ).isMongoId(),
    check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios' , 'productos' ])),
    validarCampos
], mostrarImagen)

export  { routerUploads }