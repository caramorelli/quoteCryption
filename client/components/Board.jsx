import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { initiate_game, fetch_board, fetch_quote, update_board } from '../actions/game_actions';

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('')

const ALPHA_TOP = 'qwertyuiop'.split('')
const ALPHA_MIDDLE = 'asdfghjkl'.split('')
const ALPHA_BOTTOM = 'zxcvbnm'.split('')

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_char: '',
      guessed_char: ''
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuReturn = this.handleMenuReturn.bind(this);
    this.setTileId = this.setTileId.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  handleUpdate(event)  {
    event.preventDefault()
    this.props.update_board(this.props.board_id, this.state.selected_char, event.target.name)
      .then(() => this.props.fetch_board(this.props.game.board_id))
  }

  handleMenuReturn(event) {
    this.props.history.push('/menu', this.props)
  }

  handleClick(event) {
    console.log(event.target)
    console.log(event.name)
  }

  setTileId(event) {
    console.log(this.state.selected_char)
    if (event.target.name === this.state.selected_char) {
      return 'selected-usr-tile'
    } else {
      return 'usr-tile'
    }
  }

  handleNew(event) {
    this.props.initiate_game(this.props.game.difficulty_level)
    .then(data => this.props.fetch_board(data.id))
  }



  render(){
    const { selected_char, guessed_char, winner_box } = this.state
    const { board_id, plaintext, ciphertext, ciphertextArr, userBoard, userBoardArr } = this.props
    if (plaintext.toLowerCase() === userBoard.toLowerCase()) {
      this.handleWinner
    }
      return (
        <div>
          <div className='winner-box-container' style={{display: plaintext.toLowerCase() === userBoard.toLowerCase() ? 'block' : 'none'}}>
            <div className='winner-box'>
              <p id='quote'>{plaintext}</p>

              <h1>You Win!!!</h1>
                <div id='btn-grp'>
                  <button className='winner-btn' onClick={this.handleNew}>Play again?</button>
                  <button className='winner-btn' onClick={this.handleMenuReturn}>Return to Menu</button>
                </div>
              </div>
          </div>

          <div style={{display: plaintext.toLowerCase() === userBoard.toLowerCase() ? 'none' : 'block'}}>
            <div className='board-header'>
              <div className='menu-return-btn' onClick={this.handleMenuReturn}>
                <img id='left-arrow' src='http://www.draxexecutive.com/Images/navigation/Arrow_Right.png' alt='left_arrow'/>
                <h3>menu</h3>
              </div>
            </div>

            <div className='board-container'>
              <div className='game-board-container'>
              { ciphertextArr.map((word, index) => ( <div key={`${word}-${index}`} className='word-container'>{ word.split('').map((char, idx) => (

                   ALPHA.includes(char) ? (
                    <div key={`${char}-${idx}`} className='tile-container' name={char} onClick={() => this.setState({ selected_char: char })}>
                    <div className={char} style={{ color: selected_char === {char} ? 'yellow' : 'none' }} name={char}>
                      <div className='guess-tile' name={char} id={ selected_char === char ? 'selected' : 'not-selected'} >
                        { userBoardArr[index].split('')[idx] === '*' ? <div className='blank-input' name={char}></div> : userBoardArr[index].split('')[idx] }
                      </div>
                    </div>
                    <div style={{ backgroundColor: selected_char === {char} ? 'yellow' : 'none' }} className='ciphertext-tile' name={char} onClick={this.handleClick} >
                         {char}
                       </div>

                      </div>
                  ) : (
                    <div key={`${char}-${idx}`} className='punctuation'>>
                    </div>
                  )

              )) }
              </div>
            )) }

              </div>
            </div>

            <div className='keyboard-container'>
              <div className='keys-container'  >
                <div className='top-row' onClick={ this.handleUpdate } >
                  { ALPHA_TOP.map( char => <button key={char} className='key' name={char} onClick={() => this.setState({ guessed_char: char })}>{char}</button> ) }
                </div>
                <div className='middle-row' onClick={ this.handleUpdate }>
                  { ALPHA_MIDDLE.map( char => <button key={char} className='key' name={char} onClick={() => this.setState({ guessed_char: char })}>{char}</button> ) }
                </div>
                <div className='bottom-row'>
                  { ALPHA_BOTTOM.map( char => <button key={char} className='key' name={char} onClick={() => this.setState({ guessed_char: char })} onClick={ this.handleUpdate }>{char}</button> ) }
                </div>
              </div>
            </div>
          </div>

        </div>
      )


  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  board_id: state.game.board_id,
  plaintext: state.game.plaintext,
  ciphertext: state.game.ciphertext,
  ciphertextArr: state.game.ciphertext.split(' '),
  userBoard: state.game.userBoard,
  userBoardArr: state.game.userBoard.split(' ')
});

const mapDispatchToProps = dispatch => ({
  initiate_game: (difficulty) => dispatch(initiate_game(difficulty)),
  fetch_board: (board_id) => dispatch(fetch_board(board_id)),
  fetch_quote: (quote_id) => dispatch(fetch_quote(quote_id)),
  update_board: (board_id, selected_char, guessed_char) => dispatch(update_board(board_id, selected_char, guessed_char)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Board)

// bindActionCreators: Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly. ==> `https://blog.benestudio.co/5-ways-to-connect-redux-actions-3f56af4009c8`
