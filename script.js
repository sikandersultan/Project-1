function randomCocktail() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((details) => {
        randomCocktailHTML(details)
    })
    .catch((error) => console.log(error))
}

function randomCocktailHTML(details) {
    var { drinks } = details
    var picture = document.getElementById('picture')
    cocktailPicture = `<img class="drinkThumb" src= "${drinks[0].strDrinkThumb}">`
    picture.innerHTML = cocktailPicture

    var cocktailName = document.getElementById('name')
    cocktailName.innerHTML = `<h4> ${drinks[0].strDrink} </h4>
    <p>Type of glass:</p><p>${drinks[0].strGlass}</p>
    </br>`
}