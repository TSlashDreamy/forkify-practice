import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

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
    console.log(model.state.search.result);
    resultsView.render(model.state.search.result);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
