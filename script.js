$(document).ready(function () {
  var container = $(".container");
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
        container.append(recipeImg);
        var imageBreak = $("<br>");
        container.append(imageBreak);
        var recipeBtn = $("<button>");
        recipeBtn.text(response[i].title);
        container.append(recipeBtn);

        
      }
    });

    

  });






  var imageLoad = (function () {
    var pexelUrl = "https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=food&per_page=15&page=1"

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
        var scrollImg = $("<img class='d-block w-100 rounded-circle'>")
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

  $("#findRecipe").click(function () {
    $("#create").hide();
  });

});
