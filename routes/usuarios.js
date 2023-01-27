import { Router } from "express";
import { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } from "../controllers/usuarios.js";

const router = Router();

router.get('/', usuariosGet ) 

router.post('/', usuariosPost)

router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)



export { router }