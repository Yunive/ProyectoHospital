﻿$().ready(function () {
    //Se asocian las llamadas a eventos ocurridos en la vista
    $("a#enlaceDetalles").click(function () {
        var id2 = $(this).attr("pacienteID");
        $.ajax({
            url: "/Paciente/AjaxDetails",
            contentType: "application/html; charset=utf-8",
            type: "GET",
            dataType:"html",
            data: { id: id2}
        }).success(function (result) {
            alert("todo bien");
        }).error(function (xhr, status) {
              alert("hubo un error");
        })
    })
    

    //Se definen las funciones para mostrar resultados de transacciones
    function paciente_llenarFormaDetalles(result) {
        $("input#pacienteID").val(result.pacienteID);
    }

    function notificarError(status) {
        alert(status)
    }
})
$("#botonPrueba").click(function () {
    $("#botonPrueba").html("Si entro al buton");

})
