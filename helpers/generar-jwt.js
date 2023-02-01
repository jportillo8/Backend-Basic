import jwt from 'jsonwebtoken';

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

export { generarJWT }