
var filledEmail = [];

document.querySelectorAll("input[type='email']").forEach((mailField,i) => {
  mailField.addEventListener("change", e => {
    const email = e.target.value;
    const hasMail = filledEmail.find(x => x === email);
    if (!hasMail) {
      e.target.classList.remove("is-invalid");
      e.target.classList.remove("email-used-once");

      // $("#"+e.target.id).siblings(".invalid-feedback-2" ).hide();
      // console.log("This is a unique address");
      filledEmail = filledEmail.filter((x, j)=> j!==i);
      filledEmail.push(email);
      filledEmail = jQuery.grep(filledEmail, function(value) {
        return value != "";
      });

    }
    else {
      e.target.classList.add("is-invalid");
      e.target.classList.add("email-used-once");

      // $("#"+e.target.id).siblings(".invalid-feedback-2" ).show();
      $("#"+e.target.id).siblings(".invalid-feedback" ).html("You already used this email address in the form");

      // e.target.classList.add("is-invalid");


      // console.log("this is a dup");

    }
    // console.log('filled mails without duplicates', filledEmail)
  });
});

$("#applicant-email").change(function() {
  if ($("#applicant-email").val()!=""){
    var restURL= "http://apilayer.net/api/check?access_key=c5b049bcf0b0decf671f3493487f5e12&email="+$("#applicant-email").val()+"&smtp=1&format=1";
    $.ajax({
      type : 'GET',
      url :restURL,
      dataType :'json',
      success : renderList,

    });
    return false;
  }

});



function renderList(data) {
  if ((data.format_valid == true) && (data.smtp_check == true) ) {
    // console.log("Email address is valid");
    if (!($("#applicant-email").hasClass("email-used-once"))) {

      $("#applicant-email").removeClass("is-invalid");
    }
    // $("#applicant-email").addClass("is-valid");
    return true;
  }
  else {
    // console.log("Email address is not valid");
    // $("#applicant-email").removeClass("is-valid");
    $("#applicant-email").addClass("is-invalid");
    $("#applicant-email").siblings(".invalid-feedback" ).html("Please enter a real email address");


    return false;
  }
}

// function renderError(data) {
//   // if (data.code == 104) {
//     console.log("server error");
//   // }
// }

$("#parent-1-email").change(function() {

  if ($("#parent-1-email").val()!="") {

    var restURL= "http://apilayer.net/api/check?access_key=c5b049bcf0b0decf671f3493487f5e12&email="+$("#parent-1-email").val()+"&smtp=1&format=1";
    $.ajax({
      type : 'GET',
      url :restURL,
      dataType :'json',
      success : renderList2,
    });
    return false;
  }

});



function renderList2(data) {
  if ((data.format_valid == true) && (data.smtp_check == true) ) {
    // console.log("Email address is valid");
    if (!($("#parent-1-email").hasClass("email-used-once"))) {

      $("#parent-1-email").removeClass("is-invalid");
    }
    // $("#parent-1-email").addClass("is-valid");
    return true;
  }
  else {
    // console.log("Email address is not valid");
    // $("#parent-1-email").removeClass("is-valid");
    $("#parent-1-email").addClass("is-invalid");
    $("#parent-1-email").siblings(".invalid-feedback" ).html("Please enter a real email address");


    return false;
  }
}

$("#parent-2-email").change(function() {
  if ($("#parent-2-email").val()!=""){
    var restURL= "http://apilayer.net/api/check?access_key=c5b049bcf0b0decf671f3493487f5e12&email="+$("#parent-2-email").val()+"&smtp=1&format=1";
    $.ajax({
      type : 'GET',
      url :restURL,
      dataType :'json',
      success : renderList3,
    });
    return false;

  }
});



function renderList3(data) {
  if ((data.format_valid == true) && (data.smtp_check == true) ) {
    if (!($("#parent-2-email").hasClass("email-used-once"))) {

      $("#parent-2-email").removeClass("is-invalid");
    // console.log("Email address is valid");
    // $("#parent-2-email").addClass("is-valid");
    }
    return true;
  }
  else {
    // console.log("Email address is not valid");
    // $("#parent-2-email").removeClass("is-valid");
    $("#parent-2-email").addClass("is-invalid");
    $("#parent-2-email").siblings(".invalid-feedback" ).html("Please enter a real email address");


    return false;
  }
}

$("#landlord-email").change(function() {
  if ($("#landlord-email").val()!=""){
    var restURL= "http://apilayer.net/api/check?access_key=c5b049bcf0b0decf671f3493487f5e12&email="+$("#landlord-email").val()+"&smtp=1&format=1";
    $.ajax({
      type : 'GET',
      url :restURL,
      dataType :'json',
      success : renderList4,
    });
    return false;

  }
});



function renderList4(data) {
  if ((data.format_valid == true) && (data.smtp_check == true) ) {
    if (!($("#landlord-email").hasClass("email-used-once"))) {

      $("#landlord-email").removeClass("is-invalid");
    // console.log("Email address is valid");
    // $("#parent-2-email").addClass("is-valid");
    }
    return true;
  }
  else {
    // console.log("Email address is not valid");
    // $("#parent-2-email").removeClass("is-valid");
    $("#landlord-email").addClass("is-invalid");
    $("#landlord-email").siblings(".invalid-feedback" ).html("Please enter a real email address");


    return false;
  }
}

$("#employer-email").change(function() {
  if ($("#employer-email").val()!=""){
    var restURL= "http://apilayer.net/api/check?access_key=c5b049bcf0b0decf671f3493487f5e12&email="+$("#employer-email").val()+"&smtp=1&format=1";
    $.ajax({
      type : 'GET',
      url :restURL,
      dataType :'json',
      success : renderList5,
    });
    return false;

  }
});



function renderList5(data) {
  if ((data.format_valid == true) && (data.smtp_check == true) ) {
    if (!($("#employer-email").hasClass("email-used-once"))) {

      $("#employer-email").removeClass("is-invalid");
    // console.log("Email address is valid");
    // $("#parent-2-email").addClass("is-valid");
    }
    return true;
  }
  else {
    // console.log("Email address is not valid");
    // $("#parent-2-email").removeClass("is-valid");
    $("#employer-email").addClass("is-invalid");
    $("#employer-email").siblings(".invalid-feedback" ).html("Please enter a real email address");


    return false;
  }
}
