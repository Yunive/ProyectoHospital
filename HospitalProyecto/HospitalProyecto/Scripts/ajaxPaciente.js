$().ready(function () {

    function rellenarIndexAlumnos() {
        var strBuscado = $("input[name='strBuscado']").val();
        $.ajax({
            url: "/Paciente/AjaxIndex", //Accion a ejecutar en el server
            contentType: "application/html; charset=utf-8",
            type: "GET",
            dataType: "html",
            data: { strBuscado: strBuscado } //Dato enviado al server
        }).success(function (result) {
            var tablaPaciente = $("#tablaPaciente tbody");
            tablaPaciente.html("");
            var conjutoPacientes = JSON.parse(result);

            for (var indice in conjutoPacientes) {
                var paciente = conjutoPacientes[indice];
                tablaAlumnos.append("<tr>"+
                    "<td>" + paciente.grupo + "</td>" + //Nombre grupo
                    "<td>" + paciente.nombre + "</td>" + //nombre
                    "<td>" + paciente.apellidoP + "</td>" + //apellidoP
                    "<td>" + paciente.apellidoM + "</td>" + //apellidoM
                    "<td>" + paciente.telefono + "</td>" + //apellidoP
                    "<td>" + paciente.direccion + "</td>" + //apellidoM
                    //"<td>" + alumno.fechaNac + "</td>" + //fechaNac
                    "<td>"+
                    "<a id='enlaceDetalles' data-toggle='modal' data-target='#modalDetalles' nomatricula='" + paciente.PacienteID + "'>Details</a> |" +
                    "<a id='enlaceBorrar' data-toggle='modal' data-target='#modalBorrar' nomatricula='" + paciente.PacienteID + "'>Delete</a> |" +
                    "<a id='enlaceEditar' data-toggle='modal' data-target='#modalEditar' nomatricula='" + paciente.PacienteID + "'>Edit</a> |" +
                    "</td>" +
                    "</tr>")
            }

        }).error(function (xhr, status) {

        })
    }


    //Abrir pantalla de Editar y mostrar datos de alumno
    $("a#enlaceEditar").click(function () {
        //Se obtiene el numero de matricula a consultar
        var enlaceClickeado = $(this);
        var noMat = enlaceClickeado.attr("pacienteID");

        //Definir la transaccione AJAX al server
        $.ajax({
            url: "/Paciente/AjaxEdit", //Accion a ejecutar en el server
            contentType: "application/html; charset=utf-8",
            type: "GET",
            dataType: "html",
            data: { pacienteID: noMat } //Dato enviado al server
        }).success(function (result) { //result = {mensaje, status}
            //Se obtiene la respuesta del server en forma de objeto
            var alumno = JSON.parse(result);

            //Con la información recibida, se rellena el formulario
            $("#modalEditar #pacienteID").val(alumno.pacienteID);
            $("#modalEditar #nombre").val(alumno.nombre);
            $("#modalEditar #apellidoP").val(alumno.apellidoP);
            $("#modalEditar #apellidoM").val(alumno.apellidoM);
            $("#modalEditar #telefono").val(alumno.telefono);
            $("#modalEditar #direccion").val(alumno.direccion);
            //fechaRecibida = new Date(alumno.fechaNac);
            //$("#modalEditar #fechaNac").val(fechaRecibida);
            //document.getElementById("fechaNac").valueAsDate = fechaRecibida;
            //$("#modalEditar #fechaNac")[0].valueAsDate = fechaRecibida;
            //$("#modalEditar #grupoID").val(alumno.grupoID);

        }).error(function (xhr, status) {
            /*Notificar al usuario de un error de comunicacion
            con el server*/
            $("#mensaje").removeClass('alert-danger alert-info');
            $("#mensaje").html("Ha ocurrido un error: " + status).addClass('alert-danger');
            $("#mensaje").fadeIn(500).delay(2000).fadeOut(500);
        })
    })

    /*Confirmar edicion de cambios en registro de alumnos*/
    $("#btnEditar").click(function () {
        alumnoModificado = {
            noMatricula: $("#modalEditar #pacienteID").val(),
            nombre: $("#modalEditar #nombre").val(),
            apellidoP: $("#modalEditar #apellidoP").val(),
            apellidoM: $("#modalEditar #apellidoM").val(),
            telefono: $("#modalEditar #telefono").val(),
            direccion: $("#modalEditar #direccion").val(),
        };

        $.ajax({
            url: '/Paciente/AjaxEdit',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(alumnoModificado),
            type: 'post',
        }).success(function (result) {
            rellenarIndexAlumnos();
        }).error(function (xhr, status) {
            alert("No se encontro el servidor,"+
                " verifique si se encuentra conectado a internet.");

        })
        $("#modalEditar").modal("toggle");
    })


})