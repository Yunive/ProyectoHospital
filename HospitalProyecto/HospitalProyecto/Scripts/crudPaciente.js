﻿$().ready(function () {
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
            url: "/Paciente/Delete",
            contentType: "application/html; charset=utf-8",
            type: "POST",
            dataType: "html",
            data: { id: id }
        }).success(function (result) {
            alert("Se borro el usuario")
        })

        .error(function (result) {
            alert("No se borro el usuario")
        })
    })

    $("a#enlaceBorrar").click(function () {
        intPacienteID = $("a#enlaceDetalles").attr("pacienteID");
        $.ajax({
            url: "/Paciente/Delete",
            contentType: "application/html; charset=utf-8",
            type: "GET",
            dataType: "html",
            data: { id: intPacienteID }
        }).success(function (result) {
            //alert("Se borro el usuario")
        })

        .error(function (result) {
            //alert("No se borro el usuario")
        })
    })

})