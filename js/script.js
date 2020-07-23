
$("#myForm").validator().on("submit", function(event) {
  if (event.isDefaultPrevented()) {

        // var oldEPD = Event.prototype.preventDefault;
        // Event.prototype.preventDefault = function() {
        //   debugger;
        //   oldEPD.call(this);
        // };

        console.log("error");
        // submitFailed();
    } else {
        event.preventDefault();
        setInputDate("#submitDate");
        csubmitForm();
        submitSuccess();
        console.log("Success");
    }
});

function submitSuccess() {
  setActiveStep(6);
  setActivePanel(6);
  window.scroll(0, 0);
  $("#steps_slider").remove();
  $("#title_text").remove();


}

function submitFailed() {
  $(".failed").show();
}

function csubmitForm() {
  // const scriptURL = 'https://script.google.com/macros/s/AKfycbz7Pd9hLTvHmCFwWI31U6_jKtLlJsN7pfKB_H8sTYzZDB1Wk1Y/exec'
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz7Pd9hLTvHmCFwWI31U6_jKtLlJsN7pfKB_H8sTYzZDB1Wk1Y/exec'
  const form = document.forms['rental-app-form']
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    // .then(response => console.log('Success!', response))
    .then(response => submitSuccess())

    .catch(error => console.error('Error!', error.message))
}

//DOM elements
const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next' };

  const getCurrentPanel = () => {
    var currentPanel = $(".js-active");
    return currentPanel;
  };

function toggleHasError() {
  var curStep = getActivePanel(),
      // curStepBtn = curStep.attr("id"),
      // nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
      curInputs = curStep.find("input[type='text'],input[type='url']"),
      isValid = true;

  $(".form-group").removeClass("has-error");
  for(var i=0; i<curInputs.length; i++){
      if (!curInputs[i].validity.valid){
          isValid = false;
          $(curInputs[i]).closest(".form-group").addClass("has-error");
      }
  }

  if (isValid)
      nextStepWizard.removeAttr('disabled').trigger('click');
}

function checkCustomInvalid(){
  return getCurrentPanel().find('.is-invalid').length == 1;
}


function checkRequired() {
  let allAreFilled = true;
  var activePanel= getActivePanel();
  activePanel.querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (!i.value) allAreFilled = false;
    if (i.type === "radio") {
      let radioValueCheck = false;
      activePanel.querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
        if (r.checked) radioValueCheck = true;
      })
      allAreFilled = radioValueCheck;
    }
  })
  if (!allAreFilled) {
    // console.log("Check required fields");
    return false;
  }
}

//remove class from a set of items
const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

//get active button step number
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

  //remove active state from all the state
  removeClasses(DOMstrings.stepsBtns, 'js-active');

  //set picked items to active
  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

//get active panel
const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {

    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel;

};

// const getCurrentPanel = () => {
//   var currentPanel = $(".js-active");
//   return currentPanel;
// };


//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  //show active panel
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {

      elem.classList.add('js-active');

      setFormHeight(elem);

    }
  });

};

//set form height equal to current panel height
const formHeight = activePanel => {

  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

  //open active panel
  setActivePanel(activeStep);
});

var errorElements = [];
//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

  const eventTarget = e.target;

  //check if we clicked on `PREV` or NEXT` buttons
  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
  {
    return;
  }



  //find active panel
  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

  //set active step and active panel onclick
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
    // console.log("Click Prev");
    $("form").validator('reset');
    activePanelNum--;
    window.scroll(0, 265);

  } else {
    checkRequired();
    // console.log("Click Next");
    if(($("div").hasClass("has-error"))==true || checkRequired()== false  || checkCustomInvalid()==true){
      if(checkCustomInvalid()==true){
          errorElements= [];
          // errorElements.push($("form").find($(".has-error")));
          errorElements.push($("form").find($(".is-invalid")));
          $('html, body').animate({
            scrollTop: $(errorElements[0]).offset().top -  50+ "px"
          }, "fast");
      }
      // else {

        $(".nextBtn").prop('disabled',false)
        // console.log("Check invalid fields");
        var currentPanel =getCurrentPanel();
        currentPanel.validator('update');
        currentPanel.validator('validate');
      // }
      // activePanel.validator('validate');

      // .validator('validate');
    }
    else {
      // console.log("Click next");
      activePanelNum++;
      window.scroll(0, 265);

    }


  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);

});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);

//changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

const setAnimationType = newType => {
  DOMstrings.stepFormPanels.forEach(elem => {
    elem.dataset.animation = newType;
  });
};


