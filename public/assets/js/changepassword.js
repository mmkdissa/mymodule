/*global $, document, window, setTimeout, navigator, console, location*/
function ChangePassword(){
    
}

var currentPasswordError =true,
    repeatPasswordError = true,
    newPasswordError = true;


ChangePassword.init = function() {
  
  $("#loader").css("display","none");
  $("#changePasswordMessage").text("");  
  $("#currentPassword").unbind('change'); 
  $("#currentPassword").change(ChangePassword.onCompleteCurrentPassword);
  $("#signInButton").hide();

  $("#signInButton").click(ChangePassword.onClickSignIn);


  //$('#changePasswordButton').click(ChangePassword.clickChangePasswordButton);




  $('input').focus(function () {

        $(this).siblings('label').addClass('active');
    });

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }


  $('input').blur(function () {
        
        // User Name
        if ($(this).hasClass('current-password')) {
            if ($(this).val().length < 1) {
                $(this).siblings('span.error').text('Please type your current password').fadeIn().parent('.form-group').addClass('hasError');
               
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                
            }
        }
        // Email
        if ($(this).hasClass('new-password')) {
            if ( $(this).val().length < 6 ) {
                $(this).siblings('span.error').text('Please type at least 6 characters').fadeIn().parent('.form-group').addClass('hasError');
                newPasswordError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                newPasswordError = false;
            }
        }

        // PassWord
        if ($(this).hasClass('repeat-password')) {
            if ($('.new-password').val() !== $('.repeat-password').val()) {
                $(this).siblings('span.error').text('Passwords don\'t match').fadeIn().parent('.form-group').addClass('hasError');
                repeatPasswordError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                repeatPasswordError = false;
            }
        }

        

        if ($(this).val().length > 0) {            
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
       
       
       

     
    });



  


    $('form.login-form').submit(function (event) {
        
        event.preventDefault();

        if (currentPasswordError == true || newPasswordError == true  || repeatPasswordError ==true) {
            $('.current-password, .new-password,.repeat-password').blur();
        } else {
             var currentUser = Parse.User.current();
             var newPassword = $("#newPassword").val();
             var repeatPassword = $("#repeatPassword").val();
             
            
            if((newPassword == repeatPassword ) &&  !currentPasswordError){
                $("#loader").css("display","block");
                currentUser.set('password',newPassword);
            
              currentUser.save(null).then(
                 function(user) { 
                    console.log(JSON.stringify(user));
                     $("#loader").css("display","none");
                    $("#changePasswordMessage").css("color", "white");
                    $("#changePasswordMessage").html("Password Changed Successfully.<br/>Please Sign in to Continue"); 
                    $('.content').hide();
                    $("#signInButton").show();
                    Parse.User.logOut();
                    // window.location.href = "/dashboard";
                 },
                 function(error) { 
                     $("#loader").css("display","none");
                    console.log(JSON.stringify(error));
                    $("#changePasswordMessage").css("color", "red");
                    $("#changePasswordMessage").text("Error changing password."); 
                }
             ); 

           }else{
              $("#changePasswordMessage").css("color", "red");
              $("#changePasswordMessage").text("Please enter required details."); 
           }
        }
    });




}

ChangePassword.onCompleteCurrentPassword = function(){
  var currentUser = Parse.User.current();
  var email = currentUser.get('email');
  var password = $("#currentPassword").val();
  $("#loader").css("display","block");
  Parse.User.logIn(email, password, {
      success: function(user) {
         $("#loader").css("display","none");
         console.log(JSON.stringify(user));
         $("#changePasswordMessage").text(""); 
         currentPasswordError = false; 

      },
      error: function(user, error) {
         $("#loader").css("display","none");
         console.log("Error: " + error.code + " " + error.message);
         if(error.code == 101){
            $("#changePasswordMessage").text("Your current password is not matched");  
            currentPasswordError = true; 
         }
               

      }
    });
}

ChangePassword.onClickSignIn = function(){
    window.location.href = "/"
}
