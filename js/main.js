//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch);
drinkContainer = document.querySelector('.container__drinks');

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function getDrink(e) {
  document.querySelector('.cocktail__ingredients').innerHTML = '';
  const choice = e.target.closest('div').dataset.id;
  fetch(url + choice)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const { drinks } = data;
      const drink = drinks[0];
      document.querySelector('.cocktail__name').innerText = drink.strDrink;

      document.querySelector('.cocktail__img').src = drink.strDrinkThumb;

      const ingredients = [];

      for (let i = 1; i < 10; i++) {
        let prop = 'strIngredient' + i;
        if (drink[prop] !== null) {
          ingredients.push(drink[prop]);
        } else {
          break;
        }
      }

      ingredients.forEach((ing, i) => {
        document.querySelector('.cocktail__ingredients').insertAdjacentHTML(
          'beforeend',
          `
          <p>${ing}</p>
          `
        );
      });

      document.querySelector('.cocktail__instructions').innerText =
        drink.strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getFetch() {
  const choice = document.querySelector('input').value;

  fetch(url + choice)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const { drinks } = data;
      drinks.forEach((drink) => {
        drinkContainer.insertAdjacentHTML(
          'beforeend',
          `
          <div class="drink" data-id="${drink.strDrink}">
            <img src="${drink.strDrinkThumb}" alt="" />
            <p>${drink.strDrink}</p>
          </div>
        `
        );
      });

      document
        .querySelectorAll('.drink')
        .forEach((el) => el.addEventListener('click', getDrink));
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