var carFields = `
  <div class="col-lg-6 col-sm-12 car-div form-group" >
    <input required id="car-make" data-table="Car Make" data-error="Please fill out this field." name="car-make" type="text" class="car-field multisteps-form__input form-control" placeholder="Car Make">
    <label for="car-make">Car Make</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12 car-div form-group" >
    <input  required id="car-model" data-table="Car Model" data-error="Please fill out this field." name="car-model" type="text" class="car-field multisteps-form__input form-control" placeholder="Car Model">
    <label for="car-model">Car Model</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12 car-div form-group" >
    <input  required id="license-plate" data-table="Car license plate number"  data-error="Please fill out this field." name="license-plate-num" type="text" class="car-field multisteps-form__input form-control" placeholder="Car License Plate Number">
    <label for="license-plate">Car license plate number</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12 car-div form-group" >
    <input  required id="driver-license" data-table="Drivers license number" data-error="Please fill out this field." name="driver-license-num" type="text" class="car-field multisteps-form__input form-control" placeholder="Drivers License Number">
    <label for="driver-license">Drivers license number</label>
    <div class="help-block with-errors"></div>
  </div>


`

// toggleFields();

 $("#car-select").change(function () {
    toggleFields();
    handleLabels();
    handleValLabel();
});

function toggleFields() {
    const x = $(".car-div");
    if (!($("#car-select").val() === "Yes")){
      $("#ifYesCar").slideUp();
      $(".car-div").detach();
      var currentPanel =getCurrentPanel();
      currentPanel.validator('update');
      $(".car-field").attr("required",false);
      $(".car-field").parent().removeClass("has-danger");
      $(".car-field").parent().removeClass("has-error");

    }

    else{
      // $("#car_fields").next(carFields);
      // $(carFields).insertAfter($("#car_fields"));
      $("#ifYesCar").append(carFields);
      $("#ifYesCar").slideDown();
      var currentPanel =getCurrentPanel();
      currentPanel.validator('update');
      $(".car-field").attr("required",true);
    }
}

var otherAppend = `
<div class="form-row mt-4 other-div" style="display: none;">
  <div class="col-lg-12 col-sm-12 form-group">
    <input id="Other" name="other-reasons" data-table="Other" data-error="Please fill out this field." name="other-reason" type="text" class="other-field multisteps-form__input form-control" placeholder="Other">
    <label for="Other">Other</label>
    <div class="help-block with-errors"></div>
  </div>
</div>
`

var ifYesAppend = `
<div class="col form-group ifyes-div">
  <select required id="note-reason"  data-table="Reason for choosing yes?" data-error="Please note the reason." type="text" class="multisteps-form__input form-control" name="why-don't-both-parents-sign" placeholder="Reason for choosing yes">
    <option value="" disabled selected hidden></option>
    <option value="Passed away">Passed away</option>
    <option value="Have no contact">Have no contact</option>
    <option value="Financially independent">Financially independent</option>
    <option value="Other">Other</option>
  </select>
  <label for="note-reason">If yes, please note reason:</label>
  <div class="help-block with-errors"></div>
  <div id="otherAppend" class="otherAppend">

  </div>
</div>
`

function toggleOther() {
  const x =$(".other-div");
  if (!($("#note-reason").val()=== "Other")) {
    $(".other-div").slideUp();
    $(".other-div").detach();
    $("#Other").attr("required",false);
  }
  else {
    $("#otherAppend").append(otherAppend);
    var currentPanel =getCurrentPanel();
    currentPanel.validator('update');
    $(".other-div").slideDown();
    $("#Other").attr("required",true);
  }
}

toggleOther();

function noteReasonChange() {

  $("#note-reason").change(function () {
    toggleOther();
    handleLabels();
    handleValLabel();
  });
}

function unrequireParents() {
  $("#step-2").find("input, select.state, textarea").each(function(){
    var elm = $(this);
    elm.attr('required', false);
  })
  $('#step-2').validator('reset');

}

function requireParents() {
  $("#step-2").find("input, select.state, textarea").each(function(){
    var elm = $(this);
    elm.attr('required', true);
  })
}

$('#yesCheck').click(function() {
    $('#ifYesCheck').append(ifYesAppend);
    $('#ifYesCheck').slideDown();
    $("#note-reason").attr('required',true);
    $("form").validator('update');

    // $("#step-2").find($("#note-reason")).each(function(){
    //   var elm = $(this);
    //   elm.attr('required', true);
    // })
    noteReasonChange();
    // $("#note-reason").attr("required",true);
    unrequireParents();



});

$('#noCheck').click(function() {
    $('#ifYesCheck').slideUp();
    $('.ifyes-div').detach();
    $("#note-reason").attr("required",false);
    $("form").validator('update');
    requireParents();
});

