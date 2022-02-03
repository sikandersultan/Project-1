function randomRecipe() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((Response) => Response.json())
    .then((details) => {
      randomRecipeHTML(details);
    });
}

function randomRecipeHTML(details) {
  console.log(details);
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

$("#randomRecipe").click(randomRecipe);
