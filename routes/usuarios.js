import { Router } from "express";
import { check } from "express-validator";
import { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } from "../controllers/usuarios.js";
import { emailExiste, esRoleValido, existeUsuarioPorId } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
 


const router = Router();

router.get('/', usuariosGet ) 

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( emailExiste ),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    // Esta validacion solo funciona con un string enduro
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // validacion personalizada
    // check('role').custom( rol => esRoleValido(rol) ),
    check('role').custom( esRoleValido ),
    validarCampos

], usuariosPost)

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut)

router.patch('/',[
   
], usuariosPatch)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete)



export { router }