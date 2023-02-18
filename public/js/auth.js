const miFormulario = document.querySelector('form')

const url =(window.location.hostname.includes('localhost')) 
        ? 'http://localhost:8081/api/auth/'
        : 'https://backend-basic-production.up.railway.app/api/auth/'

miFormulario.addEventListener('submit', ev => {
    // Evitar que se envie el formulario
    ev.preventDefault()
    const formData = {}

    for (let el of miFormulario.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }
    console.log(formData)
    
    fetch(url + 'login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(({msg, token}) => {
            if (msg) {
                return console.error(msg)
            }
            localStorage.setItem('token', token)
            window.location = 'chat.html'
        })
        .catch(err => console.log(err))

})

function handleCredentialResponse(response) {
         
    const body = { id_token: response.credential  }
    
    fetch(
    url + 'google'
    ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.token)
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.usuario.email);
        window.location = 'chat.html'

    })
    .catch(err => console.log(err))
}

const button = document.getElementById('google_signout');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done =>{
        localStorage.clear()
        // recargar pagina
        window.location.reload();
    });
}