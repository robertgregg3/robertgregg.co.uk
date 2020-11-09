// random meal
// meal by ID
// meal by search

getRandomMeal();

// getMealById();
// getMealsBySearchTerm();

const meals             = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals')
const mealPopup         = document.getElementById('meal-popup');
const popupCloseBtn     = document.getElementById('close-popup');
const mealInfoEl        = document.getElementById('meal-info');
const searchTerm        = document.getElementById('search-term');
const searchBtn         = document.getElementById('search');
const changeRanMealBtn  = document.getElementById('change-ran-meal');

changeRanMealBtn.addEventListener('click', () => {
    window.location.reload();
});

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const responseData = await resp.json();
    const randomMeal = responseData.meals[0];

    addMeal(randomMeal);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const responseData = await resp.json();
    const meal = responseData.meals[0];

    return meal;
}

async function getMealsBySearchTerm(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const responseData = await resp.json();
    const meals = responseData.meals;

    return meals;
}

// add the random meal to the page
function addMeal(mealData) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div class="meal-header">
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="far fa-heart"></i>
            </button>
        </div>
    `;
    
    const btn = meal.querySelector('.meal .far');
    
    btn.addEventListener('click', () => {
        if (btn.classList.contains('fas')) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove('fas');
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add('fas');
        }
        fetchFavoriteMeals();
    });
    
    const mealHeader = meal.querySelector('.meal-header');
    mealHeader.addEventListener('click', () => {
        btn.classList.add('heart-popup');
        showMealInfo(mealData);
    });

    popupCloseBtn.addEventListener('click', () => {
        btn.classList.remove('heart-popup');
    });
    
    meals.appendChild(meal);
}

// add meals to local Storage
function addMealLS(mealId) {
    const mealIds = getMealsLS(); // the array of meals from LS
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

// remove meals from Local Storage
function removeMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds',
    JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

// retrieve meals from Local Storage
function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

// retrieves the meal ID's in local storage, as an array, with each meal ID as an element
async function fetchFavoriteMeals() {
    favoriteContainer.innerHTML = '';

    const mealIds = getMealsLS();

    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        meal = await getMealById(mealId);  // fetches the meal IDs from the api and store in meal. 
        addMealToFav(meal);
    }
}

// display the hearted meal to the favorite panel
function addMealToFav(mealData) {
    const favMeal = document.createElement('li');

   
    favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
    <span class="fav-meal">${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector('.clear');
   
    btn.addEventListener('click', () => {
        removeMealLS(mealData.idMeal);
        fetchFavoriteMeals();
    });
   
    favoriteContainer.appendChild(favMeal);
   
    const favPopup = favMeal.querySelector('img');
    favPopup.addEventListener('click', () => {
        showMealInfo(mealData);
    });
   
   
}

searchBtn.addEventListener('click', async () => {
    const search = searchTerm.value;
   
    const searchMeals = await getMealsBySearchTerm(search);
   
    meals.innerHTML = '';
   
    if(searchMeals)
    searchMeals.forEach(meal => {
        addMeal(meal);
    });
});

// Meal popup info
function showMealInfo(mealData) {
    mealInfoEl.innerHTML = '';
   
    const mealEl = document.createElement('div');
   
    const ingredients = [];

    for (let i=1; i<20; i++){
        if(mealData['strIngredient' + i]) {
            ingredients.push(
                `
                    ${mealData['strIngredient' + i]} /
                    ${mealData['strMeasure' + i]}
                `);
        } else{
            break;  
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>Ingredients for ${mealData.strMeal}</h3>
        <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});

fetchFavoriteMeals();

