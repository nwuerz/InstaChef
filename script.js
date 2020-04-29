$(document).ready(function () {
  var container2 = $("#container2");
  var $findRecipe = $("#findRecipe");
  var apiKey = "&apiKey=d51cc1193eac4bbf92a955328a006a0c";
  var ingredientsArr = [];
  var selectRecipe = $("#selectRecipe");

  //hide divs until needed...
  $("#container3").hide();
  $("#goBackPage2").hide();

  // when user clicks findEl button... //change startDiv attribute to hide start page and display optionsDiv
  $findRecipe.on("click", function () {
    // console.log($(".form-check-input")); 
    $(".form-check-input").each(function (index, checkbox) {
      // console.log(checkbox);
      var isChecked = $(checkbox).prop("checked");
      var ingredientVal = $(checkbox).val();
      console.log(ingredientVal + " " + isChecked);
      if (isChecked === true) {
        ingredientsArr.push(ingredientVal);
      }

    });
    console.log(ingredientsArr);
    var ingredientsJoined = ingredientsArr.join(",+");
    var recipeURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredientsJoined + apiKey;
    $.ajax({
      url: recipeURL,
      method: 'GET',
    }).then(function (response) {
      console.log(recipeURL);
      console.log(response);
      //loop through object and create an image and button for each recipe option
      for (let i = 0; i < response.length; i++) {
        var recipeImg = $("<img>");
        console.log(response[i].image)
        recipeImg.attr("src", response[i].image);
        recipeImg.attr("data-toggle", "modal");
        recipeImg.attr("data-target", "#exampleModalLong");
        container2.append(recipeImg);
        var imageBreak = $("<br>");
        container2.append(imageBreak);
        var recipeTitle = $("<h3>");
        recipeTitle.text(response[i].title);
        recipeTitle.attr("class", "recipeTitle");
        container2.append(recipeTitle);
        var recipeId = response[i].id;
        recipeImg.attr('id', recipeId)
        recipeImg.attr('class', 'recipeImg')
      }
      //create go back button for page 2
      var goBackPage2 = $("<button>");
      goBackPage2.text("Go Back");
      goBackPage2.attr("id", "goBackPage2");
      container2.append(goBackPage2);
      //page 2 go back functionality
      //go back from container 2
      $("#goBackPage2").click(function () {
      $("#container1").show();
      $("#container2").empty();
      });
      //when user clicks on image
      $('.recipeImg').on("click", function() {
        $("#nutrition").empty();
        $("#diets").empty();
        $("#nutrition").text("Nutrition: ");
        $("#diets").text("Diet: ");
        var recipeId = $(this).attr('id');
        console.log("recipeId is:" + recipeId);
        selectRecipe.attr('data-recipeId', recipeId);
        var modalInfoUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?includeNutrition=true" + apiKey;
        $.ajax({
          url: modalInfoUrl,
          method: 'GET',
        }).then(function (response) {
          console.log(response);
          $("#exampleModalLongTitle").text(response.title);
          $("#readyIn").text("ready in " + response.readyInMinutes + " minutes!");
          $("#servings").text("serves " + response.servings);
          //loop through first p nutrition items and append to nutrition div
          for (let i = 0; i < 9; i++) {
            var nutritionInfo = $("<p>");
            nutritionInfo.text("   " + response.nutrition.nutrients[i].title + " : " + response.nutrition.nutrients[i].amount + response.nutrition.nutrients[i].unit);
            $("#nutrition").append(nutritionInfo);         
          }
          for (let i = 0; i < response.diets.length; i++) {
            var dietsInfo = $("<p>");
            dietsInfo.text("   " + response.diets[i]);
            $("#diets").append(dietsInfo);
          }
        });

      });
      //when user clicks "take me to recipe"..
      selectRecipe.on('click', function(){
        var recipeId = $(this).attr('data-recipeId');
        console.log(recipeId);
        var finalRecipeUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?includeNutrition=true" + apiKey;
        $.ajax({
          url: finalRecipeUrl,
          method: 'GET',
        }).then(function (response) {
          console.log(response);
          $("#finalRecipeTitle").text(response.title);
          $("#finalRecipeImg").attr("src", response.image);
          //loop through ingredients and append to ingredients div
          for (let i = 0; i < response.nutrition.ingredients.length; i++) {
            var listEl = $("<p>");
            listEl.text(response.nutrition.ingredients[i].name + " - " + response.nutrition.ingredients[i].amount + " " + response.nutrition.ingredients[i].unit);
            $("#ingredientsDiv").append(listEl);
          }
          //loop through instructions and append to instructions div
          for (let i = 0; i < response.analyzedInstructions[0].steps.length; i++) {
            var instructionsEl = $("<p>");
            instructionsEl.text(response.analyzedInstructions[0].steps[i].number + ". " + response.analyzedInstructions[0].steps[i].step);
            $("#recipeInstructions").append(instructionsEl);
          }
        });
      })

    });
    

  });

 //hide container 1 when "find recipe" button is clicked
  $("#findRecipe").click(function () {
    $("#container1").hide();
  });

//hide modal and container 2 when "take me to recipe" is clicked
$("#selectRecipe").click(function () {
  $("#container2").hide();
  $("#container3").show();
  $("#exampleModalLong").attr("aria-hidden", "true");
});

//go back to container 2 when "go back" button is pressed
$("#goBack").click(function () {
  $("#container2").show();
  $("#container3").hide();
  $("#finalRecipeTitle").empty();
  $("#finalRecipeImg").empty();
  $("#ingredientsDiv").empty();
  $("#recipeInstructions").empty();
});
//go back from page 2
$("#goBackPage2").click(function () {
  $("#container1").show();
  $("#container2").empty();
  });

});

$('.carousel').carousel({
  interval: 2000
})
