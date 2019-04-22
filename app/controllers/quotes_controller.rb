class QuotesController < ApplicationController

  def show
    # @board = Board.find_by(id: params[:id])
    # @quote = Quote.find_by(id: @board.quote_id)
    @quote = Quote.find_by(id: params[:quote_id])
    render "quotes/show"
  end

end
