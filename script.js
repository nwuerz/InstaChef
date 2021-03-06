$(document).ready(function () {
  const container1 = $("#container1");
  const container2 = $("#container2");
  const container3 = $('#container3');
  const findRecipeButton = $("#findRecipe");
  const selectRecipe = $("#selectRecipe");
  const apiKey = "&apiKey=d51cc1193eac4bbf92a955328a006a0c";
  let ingredientsArr = [];
  let recipeData = {};

  const showRecipes = (recipes) => {
    recipes.forEach(recipe => {
      const { image, title, id } = recipe;
      const html = `
      <img src=${image} id=${id} class="recipeImg" data-toggle="modal" data-target="#modal"/>
      <br>
      <h3 class="recipeTitle">${title}</h3>`

      container2.append(html);
      handleRecipeClick(id);
    });
  }

  const updateModal = (data) => {
    $("#nutrition").text("Nutrition: ");
    $("#diets").text("Diet: ");

    const { title, readyInMinutes, servings } = data;

        $("#modalTitle").text(title);
        $("#readyIn").text(`ready in ${readyInMinutes} minutes!`);
        $("#servings").text(`serves ${servings}`);

        //loop through first 9 nutrition items and append to nutrition div
        for (let i = 0; i < 9; i++) {
          const { title, amount, unit } = data.nutrition.nutrients[i];
          const nutritionInfo = `<p>${title}: ${amount}${unit}</p>`

          $("#nutrition").append(nutritionInfo);
        }
        // append diet info to div
        data.diets.forEach(diet => {
          const dietsInfo = `<p>${diet}</p>`;
          $("#diets").append(dietsInfo);
        })
  }

  const handleRecipeClick = (id) => {
    $(`#${id}`).click( async () => {
      let nutritionURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true${apiKey}`;
      let nutritionData = await getData(nutritionURL);
      updateModal(nutritionData);
      takeMeToRecipe(id);
    });
  }

  const updateFinalRecipe = (data) => {
    const { title, image, nutrition: { ingredients }, analyzedInstructions } = data;
    $("#ingredientsDiv").empty();
    $("#recipeInstructions").empty();

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
    analyzedInstructions[0].steps.forEach(item => {
      const { number, step } = item;
      const instructionsEl = `
      <p>${number}. ${step}</p>`
      $("#recipeInstructions").append(instructionsEl);
    });
  }

  const takeMeToRecipe = (id) => {
    selectRecipe.click( async () => {
      const finalRecipeUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true${apiKey}`;
      const finalRecipeData = await getData(finalRecipeUrl);

      updateFinalRecipe(finalRecipeData);
      openPage3();
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
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsJoined}${apiKey}`;
    return url;
  }

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  const displayPage2 = async () => {
    let recipeURL = getRecipeURL();
    recipeData = await getData(recipeURL);

    container1.hide();
    showRecipes(recipeData);
    addBackButton();
    handleBackButtonClick();
  }

  findRecipeButton.click( () => {
    getRecipeURL();
    ingredientsArr.length === 0 ? alert('please select an ingredient!'): displayPage2();
  });

  $("#goBack").click(() => {
    container2.show();
    container3.hide();
  });
});