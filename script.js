$(document).ready(function () {
  var container2 = $("#container2");
  var $findRecipe = $("#findRecipe");
  var apiKey = "&apiKey=d51cc1193eac4bbf92a955328a006a0c";
  var ingredientsArr = [];
  var selectRecipe = $("#selectRecipe");

  //hide container3 div until needed...
  $("#container3").hide();

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
        var recipeBtn = $("<button>");
        recipeBtn.text(response[i].title);
        container2.append(recipeBtn);
        var recipeId = response[i].id;
        recipeImg.attr('id', recipeId)
        recipeImg.attr('class', 'recipeImg')

      }

      $('.recipeImg').on("click", function() {
        var recipeId = $(this).attr('id');
        selectRecipe.attr('data-recipeId', recipeId)
      });

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
            var listEl = $("<li>");
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






  var imageLoad = (function () {
    var pexelUrl = "https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=food&per_page=100&page=1"

    // https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=example+query&per_page=15&page=1

    $.ajax({
      url: pexelUrl,
      headers: {
        'Authorization': '563492ad6f917000010000012e154557ed544fe39097059286f8e737',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then(function (results) {
      console.log(results);
      $(".carousel-inner").empty();

      for (var i = 0; i < results.photos.length; i++) {


        var scrollDiv = $("<div class='carousel-item'>");
        var scrollImg = $("<img class='d-block w-100 img-fluid'>")
        scrollImg.attr("src", results.photos[i].src.original);
        scrollDiv.append(scrollImg);
        $(".carousel-inner").append(scrollDiv);
        if (i === 0) {
          scrollDiv.addClass("active");
        }

      }

    })
  })
  imageLoad();
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

});
