// Check of specific todos
$("ul").on("click","li",function () {
    $(this).toggleClass("completed")
})

$("ul").on("click","span",function (event) {
    $(this).parent().fadeOut( 500, function() {
        $(this).remove();
    });
    event.stopPropagation();
})

$("input[type='text']").keypress(function (event) {
    if(event.which === 13){
        var todoText= $(this).val();

        if(todoText.length<40) {
            $(this).val("");
            $("ul").append("<li><span><i class=\'fa fa-trash\' aria-hidden=\'true\'></i></span>" + todoText + "</li>")
        }else{
            window.alert("To-Do should be less than 30 letters");
        }
    }

})

$(".fa-plus").click(function () {
    $("input[type='text']").fadeToggle();
});

$("ul").sortable({
    placeholder: "ui-state-highlight"
});
