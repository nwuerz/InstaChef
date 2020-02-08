$(document).ready(function () { 

  //protein options
  var $chicken = $("#chicken");
  var $pork = $("#pork");
  var $groundBeef = $("#groundBeef");
  var $fish = $("#fish");
  var $tofy = $("#tofu");
  //veggie options
  var $corn = $("#corn");
  var $spinach = $("#spinach");
  var $greenBeans = $("#greenBeans");
  var $potatoes = $("#potatoes");
  var $squash = $("#squash");
  //spice options
  var $salt = $("#salt");
  var $pepper = $("#pepper");
  var $crushedRedPepper = $("#crushedRedPepper");
  var $cayenne = $("#cayenne");
  var $thyme = $("#thyme");
  //carbs options
  var $whiteRice = $("#whiteRice");
  var $brownRice = $("#brownRice");
  var $pasta = $("#pasta");
  var $tortillas = $("#tortillas");
  var $bread = $("#bread");

  var $findRecipe = $("#findRecipe");
  var apiKey = "&apiKey=103be80050034030a9270b7a9de5630f";
  var ingredientsArr = [];


// when user clicks findEl button... //change startDiv attribute to hide start page and display optionsDiv
$findRecipe.on("click", function() {    
  // console.log($(".form-check-input")); 
  $(".form-check-input").each(function(index, checkbox){
    // console.log(checkbox);
    var isChecked = $(checkbox).prop("checked");
    var ingredientVal = $(checkbox).val();
    console.log(ingredientVal + " " + isChecked);
    if(isChecked === true) {
      ingredientsArr.push(ingredientVal);
    }
    
  });                        
  console.log(ingredientsArr);
  var ingredientsJoined = ingredientsArr.join("+");
    var recipeURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredientsJoined + apiKey;
    $.ajax({
        url: recipeURL,
        method: 'GET',
      }).then(function(response) {
        console.log(response);
        //create a page containing the recipe options with an image and a button for each option

      });



//clear 

// when the user selects an option, display
});

});
