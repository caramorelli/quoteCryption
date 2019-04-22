import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/store';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
    let store;
    console.log(window.currentBoard)
    if (window.currentBoard) {
      const preloadedState = {
        game: {
          difficulty_level: window.currentBoard.difficulty_level,
          available_hints: window.currentBoard.available_hints,
          board_id: window.currentBoard.board_id,
          plaintext: window.currentBoard.currentPlaintext,
          author: window.currentBoard.author,
          quoteDetails: window.currentBoard.quoteDetails,
          ciphertext: window.currentBoard.currentCipherText,
          userBoard: window.currentBoard.currentUserBoard,
          quote_id: window.currentBoard.quote_id,
           }
      }
      store = configureStore(preloadedState);
      delete window.currentBoard;
    } else {
      store = configureStore();
    }


    ReactDOM.render((
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    ), document.getElementById('root'));
  })

  // window.currentBoard = {
  //   "board_id": <%= current_board.id %>,
  //   "available_hints": <%= current_board.available_hints %>,
  //   "currentGameData": <%= current_board %>,
  //   "available_hints": "<%= current_board.available_hints %>",
  //   "difficulty_level": "<%= current_board.difficulty %>",
  //   "currentUserBoard": "<%= current_board.user_board %>",
  //   "currentPlaintext": "<%= current_quote_data.content %>",
  //   "currentCipherText": "<%= current_board.ciphertext %>",,
  //   "quote_id": <%= current_board.quote_id %>
  //   };
