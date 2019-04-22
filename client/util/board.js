
export const updateUserBoard = (id, input, guess) => $.ajax({
  url: `/boards/${id}`,
  method: 'PATCH',
  data: { id, input, guess }
})

export const fetchBoard = (id) => $.ajax({
  url: `/boards/${id}`,
  method: 'GET'
})

export const fetchQuote = (quote_id) => $.ajax({
  url: `/quotes/${quote_id}`,
  method: 'GET'
})
