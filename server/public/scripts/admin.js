/**
 * Created by samuelmoss on 11/8/15.
 */

var message = {};
var display = [];

$(document).ready(function(){
    //Populates page with messages from db on load.
    refreshMessages();

    //Submission click functionality
    $('#messageSubmit').submit(function(event) {
            event.preventDefault();
            postMessage($(this))
        }
    );

    //Functionality for delete button
    $('#messages').on('click','.deleteBtn', deleteMessage);
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
    });
    $(target).find("input[type=text]").val("");
}

function refreshMessages(){
    $('#messages').empty();
    $.ajax({
        type:"GET",
        url:'/message/refresh',
        success: function(data){
                    for(var i = 0; i < data.length; i++){
                        $('#messages').prepend("<div class='message'><p>USER NAME: " + data[i].user_name + "</p>" +
                            "<p>MESSAGE: " + data[i].message + "</p>" +
                        "<div class='deleteBtn' data-id='" + data[i].id + "'>DELETE</div></div>");
                    }
                }
        })
}


function deleteMessage(){
    console.log("This is the target id: ", $(this).data('id'));
    $.ajax({
        type:"DELETE",
        url:'message/delete',
        data: $(this).data('id'),
        success: function(){
            refreshMessages();
        }
    })
}