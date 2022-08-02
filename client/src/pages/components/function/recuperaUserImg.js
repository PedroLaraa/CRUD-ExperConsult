
export function handleAlterImage(e) {

    var img = document.getElementById('imgLoggedUser');

    var nomeUser = document.getElementById('nomeUserLogado');

    const urlUser = 'http://192.168.10.127:1212/files/'; // FIXME TO IP SERVER

    const user = JSON.parse(localStorage.getItem('user'));

    img.src = urlUser + user.usuario.user_foto;

    nomeUser.textContent = user.usuario.user_nome;

}
