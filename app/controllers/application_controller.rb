class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  helper_method :current_board, :current_quote_data, :in_play?, :playing!, :end_game!

  # private

  def playing!(board)
  # set the session_token for the connection to be the
    # print board.session_token
    # puts ''
    session[:session_token] = board.session_token
  end

  def end_game!
  # # Scramble the current_board's session_token
  # current_board.reset_session_token!

  # Reset the session
  session[:session_token] = nil
  end


  def current_board
    print session[:session_token]
    puts '___________________________'

    # if session_token: session[:session_token]
    if session[:session_token] === nil
       recent = Board.all.last
      @current_board = recent unless recent.status == 'solved'
    else
      @current_board ||= Board.find_by(session_token: session[:session_token])
    end
  end

  def current_quote_data
    return nil unless current_board
    Quote.find_by(id: current_board.quote_id)
  end

  def in_play?
  !!current_board
  end

  # def redirect_if_playing
  # redirect_to current_board if in_play?
  # end
end
