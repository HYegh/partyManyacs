const initState = {
	data: [],
}

export default (state = initState, action) => {
   switch (action.type) {
    case 'GET_WISHLIST':
      return {
      	...state, 
      	data: action.payload
      }
    default:
      return state
  }
}