import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderLoader();

    // loading data
    await model.loadRecipe(id);

    // rendering data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    // getting search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderLoader();

    // loading data
    await model.loadSearchResults(query);

    // rendering data
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = (goToPage) => {
  // rerender result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // rerender pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = (newServings) => {
  // update servings
  model.updateServings(newServings);

  // rerender content
  recipeView.render(model.state.recipe);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination); 
};
init();
