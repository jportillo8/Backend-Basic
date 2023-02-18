const url =(window.location.hostname.includes('localhost')) 
        ? 'http://localhost:8081/api/auth/'
        : 'https://backend-basic-production.up.railway.app/api/auth/'

let usuario = null
let socket = null

// Referencias HTML
const txtUid = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir = document.querySelector('#btnSalir')

// Validar el token del localstorage
const validarJWT = async () => {
    // Aggaramos el token que esta en el localstorage
    const token = localStorage.getItem('token') || ''

    if (token.length <= 10) {
        window.location = 'index.html'
        throw new Error('No hay token en el servidor')
    }

    // Enviar el token al backend, para validar
    // Si el token es valido, el backend nos va a devolver el usuario y el token renovado
    const resp = await fetch(url, {
        headers: { 'x-token': token }
    })

    const { usuario: userDB, token: tokenDB } = await resp.json()
    localStorage.setItem('token', tokenDB)
    usuario = userDB

    document.title = usuario.nombre
    // Vamos a establecer la conexion con el servidor de sockets
    await conectarSocket()
}

const conectarSocket = async() => {
     socket = io({
        'extraHeaders': {
            // Este token ya esta validado
            'x-token': localStorage.getItem('token')
        }
    })

    socket.on('connect', () => {
        console.log('Sockets online')
    })

    socket.on('disconnect', () => {
        console.log('Sockets offline')
    })

    // Mnsajes del servidor
    socket.on('recibir-mensajes', dibujarMensajes)

    socket.on('usuarios-activos', dibujarUsuarios)

    socket.on('mensaje-privado', (payload) => {
        console.log('Privado: ', payload)
    })

    // Escuchar los eventos del servidor
}
const dibujarUsuarios = (usuarios = []) => {
    let usersHtml = ''
    usuarios.forEach(({nombre, uid}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `
    })

    ulUsuarios.innerHTML = usersHtml
}

txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    
    const mensaje = txtMensaje.value;
    const uid     = txtUid.value;

    if( keyCode !== 13 ){ return; }
    if( mensaje.length === 0 ){ return; }

    socket.emit('enviar-mensaje', { mensaje, uid });

    txtMensaje.value = '';

})

const dibujarMensajes = (mensajes = []) => {
    let mensajesHtml = ''
    mensajes.forEach(({nombre, mensaje}) => {
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary">${nombre}</span>
                    <span>${mensaje}</span>
                </p>
            </li>
        `
    })

    ulMensajes.innerHTML = mensajesHtml
}



const main = async () => {

    await validarJWT()
}

main()

// const socket = io()