import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { fetch_board, update_board } from '../actions/game_actions';

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('')

const ALPHA_TOP = 'qwertyuiop'.split('')
const ALPHA_MIDDLE = 'asdfghjkl'.split('')
const ALPHA_BOTTOM = 'zxcvbnm'.split('')

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_char: '',
      guessed_char: '',
      winner_box: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuReturn = this.handleMenuReturn.bind(this);
    this.setTileId = this.setTileId.bind(this);
  }

  handleUpdate(event)  {
    event.preventDefault()
    console.log(this.props)
    console.log(event.target.name)


    this.props.update_board(this.props.board_id, this.state.selected_char, event.target.name)
    .then (data => console.log('UPDATE!!!!', data))
    // window.location.reload())
      // .then(() => this.props.fetchCurrentBoard(this.state.board_id))
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



  render(){
    const { selected_char, guessed_char } = this.state
    const { board_id, ciphertext, plaintext, userBoard } = this.props
    console.log(this.state)
    console.log('PROPS', this.props)

      // if (userBoard.join(' ') === plaintext) {
      //   this.setState({ winnerBox: true })
      // }

      return (
        <div>
          <div className='board-header'>
          <div className='menu-return-btn' onClick={this.handleMenuReturn}>
            <img id='left-arrow' src='http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/256/navigate-left-icon.png' alt='left_arrow'/>menu</div>
          </div>
          <div className='board-container'>
            <div className='game-board-container'>
              <div id='cipher-screen'> </div>
            { ciphertext.map((word, index) => ( <div key={`${word}-${index}`} className='word-container'>{ word.split('').map((char, idx) => (

                 ALPHA.includes(char) ? (
                  <div key={`${char}-${idx}`} className='tile-container' name={char} onClick={() => this.setState({ selected_char: char })}>
                  <div className={char} style={{ color: selected_char === {char} ? 'yellow' : 'none' }} name={char}>
                    <div className='guess-tile' name={char} style={{ backgroundColor: selected_char === {char} ? 'yellow' : 'none' }} >
                      { userBoard[index].split('')[idx] === '*' ? <div className='blank-input' name={char}></div> : userBoard[index].split('')[idx] }
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
      )


  }
}

const mapStateToProps = (state) => ({

  // game: state.game.currentGameData,
  // board_id: state.game.currentGameData.id,
  // ciphertext: state.game.currentCipherText.split(' '),
  // plaintext: state.game.currentPlaintext,
  // userBoard: state.game.currentUserBoard.split(' '),
});

const mapDispatchToProps = dispatch => ({
  fetch_board: (board_id) => dispatch(fetch_board(board_id)),
  update_board: (board_id, selected_char, guessed_char) => dispatch(update_board(board_id, selected_char, guessed_char)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Board)

// bindActionCreators: Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly. ==> `https://blog.benestudio.co/5-ways-to-connect-redux-actions-3f56af4009c8`
