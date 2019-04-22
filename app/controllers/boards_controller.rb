class BoardsController < ApplicationController


  def create
    data = Board.setup(params[:difficulty])
    @board = Board.create(data)
    playing!(@board)
    render "boards/show"
  end

  def update
    @board = Board.find_by(id: params[:id])
    updated_board = Board.assign_update(@board, params[:input], params[:guess])
    quote = Quote.find_by(id: @board.quote_id).content.downcase
      @current_board = @board.update( user_board: updated_board )
      render "boards/show"
  end

  def update_winner
    @board = Board.find_by(id: params[:id])
    updated_board = @board.update( status: "solved", player: params[:player] )
      render "boards/show"
  end

  def show
    @board = current_board
    # @quote = Quote.find_by(id: current_board[:quote_id])
    render json: @board
  end

  def destroy
    end_game!
    redirect_to root_url
  end
end
