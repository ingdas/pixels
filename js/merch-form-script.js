$("#merchForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Heb je alles ingevuld?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#Mname").val();
    var email = $("#Memail").val();
    var phone = $("#Madres").val();
    var msg_subject = "Pixels Merch Request";
    var message = $("#Mmessage").val();


    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message + "&phone=" + phone,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#merchForm")[0].reset();
    submitMSG(true, "Bedankt voor je berichtje!")
}

function formError(){
    $("#merchForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated groen";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#MmsgSubmit").removeClass().addClass(msgClasses).text(msg);
}