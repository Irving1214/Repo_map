/**
 * Created by @HackeaMesta on 10/07/17.
 */

$(document).ready(function () {

    $("#pac-input").on("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    }).autocomplete({
        minLength: 0,
        source: function (request, response) {
            getCiudadesSalesForce(response);
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        },
        delay: 300,
        select: function (event, ui) {
            var terms = String(this.value).split(".");
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push(ui.item.value);
            // add placeholder to get the comma-and-space at the end
            terms.push("");
            this.value = terms.join("");
            var paciente = ui.item.value.split(" - ")[0];
            $("#paciente").val(paciente);
            return false;
        }
    });
});

function getCiudadesSalesForce(response) {
    $.ajax({
        type: 'POST',
        post: 'autoSearch',
        url: url + "/propiedades/ciudades",
        data: {
            search: $("#pac-input").val()
        },
        dataType: "JSON",
        success: function (data) {
            response($.map(data.ciudades, function (el) {
                return el.Plaza__c;
            }));
        }
    });
}

function getColoniasSalesForce() {

}