var chapters=`
<div class="chapter-content">
  <select id="loc-affiliations" required data-table="Local Affiliations" data-error="Please fill out this field." name="local-affiliations" type="text" class="multisteps-form__input form-control" placeholder="Local affiliations - faternity, sorority, etc.">
    <option value="" disabled selected hidden></option>
    <option value="Alpha Delta Phi (IFC)">Alpha Delta Phi (IFC)</option>
    <option value="Alpha Epsilon Pi (IFC)">Alpha Epsilon Pi (IFC)</option>
    <option value="Alpha Phi Alpha Fraternity, Inc. (NPHC)">Alpha Phi Alpha Fraternity, Inc. (NPHC)</option>
    <option value="Alpha Sigma Phi (IFC)">Alpha Sigma Phi (IFC)</option>
    <option value="Alpha Tau Omega (IFC)">Alpha Tau Omega (IFC)</option>
    <option value="Beta Theta Pi (IFC)">Beta Theta Pi (IFC)</option>
    <option value="Chi Phi (IFC)">Chi Phi (IFC)</option>
    <option value="Delta Sigma Phi (IFC)">Delta Sigma Phi (IFC)</option>
    <option value="Delta Upsilon (IFC)">Delta Upsilon (IFC)</option>
    <option value="Iota Nu Delta Fraternity, Inc. (MGC)">Iota Nu Delta Fraternity, Inc. (MGC)</option>
    <option value="Kappa Alpha Order (IFC)">Kappa Alpha Order (IFC)</option>
    <option value="Kappa Alpha Psi Fraternity, Inc. (NPHC)">Kappa Alpha Psi Fraternity, Inc. (NPHC)</option>
    <option value="Lambda Chi Alpha (IFC)">Lambda Chi Alpha (IFC)</option>
    <option value="Lambda Upsilon Lambda Fraternity, Inc. (MGC)">Lambda Upsilon Lambda Fraternity, Inc. (MGC)</option>
    <option value="Phi Delta Sigma Fraternity, Inc. (MGC)">Phi Delta Sigma Fraternity, Inc. (MGC)</option>
    <option value="Phi Delta Theta (IFC)">Phi Delta Theta (IFC)</option>
    <option value="Phi Kappa Psi (IFC)">Phi Kappa Psi (IFC)</option>
    <option value="Phi Kappa Tau (IFC)">Phi Kappa Tau (IFC)</option>
    <option value="Phi Sigma Kappa (IFC)">Phi Sigma Kappa (IFC)</option>
    <option value="Pi Kappa Alpha (IFC)">Pi Kappa Alpha (IFC)</option>
    <option value="Sigma Alpha Epsilon (IFC)">Sigma Alpha Epsilon (IFC)</option>
    <option value="Sigma Alpha Mu (IFC)">Sigma Alpha Mu (IFC)</option>
    <option value="Sigma Chi (IFC)">Sigma Chi (IFC)</option>
    <option value="Sigma Nu (IFC)">Sigma Nu (IFC)</option>
    <option value="Sigma Phi Epsilon (IFC)">Sigma Phi Epsilon (IFC)</option>
    <option value="Tau Epsilon Phi (IFC)">Tau Epsilon Phi (IFC)</option>
    <option value="Theta Chi (IFC)">Theta Chi (IFC)</option>
    <option value="Zeta Beta Tau (IFC)">Zeta Beta Tau (IFC)</option>
    <option value="Zeta Psi (IFC)">Zeta Psi (IFC)</option>
    <option value="Alpha Chi Omega (PHA)">Alpha Chi Omega (PHA)</option>
    <option value="Alpha Delta Pi (PHA)">Alpha Delta Pi (PHA)</option>
    <option value="Alpha Epsilon Phi (PHA)">Alpha Epsilon Phi (PHA)</option>
    <option value="Alpha Kappa Alpha Sorority, Inc. (NPHC)">Alpha Kappa Alpha Sorority, Inc. (NPHC)</option>
    <option value="Alpha Omicron Pi (PHA)">Alpha Omicron Pi (PHA)</option>
    <option value="Alpha Phi (PHA)">Alpha Phi (PHA)</option>
    <option value="Alpha Xi Delta (PHA)">Alpha Xi Delta (PHA)</option>
    <option value="Delta Delta Delta (PHA)">Delta Delta Delta (PHA)</option>
    <option value="Delta Gamma (PHA)">Delta Gamma (PHA)</option>
    <option value="Delta Phi Epsilon (PHA)">Delta Phi Epsilon (PHA)</option>
    <option value="Delta Sigma Theta Sorority, Inc. (NPHC)">Delta Sigma Theta Sorority, Inc. (NPHC)</option>
    <option value="Gamma Phi Beta (PHA)">Gamma Phi Beta (PHA)</option>
    <option value="Hermandad de Sigma Iota Alpha, Inc. (MGC)">Hermandad de Sigma Iota Alpha, Inc. (MGC)</option>
    <option value="Kappa Alpha Theta (PHA)">Kappa Alpha Theta (PHA)</option>
    <option value="Kappa Delta (PHA)">Kappa Delta (PHA)</option>
    <option value="Kappa Lambda Xi Multicultural Sorority, Inc. (MGC)">Kappa Lambda Xi Multicultural Sorority, Inc. (MGC)</option>
    <option value="Kappa Phi Lambda Sorority, Inc. (MGC)">Kappa Phi Lambda Sorority, Inc. (MGC)</option>
    <option value="Lambda Theta Alpha Latin Sorority, Inc. (MGC)">Lambda Theta Alpha Latin Sorority, Inc. (MGC)</option>
    <option value="Phi Sigma Sigma (PHA)">Phi Sigma Sigma (PHA)</option>
    <option value="Sigma Delta Tau (PHA)">Sigma Delta Tau (PHA)</option>
    <option value="Sigma Kappa (PHA)">Sigma Kappa (PHA)</option>
    <option value="Sigma Psi Zeta Sorority, Inc. (MGC)">Sigma Psi Zeta Sorority, Inc. (MGC)</option>
    <option value="Zeta Tau Alpha (PHA)">Zeta Tau Alpha (PHA)</option>
    <option value="alpha Kappa Delta Phi Sorority, Inc. (MGC)">alpha Kappa Delta Phi Sorority, Inc. (MGC)</option>
    <option value="N/A">N/A</option>
  </select>
  <label for="loc-affiliations">Chapters</label>
  <div class="help-block with-errors"></div>
</div>
`
var faternity = `
<div class="chapter-content">
  <select id="loc-affiliations" required data-table="Local Affiliations" data-error="Please fill out this field." name="local-affiliations" type="text" class="multisteps-form__input form-control" placeholder="Local affiliations - faternity, sorority, etc.">
    <option value="" disabled selected hidden></option>
    <option value="Alpha Delta Phi (IFC)">Alpha Delta Phi (IFC)</option>
    <option value="Alpha Epsilon Pi (IFC)">Alpha Epsilon Pi (IFC)</option>
    <option value="Alpha Phi Alpha Fraternity, Inc. (NPHC)">Alpha Phi Alpha Fraternity, Inc. (NPHC)</option>
    <option value="Alpha Sigma Phi (IFC)">Alpha Sigma Phi (IFC)</option>
    <option value="Alpha Tau Omega (IFC)">Alpha Tau Omega (IFC)</option>
    <option value="Beta Theta Pi (IFC)">Beta Theta Pi (IFC)</option>
    <option value="Chi Phi (IFC)">Chi Phi (IFC)</option>
    <option value="Delta Sigma Phi (IFC)">Delta Sigma Phi (IFC)</option>
    <option value="Delta Upsilon (IFC)">Delta Upsilon (IFC)</option>
    <option value="Iota Nu Delta Fraternity, Inc. (MGC)">Iota Nu Delta Fraternity, Inc. (MGC)</option>
    <option value="Kappa Alpha Order (IFC)">Kappa Alpha Order (IFC)</option>
    <option value="Kappa Alpha Psi Fraternity, Inc. (NPHC)">Kappa Alpha Psi Fraternity, Inc. (NPHC)</option>
    <option value="Lambda Chi Alpha (IFC)">Lambda Chi Alpha (IFC)</option>
    <option value="Lambda Upsilon Lambda Fraternity, Inc. (MGC)">Lambda Upsilon Lambda Fraternity, Inc. (MGC)</option>
    <option value="Phi Delta Sigma Fraternity, Inc. (MGC)">Phi Delta Sigma Fraternity, Inc. (MGC)</option>
    <option value="Phi Delta Theta (IFC)">Phi Delta Theta (IFC)</option>
    <option value="Phi Kappa Psi (IFC)">Phi Kappa Psi (IFC)</option>
    <option value="Phi Kappa Tau (IFC)">Phi Kappa Tau (IFC)</option>
    <option value="Phi Sigma Kappa (IFC)">Phi Sigma Kappa (IFC)</option>
    <option value="Pi Kappa Alpha (IFC)">Pi Kappa Alpha (IFC)</option>
    <option value="Sigma Alpha Epsilon (IFC)">Sigma Alpha Epsilon (IFC)</option>
    <option value="Sigma Alpha Mu (IFC)">Sigma Alpha Mu (IFC)</option>
    <option value="Sigma Chi (IFC)">Sigma Chi (IFC)</option>
    <option value="Sigma Nu (IFC)">Sigma Nu (IFC)</option>
    <option value="Sigma Phi Epsilon (IFC)">Sigma Phi Epsilon (IFC)</option>
    <option value="Tau Epsilon Phi (IFC)">Tau Epsilon Phi (IFC)</option>
    <option value="Theta Chi (IFC)">Theta Chi (IFC)</option>
    <option value="Zeta Beta Tau (IFC)">Zeta Beta Tau (IFC)</option>
    <option value="Zeta Psi (IFC)">Zeta Psi (IFC)</option>
    <option value="N/A">N/A</option>
  </select>
  <label for="loc-affiliations">Chapters</label>
  <div class="help-block with-errors"></div>
</div>
`
var sorority = `
<div class="chapter-content">
  <select id="loc-affiliations" required data-table="Local Affiliations" data-error="Please fill out this field." name="local-affiliations" type="text" class="multisteps-form__input form-control" placeholder="Local affiliations - faternity, sorority, etc.">
    <option value="" disabled selected hidden></option>
    <option value="Alpha Chi Omega (PHA)">Alpha Chi Omega (PHA)</option>
    <option value="Alpha Delta Pi (PHA)">Alpha Delta Pi (PHA)</option>
    <option value="Alpha Epsilon Phi (PHA)">Alpha Epsilon Phi (PHA)</option>
    <option value="Alpha Kappa Alpha Sorority, Inc. (NPHC)">Alpha Kappa Alpha Sorority, Inc. (NPHC)</option>
    <option value="Alpha Omicron Pi (PHA)">Alpha Omicron Pi (PHA)</option>
    <option value="Alpha Phi (PHA)">Alpha Phi (PHA)</option>
    <option value="Alpha Xi Delta (PHA)">Alpha Xi Delta (PHA)</option>
    <option value="Delta Delta Delta (PHA)">Delta Delta Delta (PHA)</option>
    <option value="Delta Gamma (PHA)">Delta Gamma (PHA)</option>
    <option value="Delta Phi Epsilon (PHA)">Delta Phi Epsilon (PHA)</option>
    <option value="Delta Sigma Theta Sorority, Inc. (NPHC)">Delta Sigma Theta Sorority, Inc. (NPHC)</option>
    <option value="Gamma Phi Beta (PHA)">Gamma Phi Beta (PHA)</option>
    <option value="Hermandad de Sigma Iota Alpha, Inc. (MGC)">Hermandad de Sigma Iota Alpha, Inc. (MGC)</option>
    <option value="Kappa Alpha Theta (PHA)">Kappa Alpha Theta (PHA)</option>
    <option value="Kappa Delta (PHA)">Kappa Delta (PHA)</option>
    <option value="Kappa Lambda Xi Multicultural Sorority, Inc. (MGC)">Kappa Lambda Xi Multicultural Sorority, Inc. (MGC)</option>
    <option value="Kappa Phi Lambda Sorority, Inc. (MGC)">Kappa Phi Lambda Sorority, Inc. (MGC)</option>
    <option value="Lambda Theta Alpha Latin Sorority, Inc. (MGC)">Lambda Theta Alpha Latin Sorority, Inc. (MGC)</option>
    <option value="Phi Sigma Sigma (PHA)">Phi Sigma Sigma (PHA)</option>
    <option value="Sigma Delta Tau (PHA)">Sigma Delta Tau (PHA)</option>
    <option value="Sigma Kappa (PHA)">Sigma Kappa (PHA)</option>
    <option value="Sigma Psi Zeta Sorority, Inc. (MGC)">Sigma Psi Zeta Sorority, Inc. (MGC)</option>
    <option value="Zeta Tau Alpha (PHA)">Zeta Tau Alpha (PHA)</option>
    <option value="alpha Kappa Delta Phi Sorority, Inc. (MGC)">alpha Kappa Delta Phi Sorority, Inc. (MGC)</option>
    <option value="N/A">N/A</option>
  </select>
  <label for="loc-affiliations">Chapters</label>
  <div class="help-block with-errors"></div>
</div>
`

