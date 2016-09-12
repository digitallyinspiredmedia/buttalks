jQuery(document).ready(function($) {

  $("#owl-demo").owlCarousel({
    margin: 30,
    nav: false,
    autoPlay: true,
    loop: true,
    dots: false,
    autoplayHoverPause: true,
    autoplayTimeout:1000, 
    responsive:{
      0:{ items:2 },
      480:{ items:3 },
      768:{ items:4 },
      992:{ items:5 },
      1200:{ items:6 }
    }
  });

  $("#owl").owlCarousel({
      navigation: false,
      slideSpeed: 100,
      paginationSpeed: 800,
      singleItem: true,
      autoPlay: true
  });


$('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#sociallogin-form").fadeOut(100);
    $("#register-form").fadeOut(100);
    $('#sociallogin-form-link').removeClass('active');
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});
$('#sociallogin-form-link').click(function(e) {
    $("#sociallogin-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#register-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

$('#register-form-link').click(function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#sociallogin-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $('#sociallogin-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});


var form = $("#subscription").show();

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
        alert("Submitted!");
    }
}).validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        confirm: {
            equalTo: "#password-2"
        }
    }
});








}); 