import { response } from 'express';
import jwt from 'jsonwebtoken';

import { Usuario } from '../models/usuarios.js';

const validarJWT = async (req, res = response, next) => {
    
    const token = req.header('x-token')
    console.log(token)
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // Leer el usuario que corresponde al uid
       const usuario = await Usuario.findById(uid)

       if( !usuario ){
              return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
              })
       }

        // Verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB- estado: false'
            })
        }


       req.usuario = usuario
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

export { validarJWT }