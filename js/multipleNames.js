
var r_state ;
var r_stateList = [];
function r_stateFunction() {
    // $("#state-total").val("");
    r_stateList = [];
    r_state= $("select[name='rental-history-state-a']");
    r_state.each(
    function(index){
        r_stateList.push($(this).val());
    }
    );
    r_stateList =  r_stateList.join(" | ");
    $("#state-total").val(r_stateList);
    // return $("#state-total").val();
}

var r_city ;
var r_cityList = [];
function r_cityFunction() {
    r_cityList = [];
    r_city= $("input[name='rental-history-city-a']");
    r_city.each(
    function(index){
        r_cityList.push($(this).val());
    }
    );
    r_cityList =  r_cityList.join(" | ");
    $("#city-total").val(r_cityList);
    // return $("#city-total").val();
}

var r_zip ;
var r_zipList = [];
function r_zipFunction() {
    r_zipList = [];
    r_zip= $("input[name='rental-history-zip-a']");
    r_zip.each(
    function(index){
        r_zipList.push($(this).val());

    }
    );
    r_zipList =  r_zipList.join(" | ");
    $("#zip-total").val(r_zipList);
    // return $("#zip-total").val();
}

var r_add_1 ;
var r_add_1_list = [];
function r_add1Function() {
    r_add_1_list = [];
    r_add_1= $("textarea[name='rental-add-1-a']");
    r_add_1.each(
    function(index){
        r_add_1_list.push($(this).val());

    }
    );
    r_add_1_list =  r_add_1_list.join(" | ");
    $("#add-1-total").val(r_add_1_list);
    // return $("#add-1-total").val();
}

var r_add_2 ;
var r_add_2_list = [];
function r_add2Function() {
    r_add_2_list = [];
    r_add_2= $("textarea[name='rental-add-2-a']");
    r_add_2.each(
    function(index){
        r_add_2_list.push($(this).val());

    }
    );
    r_add_2_list =  r_add_2_list.join(" | ");
    $("#add-2-total").val(r_add_2_list);
    // return $("#add-2-total").val();
}

var r_date ;
var r_dateList = [];
function r_dateFunction() {
    r_dateList = [];
    r_date= $("input[name='rental-history-date-a']");
    r_date.each(
    function(index){
        r_dateList.push($(this).val());

    }
    );
    r_dateList =  r_dateList.join(" | ");
    $("#date-total").val(r_dateList);
    // return $("#date-total").val();
}

var r_rent ;
var r_rentList = [];
function r_rentFunction() {
    r_rentList = [];
    r_rent= $("input[name='rental-history-monthly-rent-a']");
    r_rent.each(
    function(index){
        r_rentList.push($(this).val());

    }
    );
    r_rentList =  r_rentList.join(" | ");
    $("#rent-total").val(r_rentList);
    // return $("#rent-total").val();
}

var r_reason ;
var r_reasonList = [];
function r_reasonFunction() {
    r_reasonList = [];
    r_reason= $("input[name='reason-for-leaving-a']");
    r_reason.each(
    function(index){
        r_reasonList.push($(this).val());

    }
    );
    r_reasonList =  r_reasonList.join(" | ");
    $("#reason-total").val(r_reasonList);
    // return $("#reason-total").val();
}

var r_landlordFName ;
var r_landlordFNameList = [];
function r_landlordFNameFunction() {
    r_landlordFNameList = [];
    r_landlordFName= $("input[name='landlord-first-name-a']");
    r_landlordFName.each(
    function(index){
        r_landlordFNameList.push($(this).val());

    }
    );
    r_landlordFNameList =  r_landlordFNameList.join(" | ");
    $("#landlord-fname-total").val(r_landlordFNameList);
    // return $("#landlord-fname-total").val();
}

var r_landlordLName ;
var r_landlordLNameList = [];
function r_landlordLNameFunction() {
    r_landlordLNameList = [];
    r_landlordLName= $("input[name='landlord-last-name-a']");
    r_landlordLName.each(
    function(index){
        r_landlordLNameList.push($(this).val());

    }
    );
    r_landlordLNameList =  r_landlordLNameList.join(" | ");
    $("#landlord-lname-total").val(r_landlordLNameList);
    // return $("#landlord-lname-total").val();
}

var r_landlordPhone ;
var r_landlordPhoneList = [];
function r_landlordPhoneFunction() {
    r_landlordPhoneList = [];
    r_landlordPhone= $("input[name='landlord-phone-a']");
    r_landlordPhone.each(
    function(index){
        r_landlordPhoneList.push($(this).val());

    }
    );
    r_landlordPhoneList =  r_landlordPhoneList.join(" | ");
    $("#landlord-phone-total").val(r_landlordPhoneList);
    // return $("#landlord-phone-total").val();
}

