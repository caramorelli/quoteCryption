import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { initiate_game } from '../actions/game_actions';

class GameMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'main',
      difficulty: 'medium',
      levMenuVisible: false
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handleResume = this.handleResume.bind(this)
  }

  handlePlay(event)  {
    event.preventDefault()
    this.props.initiate_game(this.state.difficulty)
    .then(data => this.props.history.push('/board'))

  }

  handleResume(event) {
    event.preventDefault()
    this.props.history.push(`/board`, this.props)
  }


  render(){
    console.log(this.props)
    const { currentTab, difficulty, levMenuVisible } = this.state
    return (
      <div>
        <div className='menu-container'>
          <div className='menu-header'>
            <div id='header-left'></div><h1 id='menu-title'>Crypto Quotes</h1><div id='header-right'></div>
          </div>

          <div id='dropdown-container'>

            <div id='lev-opts-container' style={{display: levMenuVisible ? 'block' : 'none'}}>
              <div id='grid-container'>
                <div className='grid-item' id='row1'>
                  <div className='lev-opts-btn' id='easy' onClick={() => this.setState({ difficulty: 'easy', levMenuVisible: false })}><h3 className='btn-label'>Easy</h3></div>
                </div>
                <div className='grid-item' id='row2'>
                  <div className='lev-opts-btn' id='medium' onClick={() => this.setState({ difficulty: 'medium', levMenuVisible: false })}><h3 className='btn-label'>Medium</h3></div>
                </div>
                <div className='grid-item' id='row3'>
                  <div className='lev-opts-btn' id='hard' onClick={() => this.setState({ difficulty: 'hard', levMenuVisible: false })}><h3 className='btn-label'>Hard</h3></div>
                </div>
                <div className='grid-item' id='row4'>
                  <div className='lev-opts-btn' id='expert' onClick={() => this.setState({ difficulty: 'expert', levMenuVisible: false })}><h3 className='btn-label'>Expert</h3></div>
                </div>

              </div>
            </div>

            <div id='btn-container' onClick={ () => this.setState({ levMenuVisible: !levMenuVisible }) }>
                <h3 id='main-label'>Select Difficuly</h3>

            </div>

            <div id='col-right'>
              <div id='lev-row'>
                <h4 id='lev-label'>{ difficulty }</h4>
              </div>

              <div id='play-row'>
                <div id='play-btn' onClick={this.handlePlay}>
                  <h4 id='play-label'>Play</h4>
                </div>
                <div id='resume-btn' style={{display: this.props.gameData.board_id ? 'block' : 'none' }}>
                  <h4 id='resume-label' onClick={this.handleResume}>Resume</h4>
                </div>
              </div>

            </div>

          </div>




        </div>
      </div>
    )
  }
}
// currentGameData: null,
// boardVisible: false,
// available_hints: null,
// difficulty_level: null,
// currentGame: false,
// currentUserBoard: null,
// currentPlaintext: null,
// currentCipherText: null,
// board_id: null,
// quote_id: null

const mapStateToProps = (state) => ({
  gameData: state.game,
});

const mapDispatchToProps = dispatch => ({
  initiate_game: difficulty => dispatch(initiate_game(difficulty)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameMenu))

// bindActionCreators: Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly. ==> `https://blog.benestudio.co/5-ways-to-connect-redux-actions-3f56af4009c8`

//
// <div id='left-menu'>
//   <div id='lev-opts'>
//     <button id='main-lev-selector' onClick={() => this.setState({ levMenuVisible: !levMenuVisible })}>{difficulty}</button>
//     <div  style={{display: levMenuVisible ? 'block' : 'none'}}>
//       <button onClick={() => this.setState({ difficulty: 'easy', levMenuVisible: false })}>Easy</button>
//       <button onClick={() => this.setState({ difficulty: 'medium', levMenuVisible: false })}>Medium</button>
//       <button onClick={() => this.setState({ difficulty: 'hard', levMenuVisible: false })}>Hard</button>
//       <button onClick={() => this.setState({ difficulty: 'expert', levMenuVisible: false })}>Expert</button>
//     </div>
//   </div>
// </div>
//
//
// <div id='play-opts'>
//   <button id='play-btn' onClick={this.handlePlay}>Play</button>
//   {console.log(this.props)}
// </div>
