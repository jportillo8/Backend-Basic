import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login, renovarToken } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const routerAuth = Router();

routerAuth.post('/login',[
    check('email', 'El emailll es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login ) 

routerAuth.post('/google',[
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn )

routerAuth.get('/', validarJWT, renovarToken)

export { routerAuth }