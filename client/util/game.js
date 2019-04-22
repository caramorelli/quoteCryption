

export const setupGame = difficulty => {
  console.log('setting_up UTIL')
  return $.ajax({
    url: '/boards',
    method: 'POST',
    data: { difficulty }
  })
}

export const clearGame = id => {
  return $.ajax({
    url: `/boards/${id}`,
    method: 'DELETE'
  })
}

// post '/setup_board', to: 'boards#create'
// post '/update_board', to: 'boards#update'
// get '/current_board', to: 'boards#show'
// get '/clear_board', to: 'boards#destroy'
// post '/winner_status', to: 'boards#set_winner'
// ROUTES_REF:
// HTTP Verb	  |    Path	     |Controller#Action    |	Used for
// GET	/photos	photos#index	display a list of all photos
// GET	/photos/new	photos#new	return an HTML form for creating a new photo
// POST	/photos	photos#create	create a new photo
// GET	/photos/:id	photos#show	display a specific photo
// GET	/photos/:id/edit	photos#edit	return an HTML form for editing a photo
// PATCH/PUT	/photos/:id	photos#update	update a specific photo
// DELETE	/photos/:id	photos#destroy	delete a specific photo
