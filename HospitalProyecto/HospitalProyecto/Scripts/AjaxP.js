$().ready(function () {

    //Abrir pantalla de Editar y mostrar datos de alumno
    $("a#enlaceEditar").click(function () {
        //Se obtiene el numero de matricula a consultar
        var enlaceClickeado = $(this);
        var paID = enlaceClickeado.attr("PacienteID");

        //Definir la transaccione AJAX al server
        $.ajax({
            url: "/Paciente/AjaxEdit", //Accion a ejecutar en el server
            contentType: "application/html; charset=utf-8",
            type: "GET",
            dataType: "html",
            data: { PacienteID: noMat } //Dato enviado al server
        }).success(function (result) { //result = {mensaje, status}
            //Se obtiene la respuesta del server en forma de objeto
            var paciente = JSON.parse(result);

            //Con la información recibida, se rellena el formulario
            $("#modalEditar #PacienteID").val(paciente.PacienteID);
            $("#modalEditar #nombre").val(paciente.nombre);
            $("#modalEditar #apellidoP").val(paciente.apellidoP);
            $("#modalEditar #apellidoM").val(paciente.apellidoM);
            $("#modalEditar #telefono").val(paciente.telefono);
            $("#modalEditar #direccion").val(paciente.direccion);
            //fechaRecibida = new Date(alumno.fechaNac);
            ////$("#modalEditar #fechaNac").val(fechaRecibida);
            ////document.getElementById("fechaNac").valueAsDate = fechaRecibida;
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
           PacienteID: $("#modalEditar #noMatricula").val(),
            nombre: $("#modalEditar #nombre").val(),
            apellidoP: $("#modalEditar #apellidoP").val(),
            apellidoM: $("#modalEditar #apellidoM").val(),
            telefono: $("#modalEditar #telefono").val(),
            direccion: $("#modalEditar #direccion").val(),
            //fechaNac: $("#modalEditar #fechaNac").val(),
            //grupoID: $("#modalEditar #grupoID").val(),
        };

        $.ajax({
            url: '/Paciente/AjaxEdit',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(alumnoModificado),
            type: 'post',
        }).success(function (result) {
            alert(result.mensaje);

        }).error(function (xhr, status) {
            alert("No se encontro el servidor," +
                " verifique si se encuentra conectado a internet.");

        })
        $("#modalEditar").modal("toggle");
    })


})