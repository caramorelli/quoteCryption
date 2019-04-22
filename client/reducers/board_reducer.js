// import { CURRENT_GAME, SET_UPDATE } from '../actions/board_actions';
// import merge from 'lodash/merge';
//
// const defaultBoardFilters = {
//   plaintext: null,
//   ciphertext: false,
//   userBoard: null,
//   availableHints: null
// };
//
// const boardReducer = (state = defaultBoardFilters, action) => {
//   Object.freeze(state);
//   switch(action.type) {
//     // case CURRENT_QUOTE:
//     //   return { ...state, plaintext: action.board.content }
//     case CURRENT_GAME:
//       return { ...state, ciphertext: action.currentBoard.ciphertext, userBoard: action.currentBoard.userBoard, availableHints: action.currentBoard.available_hints}
//     case SET_UPDATE:
//       return { ...state, userBoard: action.currentBoard.userBoard }
//     default:
//       return state;
//   }
// };
//
// export default boardReducer;
