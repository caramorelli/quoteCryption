import { SET_GAME, SET_QUOTE, UPDATE_BOARD, END_CURRENT_GAME } from '../actions/game_actions';
import merge from 'lodash/merge';

const defaultFilters = {
  currentGameData: null,
  currentQuoteData: null,
  available_hints: null,
  difficulty_level: null,
  userBoard: null,
  plaintext: null,
  author: null,
  quoteDetails: null,
  ciphertext: null,
  board_id: null,
  quote_id: null
};

const gameReducer = (state = {}, action) => {
  console.log(state)
  Object.freeze(state);
  switch(action.type) {
    case SET_GAME:
      const new_set_state = { currentGameData: action.board, available_hints: action.board.available_hints, userBoard: action.board.user_board, ciphertext: action.board.ciphertext, board_id: action.board.id, quote_id: action.board.quote_id };
      return merge({}, state, new_set_state);
    case SET_QUOTE:
      const new_quote_state = { currentQuoteData: action.quote, plaintext: action.quote.content };
      return merge({}, state, new_quote_state);
    case UPDATE_BOARD:
      const update_state = ({ currentGameData: action.board,  userBoard: action.board.userBoard })
      return merge({}, state,update_state);
    case END_CURRENT_GAME:
      return {};
    default:
      return state;
  }
};

export default gameReducer;

// The Object.freeze() method freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, prevents changing the enumerability, configurability, or writability of existing properties, and prevents the values of existing properties from being changed. In addition, freezing an object also prevents its prototype from being changed. freeze() returns the same object that was passed in.
