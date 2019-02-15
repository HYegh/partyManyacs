const initState = {
	party: [],
	currentParty: [],
	currentWishes: [],
	currentGuests: [],
	searchedUsers: [],
	searchLoad: false
}

export default (state = initState, action) => {
	switch (action.type) {
    case 'GET_PARTIES':
      return {
      	...state, 
      	party: action.payload
      }
    case 'GET_CURRENT_PARTY':
      return {
      	...state, 
      	currentParty: action.payload
      }
    case 'REMOVE_CURRENT_PARTY':
      return {
      	...state, 
      	currentParty: [],
      	currentWishes: [],
      	currentGuests: [],
      	searchedUsers: []
      }
    case 'GET_WISHES_IN_CURRENT_PARTY':
      return {
      	...state, 
      	currentWishes: action.payload
      }
    case 'GET_GUESTS_IN_CURRENT_PARTY':
      return {
      	...state, 
      	currentGuests: action.payload
      }
    case 'GET_SEARCH_USERS':
      return {
      	...state, 
      	searchedUsers: action.payload
      }
    case 'REMOVE_SEARCH_USERS':
      return {
      	...state, 
      	searchedUsers: []
      }
    case 'ACTIVATE_SEARH_LOAD':
      return {
      	...state, 
      	searchLoad: !state.searchLoad
      }
    default:
      return state
  }
}