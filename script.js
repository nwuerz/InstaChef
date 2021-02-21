$(document).ready(function () {
  const container1 = $("#container1");
  const container2 = $("#container2");
  const container3 = $('#container3');
  const findRecipeButton = $("#findRecipe");
  const apiKey = "&apiKey=d51cc1193eac4bbf92a955328a006a0c";
  let ingredientsArr = [];
  const selectRecipe = $("#selectRecipe");

  $("#container3").hide();
  $("#goBackPage2").hide();

  // functions //

  const showRecipes = (recipes) => {
    recipes.forEach(recipe => {
      const { image, title, id } = recipe;
      const html = `
      <img src=${image} id=${id} class="recipeImg" data-toggle="modal" data-target="#modal"/>
      <br>
      <h3 class="recipeTitle">${title}</h3>`

      container2.append(html);
    });
  }

  const addBackButton = () => {
    const button = `<button id="goBackPage2">Go Back</button>`
    container2.append(button);
  }

  const handleBackButtonClick = () => {
    $("#goBackPage2").click( () => {
      container1.show();
      container2.empty();
    });
  }

  const openPage3 = () => {
    container2.hide();
    container3.show();
    $("#modalContainer").hide();
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  }

  const getRecipeURL = () => {
    $(".form-check-input").each( (i, checkbox) => {
      const isChecked = $(checkbox).prop("checked");
      const ingredientVal = $(checkbox).val();

      isChecked ? ingredientsArr.push(ingredientVal) : null;
    });

    const ingredientsJoined = ingredientsArr.join(",+");
    const url =
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
      ingredientsJoined +
      apiKey;
      console.log(ingredientsArr)
    return url;
  }

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error
    }
  }

  // event listeners //
  findRecipeButton.click( async () => {
    let recipeURL = getRecipeURL();
    let recipeData = await getData(recipeURL);
    
    container1.hide();
    showRecipes(recipeData);
    addBackButton();
    handleBackButtonClick();

  
      //when user clicks on image
      $(".recipeImg").on("click", function () {
        $("#nutrition").empty();
        $("#diets").empty();
        $("#nutrition").text("Nutrition: ");
        $("#diets").text("Diet: ");
        var recipeId = $(this).attr("id");
        selectRecipe.attr("data-recipeId", recipeId);
        var modalInfoUrl =
          "https://api.spoonacular.com/recipes/" +
          recipeId +
          "/information?includeNutrition=true" +
          apiKey;

        $.ajax({
          url: modalInfoUrl,
          method: "GET",
        }).then(function (response) {
          const { title, readyInMinutes, servings } = response;

          $("#modalTitle").text(title);
          $("#readyIn").text(`ready in ${readyInMinutes} minutes!`);
          $("#servings").text(`serves ${servings}`);

          //loop through first 9 nutrition items and append to nutrition div
          for (let i = 0; i < 9; i++) {
            const { title, amount, unit } = response.nutrition.nutrients[i];
            const nutritionInfo = `<p>${title}: ${amount}${unit}</p>`

            $("#nutrition").append(nutritionInfo);
          }
          // append diet info to div
          response.diets.forEach(diet => {
            const dietsInfo = `<p>${diet}</p>`;
            $("#diets").append(dietsInfo);
          })

        });
      });
      //when user clicks "take me to recipe"..
      selectRecipe.on("click", function () {
        const recipeId = $(this).attr("data-recipeId");
        const finalRecipeUrl =
          "https://api.spoonacular.com/recipes/" +
          recipeId +
          "/information?includeNutrition=true" +
          apiKey;
        $.ajax({
          url: finalRecipeUrl,
          method: "GET",
        }).then((response) => {
          const { title, image, nutrition: { ingredients }, analyzedInstructions: { steps } } = response;
          $("#finalRecipeTitle").text(title);
          $("#finalRecipeImg").attr("src", image);
          //loop through ingredients and append to ingredients div
          ingredients.forEach(ingredient => {
            const { name, amount, unit } = ingredient;
            const listEl = `
            <p>${name} - ${amount} ${unit}</p>`
            $("#ingredientsDiv").append(listEl);
          });
          
          //loop through instructions and append to instructions div
          steps.forEach(item => {
            const { number, step } = item;
            const instructionsEl = `
            <p>${number}. ${step}</p>`
            $("#recipeInstructions").append(instructionsEl);
          })
          for (
            let i = 0;
            i < response.analyzedInstructions[0].steps.length;
            i++
          ) {
            var instructionsEl = $("<p>");
            instructionsEl.text(
              response.analyzedInstructions[0].steps[i].number +
                ". " +
                response.analyzedInstructions[0].steps[i].step
            );
            $("#recipeInstructions").append(instructionsEl);
          }
        });
        openPage3();
      });
    });

  //go back to container 2 when "go back" button is pressed
  $("#goBack").click(() => {
    container2.show();
    container3.hide();
    $("#finalRecipeTitle").empty();
    $("#finalRecipeImg").empty();
    $("#ingredientsDiv").empty();
    $("#recipeInstructions").empty();
  });
 
});