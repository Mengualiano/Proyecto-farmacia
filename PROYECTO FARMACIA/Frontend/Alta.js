function Patient() {
    var mail = sessionStorage.getItem("email");
    var session = sessionStorage.getItem('session');
    var http = new XMLHttpRequest();

    http.open("GET", "http://localhost:8080/Prueba/ServePatients?mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session), true);
    console.log(mail);
    console.log(session);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var respuesta = http.response;
            if (respuesta == "null") {
                sessionStorage.removeItem('session');
                sessionStorage.removeItem('email');
            } else {
                var json = JSON.parse(respuesta);
                var selectpacientes = document.getElementById("patientselect");
                selectpacientes.innerHTML = "";
                for (var i = 0; i < json.length; i++) {
                    var paciente = json[i].id;
                    var nombre = json[i].name;
                    var option = document.createElement("option");
                    option.text = paciente;
                    option.text = nombre;
                    option.value = paciente;
                    selectpacientes.appendChild(option);
                }
            }
        }
    }
}

function Medicine() {
    var mail = sessionStorage.getItem('email');
    var session = sessionStorage.getItem('session');
    var http = new XMLHttpRequest();

    http.open("GET", "http://localhost:8080/Prueba/ServeMedicines?mail="+mail+"&session="+session, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var respuesta = http.response;
            if (respuesta == "null") {
                console.log("no hay respuesta")
            } else {
                var json = JSON.parse(respuesta);
                var selectmedicine = document.getElementById("medicineselect");
                selectmedicine.innerHTML = "";
                for (var i = 0; i < json.length; i++) {
                    var medicamentos = json[i].id;
                    var nombre = json[i].name;
                    var option = document.createElement("option");
                    option.value = medicamentos;
                    option.text = nombre;
                    selectmedicine.appendChild(option);
                }
            }
        }
    }
    http.send();
}


function cargarFunciones() {
    Medicine();
    Patient();
}

function send() {
    var mail = sessionStorage.getItem("email");
    var session = sessionStorage.getItem('session');
    var paciente = document.getElementById("patientselect").value;
    var medicamento = document.getElementById("medicineselect").value;
    var fecha = document.getElementById("dateInput").value;
    var id = document.getElementById("xipIdInput").value;
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/Prueba/Release", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("id=" +encodeURIComponent(id)+ "&mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&medicamento=" + encodeURIComponent(medicamento) + "&paciente=" + encodeURIComponent(paciente) + "&fechalimite=" + encodeURIComponent(fecha));

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var respuesta = http.response;
            if (respuesta == "null") {
                sessionStorage.removeItem('session');
                sessionStorage.removeItem('email');
                window.location.href = 'Gestion.html';
            } else {
                document.getElementById("patientselect").value = "";
                document.getElementById("medicineselect").value = "";
                document.getElementById("dateInput").value = "";
                document.getElementById("xipIdInput").value = "";
            }
        }
    }



}
