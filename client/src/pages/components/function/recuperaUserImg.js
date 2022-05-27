
export function handleAlterImage(e) {

    var img = document.getElementById('imgLoggedUser');

    const urlUser = 'http://192.168.10.122:1212/files/' // FIXME TO IP SERVER

    const user = JSON.parse(localStorage.getItem('user'))

    img.src = urlUser + user.usuario.user_foto
}
