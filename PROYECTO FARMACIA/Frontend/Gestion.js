function nosesion() {
    sessionStorage.removeItem('session');
    sessionStorage.removeItem('email');
}
function alta() {
    window.location.href='Alta.html';
}
function getTable() {
    var mail = sessionStorage.getItem('email');
    var session = sessionStorage.getItem('session');
    console.log(session)
    var ahttp = new XMLHttpRequest();

    ahttp.open("GET", "http://localhost:8080/Prueba/ServeXips?mail="+mail+"&session="+session, true);
    console.log(mail)
    console.log(session)
    ahttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ahttp.send();
    ahttp.onreadystatechange = function () {
        if (ahttp.readyState == 4 && ahttp.status == 200) {
            var sesion = ahttp.response
            if (sesion == "null") {
            } else {
                console.log(sesion)
                document.getElementById("tabla").innerHTML = sesion;
            }
        }
    }
}

