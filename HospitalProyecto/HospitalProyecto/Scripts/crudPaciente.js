$().ready(function () {
    var intPacienteID;
    //Se asocian las llamadas a eventos ocurridos en la vista
    $("a#enlaceDetalles").click(function () {
        var id = $(this).attr("pacienteID");
        $.ajax({
            url: "/Paciente/AjaxDetails",
            contentType: "application/html; charset=utf-8",
            type: "GET",
            dataType: "html",
            data: { id: id }
        }).success(function (result) {

            var paciente = JSON.parse(result)
            $("#DetallesPaciente").html("");
            $("#DetallesPaciente").append("<b>Nombre: </b>" + "<br>" + paciente.nombre + "<br>");
            $("#DetallesPaciente").append("<b>Apellido Paterno: </b>" + "<br>" + paciente.apellidoP + "<br>");
            $("#DetallesPaciente").append("<b>Apellido Materno: </b>" + "<br>" + paciente.apellidoM + "<br>");
            $("#DetallesPaciente").append("<b>Telefono: </b>" + "<br>" + paciente.telefono + "<br>");
            $("#DetallesPaciente").append("<b>Direccion: </b>" + "<br>" + paciente.direccion + "<br>");
        }).error(function (xhr, status) {
            alert("hubo un error");
        })
    })



    $("#DeletePaciente").click(function () {
        var id = intPacienteID;
        $.ajax({
            url: "/Paciente/DeleteConfirmed",
            contentType: "application/html; charset=utf-8",
            type: "get",
            dataType: "html",
            data: { idpaciente: id }
        }).success(function (result) {

            //alert(JSON.parse(result))
        })

        .error(function (result) {
            //alert(JSON.parse(result))
        })
    })

    $("a#enlaceBorrar").click(function () {
        intPacienteID = $("a#enlaceDetalles").attr("pacienteID");

    })

    //////////////////////////////////////////////////////
    $("button#enlaceBorrar").click(function () {
        pacienteID = $(this).attr("pacienteID")
    })
    //elimina un registro
    $("#DeletePaciente").click(function () {
        $.ajax({
            url: '/Paciente/DeleteConfirmed',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: { idpaciente: pacienteID }, //Dato enviado al server
            type: 'get'
        }).success(function (result) {
            rellenarIndexPaciente();
            alert("todo bien basilio te la rifas");
        }).error(function (xhr, status) {
            alert("No se encontro el servidor," +
                " verifique si se encuentra conectado a internet.");

        })
        

    })
    function rellenarIndexPaciente() {
        var strbuscado = "nada";
        $.ajax({
            url: '/Paciente/AjaxIndex',
            contentType: "application/html; charset=utf-8",
            dataType: 'html',
            data: { nada: strbuscado }, //Dato enviado al server
            type: 'GET',

        }).success(function (result) {
            var tablaPaciente = $("#tablaPaciente tbody");//se crea una variable de tipo tbody de la tabla en la vista index
            tablaPaciente.html("");//se limpia la tabla
            var conjutoPacientes = JSON.parse(result);//se transforma el archivo json que biene en formato json de la base de datos de cadena de string a formato json puro

            for (var indice in conjutoPacientes) {// se rellena la tabla de libros con todos sus campos se reconstruye la tabla
                var paciente = conjutoPacientes[indice];
                tablaPaciente.append("<tr>" +
                    "<td>" + paciente.pacienteID + "</td>" + //Nombre grupo
                    "<td>" + " " + paciente.nombre + "</td>" + //nombre
                    "<td>" + paciente.apellidoP + "</td>" + //apellidoP
                    "<td>" + paciente.apellidoM + "</td>" + //apellidoM
                    "<td>" + paciente.telefono + "</td>" + //fechaNac
                    "<td>" +
                     "<td>" + paciente.direccion + "</td>" + //fechaNac
                    "<td>" +
                    "<button id='enlaceDetalles' class='btn btn-info' data-toggle='modal' data-target='#modalDetalles' pacienteID='" + paciente.pacienteID + "'>Detalles</button>"
                    +
                    "<button id='enlaceBorrar' class='btn btn-danger' data-toggle='modal' data-target='#modalBorrar' pacienteID='" + lipacientebro.pacienteID + "' style='margin-left:auto'>Borrar</button>" +
                    "<button id='enlaceEditar' class='btn btn-success' data-toggle='modal' data-target='#modalEditar' pacienteID='" + paciente.pacienteID + "'>Editar</button>" +
                    "</td>" +
                    "</tr>")
            }

        }).error(function (xhr, status) {//si sale algun error en la transaccion ajax entra aki

        })

    }
})
/**************************************************************************************************************************************************************************************************************/
$("#btnCrearPaciente").click(function () {
    nuevoPaciente = {
        //pacienteID: $("#modalPaciente #pacienteID").val(),
        nombre: $("#modalPaciente #nombre").val(),
        apellidoP: $("#modalPaciente #apellidoP").val(),
        apellidoM: $("#modalPaciente #apellidoM").val(),
        telefono: $("#modalPaciente #telefono").val(),
        direccion: $("#modalPaciente #direccion").val()
    };
    $.ajax({
        url: '/Paciente/Create',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(nuevoPaciente),
        type: 'post',
    }).success(function (result) {
        rellenarIndexPaciente();
    }).error(function (xhr, status) {
        alert("No se encontro el servidor," +
            " ´Problemas de conexion a internet seguro tienes megacable.");

    })
    $("#modalPaciente").modal("toggle");
})