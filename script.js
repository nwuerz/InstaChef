$(document).ready(function () { 

var proteinEl = $("proteinEl");
var veggiesEl = $("veggieEl");
var spicesEl = $("spicesEl");
var carbsEl = $("carbsEl");
var findEl = $("findEl");

// when user clicks findEl button, display the first three options
findEl.on("click", function() {
    var recipeURL = "http://www.recipepuppy.com/api/?i=" + proteinEl.val() + veggiesEl.val() + spicesEl.val() + carbsEl.val();
    $.ajax({
        url: recipeURL,
        method: 'GET',
      }).then(function(response) {
        console.log(response);
      });
// when user clicks next, display the next 3 options

// when the user selects an option, display
});

});