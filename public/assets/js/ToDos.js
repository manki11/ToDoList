"use strict";
// Check of specific todos
$("ul").on("click","li",function () {
    var id= $(this).attr('id');
    var li= this;
    var object;

    if($(this).hasClass("completed")){
        object={
            id:id,
            strike:false
        };
    }else{
        object={
            id:id,
            strike:true
        };
    }

    $.post("/todos/strike",{result:object}, function (data, status, xhr) {
        if(status=== "success"){
            $(li).toggleClass("completed");
        }
    });



});

$("ul").on("click","span",function (event) {
    var id = $(this).attr('id');
    var span= this;

    $.post("/todos/delete",{id:id}, function (data,status,xhr) {
        if(data.isSuccess === 1) {
            // window.alert(data.isSuccess+"    "+ status);
            $(span).parent().fadeOut(500, function () {
                $(span).remove();
            });
            event.stopPropagation();
        }
    });

})

$("input[type='text']").keypress(function (event) {
    if(event.which === 13){
        var todoText= $(this).val();

        if(todoText.length<40) {
            $(this).val("");
            $.post("/todos",{text:todoText}, function (data, status,xhr) {
                if(status ==="success"){
                    location.reload();
                }
            });

        }else{
            window.alert("To-Do should be less than 30 letters");
        }
    }
});

$(".fa-plus").click(function () {
    $("input[type='text']").fadeToggle();
});

$("ul").sortable({
    placeholder: "ui-state-highlight"
});

