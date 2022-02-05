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
       alert("The user did not enter a cocktail to search for")
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
            console.log("noooooooo")
            // we got stuff back good 
        } else {
            // something probably went wrong
            console.log("yayyyyyyy")
            userCocktailHTML(details)
        }
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

var btn = document.querySelector('#showModal');
var modalDlg = document.querySelector('#image-modal');
var imageModalCloseBtn = document.querySelector('#image-modal-close');
btn.addEventListener('click', function(){
  modalDlg.classList.add('is-active');
});

imageModalCloseBtn.addEventListener('click', function(){
  modalDlg.classList.remove('is-active');
});
