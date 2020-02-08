$(document).ready(function () { 

var proteinEl = $("#proteinEl");
var veggiesEl = $("#veggieEl");
var spicesEl = $("#spicesEl");
var carbsEl = $("#carbsEl");
var findEl = $("#findEl");
var startDiv = $("#startDiv");
var optionsDiv = $("#optionDiv");
var apiKey = "&apiKey=103be80050034030a9270b7a9de5630f";

// when user clicks findEl button... //change startDiv attribute to hide start page and display optionsDiv
findEl.on("click", function() {                             
    var recipeURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + proteinEl.val() + veggiesEl.val() + spicesEl.val() + carbsEl.val(); + apiKey;
    $.ajax({
        url: recipeURL,
        method: 'GET',
      }).then(function(response) {
        console.log(response);
        //change startDiv attribute to hide start page and display optionsDiv
        startDiv.attr("class", "hideDiv");
        optionsDiv.attr("class", "displayDiv");
        //append results from returned object to corresponding elements
        for (let i = 0; i < array.length; i++) {
          //create elements
          var optionImg = $("<img>");
          optionImg.attr("src", "response[i].image");
          optionsDiv.append(optionImg);
          var optionBtn = $("<button>");
          optionBtn.text("option " + response[i]+1);
        }


      });
//clear 

// when the user selects an option, display
});

});
