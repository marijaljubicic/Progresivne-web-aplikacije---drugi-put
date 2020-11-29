import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//console.log(icons);
//const { title } = require("process");

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const renderSpinner = function (parentEl) {
  const markup = '<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  ';
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    // Loading recipe
    renderSpinner(recipeContainer);

    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc96e'
      );
      const data =await res.json();

      if(!res.ok) throw new Error('${data.message} (${res.status})');

      //console.log(res, data);

      let {recipe} = data.data;
      recipe = {
        id: recipe.id,
        title: recipe.title,
        publusher: recipe.publusher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
      console.log(recipe);


      const markup ='
              <figure>
                <img src="${recipe.image_url}" alt="${recipe.title}" class="recipeImg"/>
                <h1>
                    <span>${recipe.title}</span> 
                </h1>
               </figure>
          <div class="recipeDetails">
              <div class="recipeInfo">
                  <svg class="recipeInfo-icon">
                      <use href="${icons}#icon-clock"></use>
                  </svg>
                  <span class="recipeInfo-data recipeInfo-data--minutes">${recipe.cooking_time}</span>
                  <span class="recipeInfo-text">min</span>
              </div>
              <div class="recipeInfo">
                  <svg class="recipeInfo-icon">
                      <use href="${icons}#icon-users"></use>
                  </svg>
                  <span class="recipeInfo-data recipeInfo-data--people">${recipe.servings}</span>
                  <div class="recipeInfo-buttons">
                      <button class="btn--tiny btn--increase-servings">
                          <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                          </svg>
                      </button>
                      <button class="btn--tiny btn--increase-servings">
                          <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                          </svg>
                      </button>
                  </div>
              </div>
              <div class="recipeUser-generated">
                  <svg>
                      <use href="${icons}#icon-user"></use>
                  </svg>
              </div>
              <button class="btn--round">
                  <svg>
                    <use href="${icons}#icon-bookmark-fill"></use>
                  </svg>
              </button>
          
              <div class="recipeIngredients">
                  <h2 class="heading--2">Recipe ingredients</h2>
                  <ul class="recipeIngredient-list">
                    ${recipe.ingredients.map(ing =>{return'
                      <li class="recipeIngredient">
                          <svg class="recipeIcon">
                              <use href="${icons}#icon-check"></use>
                          </svg>
                          <div class="recipeQuantity">${ing.quantity}</div>
                          <div class="recipeDescription">
                              <span class="recipeUnit">${ing.unit}</span>
                              ${ing.description}
                          </div>
                      </li>
                      ';
                    }).join('')};
              </div>
              <div class="recipeDirections">
                  <h2 class="heading--2">How to cook it</h2>
                  <p class="recipeDirections-text">This recipe was carefully designed and tested by
                      <span class="recipePublisher">${recipe.publusher}</span>. Please check out
                      directions at their website.
                  </p>
                  <a class="btn--small recipeBTN" href="${recipe.source_url}" target="_blank"></a>
                  <span>Directions</span>
                  <svg class="searchIcon">
                      <use href="${icons}#icon-arrow-right"></use>
                  </svg>
              </div>
          </div>
          ';

      recipeContainer.innerHTML='';
      recipeContainer.insertAdjacentHTML('afterbegin', markup);
 
    }
     catch(err) {
        alert(err);
      }
    };
    

    showRecipe();
