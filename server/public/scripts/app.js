/**
 * Created by samuelmoss on 11/8/15.
 */

var message = {};
var display = [];

$(document).ready(function(){

    $('#messageSubmit').submit(function(event) {
            event.preventDefault();
            postMessage($(this))
        }
    );
});


function postMessage(target) {
    $.each($(target).serializeArray(), function (i, field) {
        message[field.name] = field.value;
    });
    $.ajax({
        type:"POST",
        url:'/message/post',
        data:message,
        success: function(data){
            display.push(data.inputText);
            refreshMessages();
        }
    })
}

function refreshMessages(){
    $.ajax({
        type:"GET",
        url:'/message/refresh',
        success: function(data){
                    console.log(data);
                }
    })
}