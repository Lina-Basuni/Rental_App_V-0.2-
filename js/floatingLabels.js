function handleLabels() {
  $(".form-group .form-control").blur(function(){
	   if($(this).val()!=""){
		   $(this).siblings("label").addClass("active");
	   }else{
		    $(this).siblings("label").removeClass("active");
	   }
  });
}

function handleValLabel() {
  if($(".form-group .form-control").val()!=""){

    $(this).siblings("label").addClass("active");
  }else{
     $(this).siblings("label").removeClass("active");
  }

}

function generateUniqID () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
}
function IDGenerator() {

  this.length = 8;
  this.timestamp = +new Date;

  var _getRandomInt = function( min, max ) {
   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  this.generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";

    for( var i = 0; i < this.length; ++i ) {
     var index = _getRandomInt( 0, parts.length - 1 );
     id += parts[index];
    }

    return id;
  }


}


// document.addEventListener( "DOMContentLoaded", function() {
//  var btn = document.querySelector( "#generate" ),
//    output = document.querySelector( "#output" );
//
//  btn.addEventListener( "click", function() {
//    var generator = new IDGenerator();
//    output.innerHTML = generator.generate();
//
//  }, false);
//
// });
const ssn = document.getElementById('applicant-ssn');

function ssnValidation() {
  ssn.addEventListener("keydown", (e) => {
    if(e.key === "Backspace" || e.key === "Delete") return;
    if(e.target.value.length === 3) {
      ssn.value = ssn.value + "-";
    }
    if(e.target.value.length === 6) {
      ssn.value = ssn.value + "-";
    }

  })

}



$(document).ready(function(){
$('.my-select').selectpicker();
$('#empty_selected').removeAttr('selected');

  var generator = new IDGenerator();
  // output.innerHTML = generator.generate();
  handleValLabel();
  handleLabels();
  $("input").keydown(function(event){
    if(event.keyCode == 13) {
      // console.log("Enter");
      event.preventDefault();
      return false;
    }
  });
  $("#uniqueID").val(generator.generate());
  $(".toggle-ssn").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  // $('.selectpicker').selectpicker({
  //   template: {
  //     caret: '<span><i class="fas fa-angle-down"></i></span>'
  //   }
  // });

});
// Selectpicker.DEFAULTS = {
//     noneSelectedText: 'Nothing selected',
//     noneResultsText: 'No results matched {0}',
//     countSelectedText: function (numSelected, numTotal) {
//       return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
//     },
//     maxOptionsText: function (numAll, numGroup) {
//       return [
//         (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
//         (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
//       ];
//     },
//     selectAllText: 'Select All',
//     deselectAllText: 'Deselect All',
//     doneButton: false,
//     doneButtonText: 'Close',
//     multipleSeparator: ', ',
//     styleBase: 'btn--transparent',
//     style: 'btn--dropdown',
//     size: 'auto',
//     title: null,
//     selectedTextFormat: 'values',
//     width: false,
//     container: false,
//     hideDisabled: false,
//     showSubtext: false,
//     showIcon: true,
//     showContent: true,
//     dropupAuto: true,
//     header: false,
//     liveSearch: false,
//     liveSearchPlaceholder: null,
//     liveSearchNormalize: false,
//     liveSearchStyle: 'contains',
//     actionsBox: false,
//     iconBase: '',
//     tickIcon: 'fa-check',
//     showTick: false,
//     template: {
//       caret: ''
//     },
//     maxOptions: false,
//     mobile: false,
//     selectOnTab: false,
//     dropdownAlignRight: false,
//     windowPadding: 0
//   };