var r_landlordEmail ;
var r_landlordEmailList = [];
function r_landlordEmailFunction() {
    r_landlordEmailList = [];
    r_landlordEmail= $("input[name='landlord-email-a']");
    r_landlordEmail.each(
    function(index){
        r_landlordEmailList.push($(this).val());

    }
    );
    r_landlordEmailList =  r_landlordEmailList.join(" | ");
    $("#landlord-email-total").val(r_landlordEmailList);
    // return $("#landlord-email-total").val();
}


function rentalCallFunction() {
  r_stateFunction();
  r_cityFunction();
  r_zipFunction();
  r_add1Function();
  r_add2Function();
  r_dateFunction();
  r_rentFunction();
  r_reasonFunction();
  r_landlordFNameFunction();
  r_landlordLNameFunction();
  r_landlordPhoneFunction();
  r_landlordEmailFunction();
}


//////////////////////////////////////////////////////////////////////////////////////////////////
var e_employerName ;
var e_employerNameList = [];
function e_employerNameFunction() {
    e_employerNameList = [];
    e_employerName= $("input[name='employer-name-a']");
    e_employerName.each(
    function(index){
        e_employerNameList.push($(this).val());

    }
    );
    e_employerNameList =  e_employerNameList.join(" | ");
    $("#employer-name-total").val(e_employerNameList);
    // return $("#landlord-email-total").val();
}

var e_employerPhone ;
var e_employerPhoneList = [];
function e_employerPhoneFunction() {
    e_employerPhoneList = [];
    e_employerPhone= $("input[name='employer-phone-a']");
    e_employerPhone.each(
    function(index){
        e_employerPhoneList.push($(this).val());


    }
    );
    e_employerPhoneList =  e_employerPhoneList.join(" | ");
    $("#employer-phone-total").val(e_employerPhoneList);
    // return $("#landlord-email-total").val();
}

var e_employerEmail ;
var e_employerEmailList = [];
function e_employerEmailFunction() {
    e_employerEmailList = [];
    e_employerEmail= $("input[name='employer-email-a']");
    e_employerEmail.each(
    function(index){
        e_employerEmailList.push($(this).val());

    }
    );
    e_employerEmailList =  e_employerEmailList.join(" | ");
    $("#employer-email-total").val(e_employerEmailList);
    // return $("#landlord-email-total").val();
}

var e_state ;
var e_stateList = [];
function e_stateFunction() {
    // $("#state-total").val("");
    e_stateList = [];
    e_state= $("select[name='employer-state-a']");

    e_state.each(
    function(index){
        e_stateList.push($(this).val());
    }
    );
    e_stateList =  e_stateList.join(" | ");
    $("#employer-state-total").val(e_stateList);
    // return $("#state-total").val();
}

var e_city ;
var e_cityList = [];
function e_cityFunction() {
    e_cityList = [];
    e_city= $("input[name='employer-city-a']");

    e_city.each(
    function(index){
        e_cityList.push($(this).val());
    }
    );
    e_cityList =  e_cityList.join(" | ");
    $("#employer-city-total").val(e_cityList);
    // return $("#city-total").val();
}

var e_zip ;
var e_zipList = [];
function e_zipFunction() {
    e_zipList = [];
    e_zip= $("input[name='employer-zip-a']");

    e_zip.each(
    function(index){
        e_zipList.push($(this).val());
    }
    );
    e_zipList =  e_zipList.join(" | ");
    $("#employer-zip-total").val(e_zipList);
    // return $("#zip-total").val();
}

var e_add_1 ;
var e_add_1_list = [];
function e_add1Function() {
    e_add_1_list = [];
    e_add_1= $("textarea[name='employer-add-1-a']");

    e_add_1.each(
    function(index){
        e_add_1_list.push($(this).val());
    }
    );
    e_add_1_list =  e_add_1_list.join(" | ");
    $("#employer-add-1-total").val(e_add_1_list);
    // return $("#add-1-total").val();
}

var e_add_2 ;
var e_add_2_list = [];
function e_add2Function() {
    e_add_2_list = [];
    e_add_2= $("textarea[name='employer-add-2-a']");

    e_add_2.each(
    function(index){
        e_add_2_list.push($(this).val());
    }
    );
    e_add_2_list =  e_add_2_list.join(" | ");
    $("#employer-add-2-total").val(e_add_2_list);
    // return $("#add-2-total").val();
}

