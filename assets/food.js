var searchHistory = [];

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

function searchRecipe(keyWord) {
  if (keyWord !== "") {
    var queryURL =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyWord;

    fetch(queryURL)
      .then((Response) => Response.json())
      .then((details) => {
        if (details.meals === null) {
          errorMsg("Meal not found._. Please try something else!");
        } else {
          displayRecipeHTML(details);
          if (!searchHistory.includes(keyWord)) {
            searchHistory.push(keyWord);
            localStorage.setItem(
              "searchHistory",
              JSON.stringify(searchHistory)
            );
            loadSearchHistory();
          }
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
function loadSearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  var container = $("#searchHistory");
  container.empty();
  if (searchHistory !== null) {
    for (var i = 0; i < searchHistory.length; i++) {
      var pEl = $("<p>");
      pEl.attr("class", "control");
      var btnEl = $("<button>");
      btnEl.attr("class", "button is-link history");
      btnEl.html(searchHistory[i]);
      pEl.append(btnEl);
      container.append(pEl);
    }
  }
}
function invokePastSearch(event) {
  var btnEl = event.target;
  if (event.target.matches(".history")) {
    var keyWord = btnEl.textContent.trim();
    searchRecipe(keyWord);
  }
}

$("#randomRecipe").click(randomRecipe);
$("#searchRecipe").click(function () {
  var keyWord = $("#userInput").val().trim();
  searchRecipe(keyWord);
});
$("#modalBtn").click(close);
$(document).on("click", invokePastSearch);
