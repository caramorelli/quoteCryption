import { combineReducers } from 'redux';

import game from './game_reducer';
// import board from './board_reducer';

const rootReducer = combineReducers({
  game,
  // board,
});

export default rootReducer;
