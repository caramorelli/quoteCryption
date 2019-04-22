class Board < ApplicationRecord
  # validates :session_token, presence: true
  # This allows us to run methods before running validations
  # In this case, we need to have a session_token when a user is first created
  after_initialize :ensure_session_token

  belongs_to :quote

  ALPHA = ('a'..'z').to_a

  def self.setup(difficulty)
    new_board = { cryptobet: ALPHA.shuffle.join(''), difficulty: difficulty, available_hints: Board.given_hints(difficulty), session_token: Board.generate_token() }

    random_quote = Quote.all.sample
    new_board[:quote_id] = random_quote.id
    plaintext = random_quote.content.downcase
    print plaintext
    puts ''

    new_board[:ciphertext] = Board.encrypt(plaintext, new_board[:cryptobet])

    plain_alphas = Board.alpha_chars(plaintext)

    new_board[:given_letters] = plain_alphas.pop(new_board[:available_hints]).join('')
    print plain_alphas

    usr_board = ''
    print new_board[:given_letters]
    puts ''
    plaintext.chars.map do |char|
      # unless plain_alphas.include?(char)
        if new_board[:given_letters].include?(char) || !ALPHA.include?(char)
          usr_board << char
        else
          usr_board << '*'
        end
    end
    new_board[:user_board] = usr_board

    print new_board


    # plain_alphas.uniq.sample(new_board[:available_hints]).join('')

    # new_board[:user_board] = plaintext.gsub(/["#{plain_alphas.join('')}"]/, "*")


    return new_board
  end

  def self.assign_update(board, input, guess)
    new_board = ''
    0.upto(board.ciphertext.length - 1) do | idx |
      if board.ciphertext[idx] == input
        new_board << guess
      else
        new_board << board.user_board[idx]
      end
    end
    return new_board
  end

  def self.encrypt(plaintext, new_alpha)
    cipher = ''
    plaintext.chars.map do |char|
      unless ALPHA.include?(char)
         cipher << char
      else
        cipher << new_alpha[ALPHA.index(char)]
      end
    end
    return cipher
  end


  def self.alpha_chars(str)
    return str.downcase.chars.keep_if { |char| char =~ /[[:alpha:]]/ }.uniq
  end

  def self.given_hints(difficulty)
    case difficulty
    when 'easy'
      return 5
    when 'medium'
      return 3
    when 'hard'
      return 1
    else
      return 0
    end
  end

  def self.generate_token
    return SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    # self.session_token ||= SecureRandom.urlsafe_base64
    self.session_token ||= generate_token()
  end

end
