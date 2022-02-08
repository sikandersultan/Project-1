var searchHistory = []

function randomCocktail() {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((details) => {
        randomCocktailHTML(details)
    })
    .catch((error) => console.log(error))
}

var searched = document.getElementById('userInput')
var cocktailFormEl = document.getElementById('cocktailForm')

cocktailFormEl.addEventListener("submit", (event) => {
    event.preventDefault()

    var searchValue = searched.value
   
    if (!searchValue) {
        errorMsg("We need a name for a drink plsssssss thank you :)")
    } else {
        userInputCocktail(searchValue)
        console.log(searchValue)
    }
})


function userInputCocktail (somethingIdk) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${somethingIdk}`)
    .then((response) => response.json())
    .then((details) => {
        var { drinks }= details
        if (drinks === null) {
            errorMsg("It seems the drink does not exist. Big Ooofs.") 
        } else {
            userCocktailHTML(details)
            if (!searchHistory.includes(somethingIdk)) {
                searchHistory.push(somethingIdk)
                localStorage.setItem("searchHistory" , JSON.stringify(searchHistory))
                loadSearchHistory()
            }
        }
    })
}

function storedDrinkSearch (somethingIdk) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${somethingIdk}`)
    .then((response) => response.json())
    .then((details) => {
            userCocktailHTML(details)
    })
}


function randomCocktailHTML(details) {
    var { drinks } = details
    var picture = document.getElementById('picture')
    picture.innerHTML = `<img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`

    var cocktailName = document.getElementById('name')
    cocktailName.innerHTML = `<h4> ${drinks[0].strDrink} </h4>
    <p>Type of glass:</p><p>${drinks[0].strGlass}</p>`


    var cocktailInformation = document.getElementById('ingridients')
    var information = ''
    var ingredientInfo = []
    for (var i = 1; i <=15; i++) {
        var measuringKey = 'strMeasure' + i
        var ingridientKey = 'strIngredient' + i
        var ingredient = drinks[0][ingridientKey]

        if (!ingredient) break;

        information = `<p>${drinks[0][measuringKey]} ${ingredient}</p>`
        ingredientInfo.push(information)
    }
    cocktailInformation.innerHTML = ingredientInfo.join('')
}

function userCocktailHTML(details) {
    var { drinks } = details
    var picture = document.getElementById('picture')
    picture.innerHTML = `<img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`
    
    var cocktailName = document.getElementById('name')
    cocktailName.innerHTML = `<h4> ${drinks[0].strDrink} </h4>
    <p>Type of glass:</p><p>${drinks[0].strGlass}</p>`

    var cocktailInformation = document.getElementById('ingridients')
    var information = ''
    var ingredientInfo = []
    for (var i = 1; i <=15; i++) {
        var measuringKey = 'strMeasure' + i
        var ingridientKey = 'strIngredient' + i
        var ingredient = drinks[0][ingridientKey]

        if (!ingredient) break;

        information = `<p>${drinks[0][measuringKey]} ${ingredient}</p>`
        ingredientInfo.push(information)
    }
    cocktailInformation.innerHTML = ingredientInfo.join('')
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
      var somethingIdk = btnEl.textContent.trim();
      storedDrinkSearch(somethingIdk);
    }
}
  
function errorMsg(msg) {
  $("#modalId").addClass("is-active");
  $("#modalMsg").html(msg);
}
function close() {
  $("#modalId").removeClass("is-active");
}
$("#modalBtn").click(close);
$(document).on("click", invokePastSearch);
