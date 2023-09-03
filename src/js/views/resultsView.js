import { View } from './View';
import previewView from './previewView';

export class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'We could not find results for your query. Please, try another one.';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
