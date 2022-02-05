function randomRecipe() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((Response) => Response.json())
    .then((details) => {
      displayRecipeHTML(details);
    });
}

function displayRecipeHTML(details) {
  var picture = $("#picture");
  var foodPic =
    "<img class='mealThumb' src=" + details.meals[0].strMealThumb + ">";
  picture.html(foodPic);

  var mealName = $("#name");
  mealName.html(`<h4> ${details.meals[0].strMeal} </h4>
  <p>Category:</p><p>${details.meals[0].strArea}</p>`);

  var mealInfo = $("#ingredients");
  var ingredientInfo = [];
  for (var i = 1; i <= 20; i++) {
    var measuringKey = "strMeasure" + i;
    var ingredientKey = "strIngredient" + i;
    var ingredient = details.meals[0][ingredientKey];

    if (!ingredient) break;

    var information = `<p>${details.meals[0][measuringKey]} ${ingredient}</p>`;
    ingredientInfo.push(information);
  }
  mealInfo.html(`<p>Ingredients:</p><p>${ingredientInfo.join("")}</p>`);

  var instructions = $("#instructions");
  instructions.html(
    `<p>Instructions:</p><p>${details.meals[0].strInstructions}</p>`
  );
}

function searchRecipe() {
  var userInput = $("#userInput");
  if (userInput.val().trim() !== "") {
    var queryURL =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
      userInput.val().trim();

    fetch(queryURL)
      .then((Response) => Response.json())
      .then((details) => {
        if (details.meals === null) {
          errorMsg("Meal not found._. Please try something else!");
        } else {
          displayRecipeHTML(details);
        }
      });
  } else {
    errorMsg("Please enter something");
  }
}
function errorMsg(msg) {
  $("#modalId").addClass("is-active");
  $("#modalMsg").html(msg);
}
function close() {
  $("#modalId").removeClass("is-active");
}

$("#randomRecipe").click(randomRecipe);
$("#searchRecipe").click(searchRecipe);
$("#modalBtn").click(close);
