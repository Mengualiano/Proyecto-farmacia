function send() {
    let http = new XMLHttpRequest();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;




    http.open("POST", "http://localhost:8080/Prueba/Login", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log(email)
    console.log(password)

    http.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            var session = this.responseText

            console.log(session)
            if(session == "null"){
                console.log("NO")
                alert("Login Incorrecto")
            }else{
                window.location.href = 'Gestion.html';
                console.log("Iniciado Sesion");
                console.log(session);
                console.log(email);
                sessionStorage.setItem("session",session);
                sessionStorage.setItem("email",email);
            }
        }
    }
    http.send("mail="+email+"&pass="+password);
}