$("#gender").change(function(){
  if($('#gender').val()=="Male"){
      console.log("Faternity")
      $(".chapter-content").detach();
      $(".chapter-div").append(faternity);
      $("form").validator('update');
  }
  else if ($('#gender').val()=="Female") {
    console.log("sorority");
    $(".chapter-content").detach();
    $(".chapter-div").append(sorority);
    $("form").validator('update');

  }
  else {
    console.log("All");
    $(".chapter-content").detach();
    $(".chapter-div").append(chapters);
    $("form").validator('update');

  }

})




function dateToFunction(fromDate, toDate) {
  var fromDateVar = $('#'+fromDate).val();
  $('#'+toDate).attr("min" , fromDateVar);
}


function setInputDate(_id){
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth()+1,
        y = hoy.getFullYear(),
        t = hoy.toTimeString(),
        data;

    if(d < 10){
        d = "0"+d;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+d+" ("+t+")";
    // console.log(data);
    _dat.value = data;
};

// setInputDate("#submitDate");

//if user chooses Group house append gp-house-fields else append b-house-fields
var gp_house_fields = `
  <div class="col-lg-12 col-sm-12 form-group gp-house-field">
    <select id="906046" data-none-selected-text="Requested Property(s) for Rent" required data-table="Requested property(s)" data-error="Please enter the requested property for rent." name="req-property-a" class="multisteps-form__input form-control my-select" multiple>
      <option id="empty_selected" value="" disabled selected> Requested Property(s) for Rent: </option>
      <option value="4603 Knox Road">4603 Knox Road</option>
      <option value="4609 Knox Road">4609 Knox Road</option>
      <option value="4611 Knox Road">4611 Knox Road</option>
      <option value="4613 Knox Road">4613 Knox Road</option>
      <option value="4613 1/2 Knox Road">4613 1/2 Knox Road</option>
      <option value="4708 Norwich Road">4708 Norwich Road</option>
      <option value="4711 Norwich Road">4711 Norwich Road</option>
      <option value="7307 Hopkins Ave">7307 Hopkins Ave</option>
      <option value="7309 Hopkins Ave">7309 Hopkins Ave</option>
      <option value="7309 Hopkins Ave Apt">7309 Hopkins Ave Apt</option>
      <option value="7310 Hokins Ave">7310 Hopkins Ave</option>
      <option value="7504 Hokins Ave">7504 Hopkins Ave</option>
      <option value="4620 College Ave">4620 College Ave</option>
      <option value="4610 Calvert Road">4610 Calvert Road</option>
      <option value="4504 Guilford Road A">4504 Guilford Road A</option>
      <option value="4504 Guilford Road B">4504 Guilford Road B</option>
      <option value="4504 Guilford Road C">4504 Guilford Road C</option>
      <option value="468111 / 51 Ave">8111 / 51 Ave</option>
      <option value="6805 Baltimore Ave">6805 Baltimore Ave</option>
      <option value="8817 Patricia Ct.">8817 Patricia Ct.</option>
      <option value="8803 Patricia Ct.">8803 Patricia Ct.</option>
      <option value="7211 Dartmouth Ave">7211 Dartmouth Ave</option>
    </select>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12 form-group hidden-area">
    <input id="req-property-total" data-table="undefined" name="req-property" type="text" class="multisteps-form__input form-control hidden" >
  </div>
  <h5 class="col-lg-12 col-sm-12 card-title gp-house-field">Group Members:</h5>
  <div class="col-lg-12 col-sm-12 form-group gp-house-field">
    <input id="group-lead" required data-table="Group lead name" data-error="Please enter your group Lead name." name="group-lead" type="text" class="multisteps-form__input form-control" placeholder="Group Lead Name">
    <label for="group-lead">Group lead name</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12   form-group gp-house-field">
    <input id="member-1" required data-table="Group member name (1)" data-error="Please enter the group member name" name="group-member-1" type="text" class="form-control textarea-form" placeholder="1. Group Member Name">
    <label for="member-1">Group member name (1)</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12   form-group gp-house-field">
    <input id="member-2" required data-table="Group member name (2)" data-error="Please enter the group member name" name="group-member-2" type="text" class="form-control textarea-form" placeholder="2. Group Member Name">
    <label for="member-2">Group member name (2)</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12   form-group gp-house-field">
    <input id="member-3" required data-table="Group member name (3)" data-error="Please enter the group member name" name="group-member-3" type="text" class="form-control textarea-form" placeholder="3. Group Member Name">
    <label for="member-3">Group member name (3)</label>
    <div class="help-block with-errors"></div>
  </div>
  <div class="col-lg-6 col-sm-12   form-group gp-house-field">
    <input id="member-4" required data-table="Group member name (4)" data-error="Please enter the group member name" name="group-member-4" type="text" class="form-control textarea-form" placeholder="4. Group Member Name">
    <label for="member-4">Group member name (4)</label>
    <div class="help-block with-errors"></div>
  </div>
  <p class="gp-house-field col-lg-12 col-sm-12" style="font-size = 1rem;">Estimated amount you are prepared to pay as a group (without utilities)</p>
  <div class="gp-house-field col-lg-12 col-sm-12 form-group">
    <input id="prepared2pay" required data-table="Estimated amount you are prepared to pay as a group (without utilities)" data-error="Please fill out this field." name="estimated-payment" type="number" class="multisteps-form__input form-control" placeholder="Estimated amount you are prepared to pay as a group (without utilities)">
    <label style="font-size: 0.89rem;" for="prepared2pay">Estimated amount to pay in dollars</label>
    <div class="help-block with-errors"></div>
  </div>

`
var boarding_house_fields = `

  <div class="col-lg-6 col-sm-12 form-group boarding-house-field">
    <select id="boarding-house-name" name="req-property" required data-table="Requested House Name" data-error="Please select a name" class="multisteps-form__select form-control">
      <option value="" disabled selected ></option>
      <option value="Theta Chi">Theta Chi</option>
    </select>
    <label for="boarding-house-name">Requested House Name</label>
    <div class="help-block with-errors"></div>
  </div>
    <div class="col-lg-6 col-sm-12 form-group boarding-house-field">
      <select id="room-type" name="room-type" required data-table="Room Type" data-error="Please select a room type" class="multisteps-form__select form-control">
        <option value="" disabled selected ></option>
        <option value="Single">Single</option>
        <option value="Suite Double">Suite Double</option>
        <option value="Double">Double</option>
        <option value="Apartment">Apartment</option>
        <option value="Basement Double">Basement Double</option>
      </select>
      <label for="room-type">Room Type</label>
      <div class="help-block with-errors"></div>
    </div>
    <div class="col-lg-6 col-sm-12 room-num-div form-group boarding-house-field">
        <div class="room-content">
          <select id="room-num" name="room-num" required data-table="Requested Room Number" data-error="Please select a room number" class="multisteps-form__select form-control">
            <option value="" disabled selected ></option>
            <option value="202">202</option>
            <option value="203">203</option>
            <option value="205">205</option>
            <option value="304">304</option>
            <option value="305">305</option>
            <option value="308">308</option>
            <option value="309">309</option>
            <option value="310">310</option>
            <option value="102">102</option>
            <option value="201C">201C</option>
            <option value="201A">201A</option>
            <option value="204C">204C</option>
            <option value="206">206</option>
            <option value="208">208</option>
            <option value="307">307</option>
            <option value="306">306</option>
            <option value="303">303</option>
            <option value="301">301</option>
            <option value="311">311</option>
            <option value="302">302</option>
            <option value="201A">201A</option>
            <option value="303">303</option>
            <option value="101">101</option>
            <option value="207">207</option>
            <option value="Bsmnt1">Bsmnt1</option>
            <option value="Bsmnt2">Bsmnt2</option>
          </select>
          <label for="room-num">Requested Room Number</label>
          <div class="help-block with-errors"></div>
        </div>
      </div>
      <p class="boarding-house-field col-lg-12 col-sm-12" style="font-size = 1rem;">Estimated amount you are prepared to pay (without utilities)</p>
      <div class="boarding-house-field col-lg-12 col-sm-12 form-group">
        <input id="prepared2pay" required data-table="Estimated amount you are prepared to pay(without utilities)" data-error="Please fill out this field." name="estimated-payment" type="number" class="multisteps-form__input form-control">
        <label style="font-size: 0.89rem;" for="prepared2pay">Estimated amount to pay in dollars</label>
        <div class="help-block with-errors"></div>
      </div>

`;

var single_r = `
<div class="room-content">
  <select id="room-num" name="room-num" required data-table="Requested Room Number" data-error="Please select a room number" class="multisteps-form__select form-control">
    <option value="" disabled selected hidden></option>
    <option value="202">202</option>
    <option value="203">203</option>
    <option value="205">205</option>
    <option value="304">304</option>
    <option value="305">305</option>
    <option value="308">308</option>
    <option value="309">309</option>
    <option value="310">310</option>
  </select>
  <label for="room-num">Requested Room Number</label>
  <div class="help-block with-errors"></div>
</div>
`;
var suite_dbl_r = `
<div class="room-content">
  <select id="room-num" name="room-num" required data-table="Requested Room Number" data-error="Please select a room number" class="multisteps-form__select form-control">
    <option value="" disabled selected hidden></option>
    <option value="102">102</option>
    <option value="201C">201C</option>
    <option value="201A">201A</option>
    <option value="204C">204C</option>
  </select>
  <label for="room-num">Requested Room Number</label>
  <div class="help-block with-errors"></div>
</div>
`;
var double_r = `
<div class="room-content">
  <select id="room-num" name="room-num" required data-table="Requested Room Number" data-error="Please select a room number" class="multisteps-form__select form-control">
    <option value="" disabled selected hidden></option>
    <option value="206">206</option>
    <option value="208">208</option>
    <option value="307">307</option>
    <option value="306">306</option>
    <option value="303">303</option>
    <option value="301">301</option>
    <option value="311">311</option>
    <option value="302">302</option>
    <option value="201A">201A</option>
    <option value="303">303</option>
  </select>
  <label for="room-num">Requested Room Number</label>
  <div class="help-block with-errors"></div>
</div>
`;
var apartment = `
<div class="room-content">
  <select id="room-num" name="room-num" required data-table="Requested Room Number" data-error="Please select a room number" class="multisteps-form__select form-control">
    <option value="" disabled selected hidden></option>
    <option value="101">101</option>
    <option value="207">207</option>
  </select>
  <label for="room-num">Requested Room Number</label>
  <div class="help-block with-errors"></div>
</div>
`;
var basement_dbl_r = `
<div class="room-content">
  <select id="room-num" name="room-num" required data-table="Requested Room Number" data-error="Please select a room number" class="multisteps-form__select form-control">
    <option value="" disabled selected hidden></option>
    <option value="Bsmnt1">Bsmnt1</option>
    <option value="Bsmnt2">Bsmnt2</option>
  </select>
  <label for="room-num">Requested Room Number</label>
  <div class="help-block with-errors"></div>
</div>
`;

$("#house-type").change(function () {
   toggleHouseFields();
   handleLabels();
   handleValLabel();
   $('.my-select').selectpicker();
   $('#empty_selected').removeAttr('selected');


});

function toggleHouseFields() {
   if (!($("#house-type").val() === "Boarding House")){
     $("#ifBHouse").slideUp();
     $(".boarding-house-field").detach();
     $("#ifGpHouse").append(gp_house_fields);
     $("#ifGpHouse").slideDown();
     var currentPanel =getCurrentPanel();
     currentPanel.validator('update');
     console.log("Group House");

   }

   else{
     $("#ifGpHouse").slideUp();
     $(".gp-house-field").detach();
     $("#ifBHouse").append(boarding_house_fields);
     $("#ifBHouse").slideDown();
     var currentPanel =getCurrentPanel();
     currentPanel.validator('update');
     console.log("Boarding House");

     $("#room-type").change(function(){
       handleLabels();
       handleValLabel();
       if($('#room-type').val()=="Single"){
          console.log("Single")
          $(".room-content").detach();
          $(".room-num-div").append(single_r);
          $("form").validator('update');
          handleLabels();
          handleValLabel();
      }
      else if ($('#room-type').val()=="Suite Double") {
          console.log("Suite Double");
          $(".room-content").detach();
          $(".room-num-div").append(suite_dbl_r);
          $("form").validator('update');
          handleLabels();
          handleValLabel();
      }
      else if ($('#room-type').val()=="Double") {
          console.log("Double");
          $(".room-content").detach();
          $(".room-num-div").append(double_r);
          $("form").validator('update');
          handleLabels();
          handleValLabel();
      }
      else if ($('#room-type').val()=="Apartment") {
          console.log("Apartment");
          $(".room-content").detach();
          $(".room-num-div").append(apartment);
          $("form").validator('update');
          handleLabels();
          handleValLabel();
      }
      else {
          console.log("Basement Double");
          $(".room-content").detach();
          $(".room-num-div").append(basement_dbl_r);
          $("form").validator('update');
          handleLabels();
          handleValLabel();
      }
     })

   }
}


function unrequireEmployment() {
  $("#step-4").find("input, select.state, textarea").each(function(){
    var elm = $(this);
    elm.attr('required', false);
  })
  $('#step-4').validator('reset');

}

function requireEmployment() {
  $("#step-4").find("input, select.state, textarea").each(function(){
    var elm = $(this);
    elm.attr('required', true);
  })
}

$('#noEmployCheck').click(function() {
    console.log("Yes");
    $("form").validator('update');
    unrequireEmployment();



});

$('#yesEmployCheck').click(function() {
    console.log("No");
    $("form").validator('update');
    requireEmployment();
});

$('input[name=currentRole]').change(function(){
    if($(this).is(':checked')) {
        // Checkbox is checked..
        console.log("checked");
        $("#employment-date-to").attr('required', false);
        $("#employment-date-to").attr('disabled', true);
        $("#employment-date-to").val("Present");
        $("#employment-date-to-label").hide();
        $("form").validator('update');
        $("form").validator('reset');

    } else {
      console.log("unchecked");
      $("#employment-date-to").attr('required', true);
      $("#employment-date-to").attr('disabled', false);
      $("#employment-date-to").val("");
      $("#employment-date-to-label").show();
      $("form").validator('update');
      $("form").validator('reset');


    }
});
