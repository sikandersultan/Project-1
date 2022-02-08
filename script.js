// this is to make an array of drinks in local storage
var searchHistory = [];

// when the button on the website is pushed for a random cocktail, this function fires off
function randomCocktail() {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((details) => {
      randomCocktailHTML(details);
    })
    .catch((error) => console.log(error));
}

// some variables to call in ID's from the html page
var searched = document.getElementById("userInput");
var cocktailFormEl = document.getElementById("cocktailForm");
var submitBtn = document.getElementById("submitBtn");

// this actually used to be a form submit. Which was a major pain in the behind because 
// i totally forgot that how form submits worked and wacked my brain an entire afternoon 
// trying to make it work with the local storage search. Elliott the absolute god-level coder 
// genious pointed that out and fixed it in no time. I am forever in debt to her. Anyway this 
// is where we take the drink input from the user if he wants to search one up :)
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  var searchValue = searched.value;

  if (!searchValue) {
    errorMsg("We need a name for a drink plsssssss thank you :)");
  } else {
    userInputCocktail(searchValue);
    console.log(searchValue);
  }
});

// this function fires off when the search button on the user input area is clicked
function userInputCocktail(somethingIdk) {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${somethingIdk}`
  )
    .then((response) => response.json())
    .then((details) => {
      var { drinks } = details;
      if (drinks === null) {
        errorMsg("It seems the drink does not exist. Big Ooofs.");
      } else {
        userCocktailHTML(details);
        if (!searchHistory.includes(somethingIdk)) {
          searchHistory.push(somethingIdk);
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          loadSearchHistory();
        }
      }
    });
}

// this gets the api response for the input drink from the local storage
function storedDrinkSearch(somethingIdk) {
  var url =
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + somethingIdk;
  fetch(url)
    .then((response) => response.json())
    .then((details) => {
      console.log(details);
      userCocktailHTML(details);
    });
}

// this takes the api response from the random drinks functions and displays it on the html page
function randomCocktailHTML(details) {
  var { drinks } = details;
  var picture = document.getElementById("picture");
  picture.innerHTML = `<img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`;

  var cocktailName = document.getElementById("name");
  cocktailName.innerHTML = `<h4> ${drinks[0].strDrink} </h4>
    <p>Type of glass:</p><p>${drinks[0].strGlass}</p>`;

  var cocktailInformation = document.getElementById("ingridients");
  var information = "";
  var ingredientInfo = [];
  for (var i = 1; i <= 15; i++) {
    var measuringKey = "strMeasure" + i;
    var ingridientKey = "strIngredient" + i;
    var ingredient = drinks[0][ingridientKey];

    if (!ingredient) break;

    information = `<p>${drinks[0][measuringKey]} ${ingredient}</p>`;
    ingredientInfo.push(information);
  }
  cocktailInformation.innerHTML = ingredientInfo.join("");
}

// this takes the api response from the user input drink function as well as the local storage api response
// and displays it on the html page
function userCocktailHTML(details) {
  var { drinks } = details;
  var picture = document.getElementById("picture");
  picture.innerHTML = `<img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`;

  var cocktailName = document.getElementById("name");
  cocktailName.innerHTML = `<h4> ${drinks[0].strDrink} </h4>
    <p>Type of glass:</p><p>${drinks[0].strGlass}</p>`;

  var cocktailInformation = document.getElementById("ingridients");
  var information = "";
  var ingredientInfo = [];
  for (var i = 1; i <= 15; i++) {
    var measuringKey = "strMeasure" + i;
    var ingridientKey = "strIngredient" + i;
    var ingredient = drinks[0][ingridientKey];

    if (!ingredient) break;

    information = `<p>${drinks[0][measuringKey]} ${ingredient}</p>`;
    ingredientInfo.push(information);
  }
  cocktailInformation.innerHTML = ingredientInfo.join("");
}

// loads the local storage on the page
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
    var somethingIdk = btnEl.textContent.trim();
    console.log(btnEl);
    storedDrinkSearch(somethingIdk);
  }
}

// the error modal things
function errorMsg(msg) {
  $("#modalId").addClass("is-active");
  $("#modalMsg").html(msg);
}

// to close the error modal things
function close() {
  $("#modalId").removeClass("is-active");
}
$("#modalBtn").click(close);
$(document).on("click", invokePastSearch);

function byDrink() {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getnameInfo(data);
      console.log(data);
    });
}

function getnameInfo(data) {
  data.drinks.forEach((drinks) => {
    var allCategoryNode = document.querySelector("#allCategories");

    var categoryButton = document.createElement("button");
    categoryButton.innerHTML = drinks.strDrink;

    allCategoryNode.appendChild(categoryButton);
  });
}

function alcholicDrink() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getDrinkInfo(data);
    });

  function getDrinkInfo(data) {
    data.drinks.forEach((drinks) => {
      var allCategoryNode = document.querySelector("#allCategories");

      var categoryButton = document.createElement("button");
      categoryButton.innerHTML = drinks.strDrink;

      allCategoryNode.appendChild(categoryButton);
    });
  }
}

$(".Non-Alcoholic").on("click", byDrink);
$(".Alcoholic").on("click", alcholicDrink);
