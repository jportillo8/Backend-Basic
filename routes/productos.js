import { Router } from "express";
import { check } from "express-validator";

import { crearProducto,
         obtenerProductos,
         obtenerProducto,
         actualizarProducto,
         borrarProducto } from "../controllers/producto.js";

import { existeCategoriaPorId, 
         existeProductoPorId } from "../helpers/db-validators.js";

import { validarCampos, validarJWT, esAdminRole, tieneRole} from "../middlewares/index.js";

const routerProductos = Router()

routerProductos.get('/', obtenerProductos)

routerProductos.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto)

routerProductos.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] , obtenerProducto )

routerProductos.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

routerProductos.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)




export{ routerProductos  }