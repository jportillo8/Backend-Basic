import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

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

export { routerAuth }