$(document).ready(function () {

jQuery(document).ready(function() {

    $menuLeft = $('body');

    $nav_list = $('.menuone');

    $nav_list.click(function() {

      $('.logo').toggleClass('pushmenu-icon');
      $('#header').toggleClass('active');

      $('.burger-menu').toggleClass('active');
      $('.container').toggleClass('active');

      $menuLeft.toggleClass('pushmenu-open');

    });

  });


//steps by step
// subscription form

var form = $("#letgo-subscription").show();

form.steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "slideLeft",
    onStepChanging: function (event, currentIndex, newIndex)
    {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex)
        {
            return true;
        }

        // Forbid next action on "Warning" step if the user is to young
        if (newIndex === 3 && Number($("#age-2").val()) < 18)
        {
            return false;
        }

        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex)
        {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }

        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex)
    {
        // Used to skip the "Warning" step if the user is old enough.
        if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
        {
            form.steps("next");
        }

        // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
        if (currentIndex === 2 && priorIndex === 3)
        {
            form.steps("previous");
        }
    },
    onFinishing: function (event, currentIndex)
    {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex)
    {
       console.log('form fired');
        var form = $(this);
        // Submit form input
        form.submit();

    }
}).validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        gift: "required",
        plan: "required",
        undersize: "required",
        
        waistsize: {
            minlength: 2,
            maxlength: 2,
            required: true,
            digits: true
        },
        sytlesubscription: "required",
        addingcollection: "required",
        colorcollection: "required",
        avoidcolor: "required",
        patterns: "required",
        scale: "required",
        weeklyroutine: "required",
        underwareoccasions: "required",
        birthday: "required",
        notincluded: "required",
        elseimportant: "required"
    },
    wrapper: "span"
});

    if(window.location.href.indexOf("exist") > -1) {
    	$('body').addClass('modal-open'); 
    	$('#loginform').addClass('in');
    	$('#loginform').show();
    	$('.signinup').hide();
       	$('#signin').show();
        $('#signup').hide();
       	$('#fmessage').hide();
       console.log('signin hide');
       
    }else if(window.location.href.indexOf("new") > -1){
      $('body').addClass('modal-open'); 
    	$('#loginform').addClass('in');
    	$('#loginform').show();
    	$('.signinup').hide();
      $('#signin').hide();
      $('#signup').show();
       console.log('signin hide');
    }else if(window.location.href.indexOf("lwv") > -1){
     $('body').addClass('modal-open'); 
      $('#loginform').addClass('in');
      $('#loginform').show();
      $('.signinup').hide();
      $('#signin').show();
      $('#signup').hide();
      $('#fmessage').show();

       console.log('signin hide');
    }else{
    	//$('#signin').hide();
    	//$('#signup').hide();
    	  console.log('mode close');
    }

//popup close

$( ".close" ).click(function() {
  $('body').removeClass('modal-open'); 
  $('#loginform').removeClass('in');
  $('#loginform').hide();
});


//password meter
var strength = {
    0: "meh meh...",
    1: "so after ...",
    2: "your good ...",
    3: "excellent ...",
    4: "lock it"
}

var password = document.getElementById('rpassword');
var meter = document.getElementById('password-meter');
var text = document.getElementById('password-text');

password.addEventListener('input', function()
{
    var val = password.value;
    var result = zxcvbn(val);
  
    // Update the password strength meter
    meter.value = result.score;
   
    // Update the text indicator
    if(val !== "") {
        text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span"; 
    }
    else {
        text.innerHTML = "";
    }
});






//registration validation 
 var minChar = 5;
 var maxChar = 26;
$("#signup-form").validate({
  //rules
  rules: {
    rpassword:{
      required: true,
        minlength: minChar,
        maxlength: maxChar
    },
    rcpassword: {
      required: true,
      equalTo: "#rpassword"
    }
  },
  messages: {
    rpassword:{
        required: "Please enter your password",
         minlength: function (range, input) {
                    return [
                        'Please  ' + ( minChar - parseInt($('#rpassword').val().length)) +
                        ' more characters to go.'];

                },
         maxlength: function (range, input) {
                    return [
                        (maxChar - parseInt($('#rcpassword').val().length)) +
                        ' more characters to go.'];

                }
    },
    rcpassword: {
      required: "Please enter your password ",
      equalTo: "Please enter the same password as above"
    },
    
  },
  wrapper: "span",
    // set this class to error-labels to indicate valid fields
    success: function(label) {
        $('span').addClass("checked");
    },
    highlight: function(element, errorClass) {
        $('span').removeClass("checked");
    },
    // specifying a submitHandler prevents the default submit, good for the demo
    submitHandler: function(form) {
       form.submit();

  return false; // required to block normal submit since you used ajax
  }
      
      
 });


});