var e_position ;
var e_positionList = [];
function e_positionFunction() {
  e_positionList = [];
  e_position= $("input[name='position-held-a']");

  e_position.each(
    function(index){
      e_positionList.push($(this).val());
    }
  );
  e_positionList =  e_positionList.join(" | ");
  $("#position-held-total").val(e_positionList);
  // return $("#rent-total").val();
}

var e_salary ;
var e_salaryList = [];
function e_salaryFunction() {
    e_salaryList = [];
    e_salary= $("input[name='monthly-gross-salary-a']");

    e_salary.each(
    function(index){
        e_salaryList.push($(this).val());
    }
    );
    e_salaryList =  e_salaryList.join(" | ");
    $("#salary-total").val(e_salaryList);
    // return $("#date-total").val();
}


var e_dateFrom ;
var e_dateFromList = [];
function e_dateFromFunction() {
    e_dateFromList = [];
    e_dateFrom = $("input[name='employment-date-from-a']");

    e_dateFrom.each(
    function(index){
        e_dateFromList.push($(this).val());
    }
    );
    e_dateFromList =  e_dateFromList.join(" | ");
    $("#employment-from-total").val(e_dateFromList);
    // return $("#reason-total").val();
}

var e_dateTo ;
var e_dateToList = [];
function e_dateToFunction() {
  e_dateToList = [];
  e_dateTo= $("input[name='employment-date-to-a']");

  e_dateTo.each(
    function(index){
      e_dateToList.push($(this).val());
    }
  );
  e_dateToList =  e_dateToList.join(" | ");
  $("#employment-to-total").val(e_dateToList);
  // return $("#landlord-email-total").val();
}

var e_supervisorFName ;
var e_supervisorFNameList = [];
function e_supervisorFNameFunction() {
    e_supervisorFNameList = [];
    e_supervisorFName= $("input[name='supervisor-first-name-a']");

    e_supervisorFName.each(
    function(index){
        e_supervisorFNameList.push($(this).val());
    }
    );
    e_supervisorFNameList =  e_supervisorFNameList.join(" | ");
    $("#supervisor-fname-total").val(e_supervisorFNameList);
    // return $("#landlord-fname-total").val();
}

var e_supervisorLName ;
var e_supervisorLNameList = [];
function e_supervisorLNameFunction() {
    e_supervisorLNameList = [];
    e_supervisorLName= $("input[name='supervisor-last-name-a']");

    e_supervisorLName.each(
    function(index){
        e_supervisorLNameList.push($(this).val());
    }
    );
    e_supervisorLNameList =  e_supervisorLNameList.join(" | ");
    $("#supervisor-lname-total").val(e_supervisorLNameList);
    // return $("#landlord-lname-total").val();
}


var e_supervisorTitle ;
var e_supervisorTitleList = [];
function e_landlordPhoneFunction() {
    e_supervisorTitleList = [];
    e_supervisorTitle= $("input[name='supervisor-title-a']");

    e_supervisorTitle.each(
    function(index){
        e_supervisorTitleList.push($(this).val());
    }
    );
    e_supervisorTitleList =  e_supervisorTitleList.join(" | ");
    $("#supervisor-title-total").val(e_supervisorTitleList);
    // return $("#landlord-phone-total").val();
}


function employerCallFunction() {
  e_employerNameFunction();
  e_employerPhoneFunction();
  e_employerEmailFunction();
  e_stateFunction();
  e_cityFunction();
  e_zipFunction();
  e_add1Function();
  e_add2Function();
  e_positionFunction();
  e_salaryFunction();
  e_dateFromFunction();
  e_dateToFunction();
  e_supervisorFNameFunction();
  e_supervisorLNameFunction();
  e_landlordPhoneFunction();
}

// var reqProperty ;
// var reqPropertyList = [];
// function reqPropertyFunc() {
//     reqPropertyList = [];
//     reqProperty= $("input[name='req-property-a']");
//
//     reqProperty.each(
//     function(index){
//         reqPropertyList.push($(this).val());
//     }
//     );
//     reqPropertyList =  reqPropertyList.join(" | ");
//     $("#req-property-total").val(reqPropertyList);
//     // return $("#landlord-phone-total").val();
// }
//
// function reqPropCallFunction() {
//   reqPropertyFunc();
// }

function reqProp() {
  var arr1 = $("#906046").val();
  arr1 = arr1.join(' | ');
  $("#req-property-total").val(arr1);
}
