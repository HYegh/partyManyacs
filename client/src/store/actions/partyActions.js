import {
					getPartyToDb, 
					addPartyToDb, 
					getCurrentParty, 
					editCurrentParty, 
					deleteCurrentParty,
					addWishesInCurrentParty,
					getWishesInCurrentParty,
					addGuestsInCurrentParty,
					getGuestsInCurrentParty,
					searchUsers,
					removeCurWishToDb
				} from '../../requests/party'

export const getParties = (data) => ({type: 'GET_PARTIES', payload: data})
export const getSearchUsers = (data) => ({type: 'GET_SEARCH_USERS', payload: data})
export const removeSearchUsers = () => ({type: 'REMOVE_SEARCH_USERS'})
export const dispatchCurrentParty = (data) => ({type: 'GET_CURRENT_PARTY', payload: data})
export const removeCurrentParty = () => ({type: 'REMOVE_CURRENT_PARTY'})
export const getWishesCurParty = (data) => ({type: 'GET_WISHES_IN_CURRENT_PARTY', payload: data})
export const getGuestsCurParty = (data) => ({type: 'GET_GUESTS_IN_CURRENT_PARTY', payload: data})
export const request = () => ({type: 'DATA_REQUEST'})
export const searchRequest = () => ({type: 'ACTIVATE_SEARH_LOAD'})

export const fetchParties = (user_id) => {
  return (dispatch) => {
    getPartyToDb(user_id)
      .then(data => dispatch(getParties(data)))
  }
}



export const addingParty = (obj, user_id) => {
	return (dispatch) => {
		dispatch(request())
		addPartyToDb(obj)
			.then((data) => dispatch(fetchParties(user_id)) )
			.then(data => dispatch(request()))
  }
}

export const dispatchingCurrentParty = (id) => {
	return (dispatch) => {
		dispatch(request())
		getCurrentParty(id)
			.then( (data) => dispatch(dispatchCurrentParty(data)) )
			.then(data => dispatch(request()))
  }
}

export const editingCurrentParty = (obj, user_id) => {
	return (dispatch) => {
		dispatch(request())
		editCurrentParty(obj)
			.then((data) => dispatch(fetchParties(user_id)) )
			.then(data => dispatch(request()))
  }
}

export const deletingCurrentParty = (id, user_id) => {
	return (dispatch) => {
		dispatch(request())
		deleteCurrentParty(id)
			.then((data) => dispatch(fetchParties(user_id)) )
			.then(data => dispatch(request()))
  }
}

export const fetchPartiesWishes = (party_id) => {
  return (dispatch) => {
    getWishesInCurrentParty(party_id)
      .then(data => {
      	console.log(data)
      	dispatch(getWishesCurParty(data))
      })
  }
}

export const addingWishes = (party_id, wishes) => {
	return (dispatch) => {
		dispatch(request())
		addWishesInCurrentParty(party_id, wishes)
			.then((data) => getWishesInCurrentParty(party_id) )
			.then(data => dispatch(getWishesCurParty(data)))
			.then(data => dispatch(request()))
  }
}

export const removeCurWish = (wish_id, party_id) => {
	return (dispatch) => {
		dispatch(request())
		removeCurWishToDb(wish_id, party_id)
			.then((data) => getWishesInCurrentParty(party_id) )
			.then(data => dispatch(getWishesCurParty(data)))
			.then(data => dispatch(request()))
  }
}

export const fetchPartiesGuests = (party_id) => {
  return (dispatch) => {
    getGuestsInCurrentParty(party_id)
      .then(data => {
      	console.log(data)
      	dispatch(getGuestsCurParty(data))
      })
  }
}

export const addingGuests = (party_id, wishes) => {
	return (dispatch) => {
		dispatch(request())
		addGuestsInCurrentParty(party_id, wishes)
			.then((data) => getGuestsInCurrentParty(party_id) )
			.then(data => dispatch(getGuestsCurParty(data)))
			.then(data => dispatch(request()))
			.then(data => dispatch(removeSearchUsers()))
  }
}


export const serchingUsers = (name) => {
	if(name===""){
		return (dispatch) => {
			dispatch(removeSearchUsers())
		} 
	}
	return (dispatch) => {
		dispatch(searchRequest())
		searchUsers(name)
			.then((data) => dispatch(getSearchUsers(data)) )
			.then(data => dispatch(searchRequest()))
  }
}
