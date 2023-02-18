import jwt from 'jsonwebtoken'
import {Usuario} from '../models/usuarios.js'

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        // Payload es la informacion que se va a codificar en el JWT
        const payload  = { uid }
        // SecretOrPrivateKey es la palabra secreta que se va a utilizar para firmar el JWT
        // expiresIn es el tiempo de expiracion del JWT
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el JWT')
            } else {
                resolve(token)
            }
        })

    })
    
}

const comprobarJWT = async(token = '') => {
    
        try {

            if (token.length < 10) {
                return null
            }
            const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            const usuario = await Usuario.findById(uid)

            if (usuario) {
                if (usuario.estado) {
                    return usuario
                }else{
                    return null
                }
                return usuario
            }else {
                return null
            }
            
        } catch (error) {
            return null
        }
        
}

export { generarJWT, comprobarJWT  }