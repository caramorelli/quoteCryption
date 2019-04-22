export const SET_GAME = 'SET_GAME';
export const RESUME_GAME = 'RESUME_GAME';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const END_CURRENT_GAME = 'END_CURRENT_GAME';
export const SET_QUOTE = 'SET_QUOTE';

import { setupGame, quitGame } from '../util/game';
import { updateUserBoard, fetchBoard, fetchQuote } from '../util/board';

 const setGame = board => ({
  type: SET_GAME,
  board
});

const setUpdate = board => ({
 type: UPDATE_BOARD,
 board
});

const setQuote = quote => ({
  type: SET_QUOTE,
  quote
})

export const endGame = board_id => ({
  type: END_CURRENT_GAME,
  board_id
})

export const initiate_game = difficulty => dispatch => {
  return setupGame(difficulty)
    .then( board => dispatch(setGame(board)) );
}

export const update_board = (id, input, guess) => dispatch => {
  return updateUserBoard(id, input, guess)
    .then( board => setUpdate(board) );
}

// export const set_winner = (id, winner, guess) => dispatch => {
//   return updateUserBoard(id, input, guess)
//     .then( board => setUpdate(board) );
// }

export const fetch_board = id => dispatch => {
  return fetchBoard(id)
    .then( board => dispatch(setGame(board)) )
}

export const fetch_quote = quote_id => dispatch => {
  return fetchQuote(quote_id)
    .then( quote => dispatch(setQuote(quote)) )
}

export const clear_board = currentBoard => dispatch => {
  return quiteGame(currentBoard)
    .then( board => dispatch(endGame()) );
}
