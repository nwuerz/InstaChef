$(document).ready(function () { 

var proteinEl = $("#proteinEl");
var veggiesEl = $("#veggieEl");
var spicesEl = $("#spicesEl");
var carbsEl = $("#carbsEl");
var findEl = $("#findEl");
var startDiv = $("#startDiv");
var optionsDiv = $("#optionDiv");

// when user clicks findEl button... //change startDiv attribute to hide start page and display optionsDiv
findEl.on("click", function() {
    var recipeURL = "http://www.recipepuppy.com/api/?i=" + proteinEl.val() + veggiesEl.val() + spicesEl.val() + carbsEl.val();
    $.ajax({
        url: recipeURL,
        method: 'GET',
      }).then(function(response) {
        console.log(response);
        //change startDiv attribute to hide start page and display optionsDiv
        startDiv.attr("class", "hideDiv");
        optionsDiv.attr("class", "displayDiv");
        //append results from returned object to corresponding elements
        
      });
//clear 

// when the user selects an option, display
});

});