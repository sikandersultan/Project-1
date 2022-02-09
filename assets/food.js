var searchHistory = [];

//generate random recipe
function randomRecipe() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((Response) => Response.json())
    .then((details) => {
      displayRecipeHTML(details);
    });
}

//display the recipe on the page
function displayRecipeHTML(details) {
  $(".search-result").css("background-color", "rgb(255, 255, 255, 0.7)");
  $("footer").css("position", "relative");
  var picture = $("#picture");
  var foodPic =
    "<img class='mealThumb' src=" + details.meals[0].strMealThumb + ">";
  picture.html(foodPic);

  var mealName = $("#name");
  mealName.html(`<h1> ${details.meals[0].strMeal} </h1>
  <h3>Category:</h3><p>${details.meals[0].strArea}</p>`);

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
  mealInfo.html(`<h3>Ingredients:</h3><p>${ingredientInfo.join("")}</p>`);

  var instructions = $("#instructions");
  instructions.html(
    `<h3>Instructions:</h3><p class="instructions">${details.meals[0].strInstructions}</p>`
  );
}

// search recipe based on keyword and store the search history in local storage
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

//display error when user input is invalid
function errorMsg(msg) {
  $("#modalId").addClass("is-active");
  $("#modalMsg").html(msg);
}

//close the error message
function close() {
  $("#modalId").removeClass("is-active");
}

//display search history
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

//display recipe when user clicks on the search history
function invokePastSearch(event) {
  var btnEl = event.target;
  if (event.target.matches(".history")) {
    var keyWord = btnEl.textContent.trim();
    searchRecipe(keyWord);
  }
}

//respond when user clicks on buttons
$("#randomRecipe").click(randomRecipe);
$("#searchRecipe").click(function () {
  var keyWord = $("#userInput").val().trim();
  searchRecipe(keyWord);
});
$("#modalBtn").click(close);
$(document).on("click", invokePastSearch);

//function will load all categories from api
function categoryList() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getFoodInfo(data);
      console.log(data);
    });
}

//this function first loops through all categories then
//creates a button for each categoriy and appends it to
//the allCategories html div

//also the function will register an on click listener to each button created and trigger a modal open when any button is clicked

var modal = document.querySelector(".modal");
var extra = document.querySelector("#extra-help");

function getFoodInfo(data) {
  data.categories.forEach((category) => {
    var allCategoryNode = document.querySelector("#allCategories");

    var categoryButton = document.createElement("button");
    categoryButton.innerHTML = category.strCategory;

    categoryButton.addEventListener("click", () => {
      modal.classList.add("is-active");
      //change modal text to category description

      document.querySelector("#modalText").innerHTML =
        category.strCategoryDescription;

      $("#model1").modal("show");
    });

    allCategoryNode.appendChild(categoryButton);
  });
}

$("#to-top").on("click", categoryList);
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var date = new Date().toLocaleDateString("en-GB", options);
document.getElementById("date").innerHTML = date;

function help() {
  extra.classList.add("is-active");
}

$("#to-top").on("click", help);

$(".btn").click(function () {
  extra.classList.remove("is-active");
});
