import { Router } from "express";
import { check } from "express-validator";
import { crearCategoria, actualizarCategoria, obtenerCategorias, obtenerCategoria, borrarCategoria } from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routerCategorias = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
routerCategorias.get('/', obtenerCategorias )

// Obtener una categoria por id - publico
routerCategorias.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

// Crear categoria - privado - cualquier persona con un token valido
routerCategorias.post('/',[validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// Actualizar - privado - cualquier persona con un token valido
routerCategorias.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)

// Borrar una categoria - Admin
routerCategorias.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)

export { routerCategorias }

// VAlidar que exista el id de la categoria