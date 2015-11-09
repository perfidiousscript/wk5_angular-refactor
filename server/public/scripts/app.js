/**
 * Created by samuelmoss on 11/8/15.
 */

var message = {};
var display = [];

var messageApp = angular.module('messageApp', []);


messageApp.controller("BodyController",['$scope','$http', function($scope,$http){
    $scope.message = {};

    $scope.clickButton = function(input){
        $http.post('/message/post', input).then(function(response){
            console.log("This works!");
        })
    }

}]);





//$(document).ready(function(){
//
//    refreshMessages();
//
//    $('#messageSubmit').submit(function(event) {
//            event.preventDefault();
//            postMessage($(this))
//        }
//    );
//});
//
//
//function postMessage(target) {
//    $.each($(target).serializeArray(), function (i, field) {
//        message[field.name] = field.value;
//    });
//    $.ajax({
//        type:"POST",
//        url:'/message/post',
//        data:message,
//        success: function(data){
//            display.push(data.inputText);
//            refreshMessages();
//        }
//    });
//    $(target).find("input[type=text]").val("");
//}
//
//function refreshMessages(){
//    $('#messages').empty();
//    $.ajax({
//        type:"GET",
//        url:'/message/refresh',
//        success: function(data){
//                    for(var i = 0; i < data.length; i++){
//                        $('#messages').prepend("<div class='message'><p>USER NAME: " + data[i].user_name + "</p>" +
//                            "<p>MESSAGE: " + data[i].message + "</p>");
//                    }
//                }
//        })
//}