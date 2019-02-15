const initState = {
	invitedParties: [],
  invCurParty: [],
  invCurPartyWishes: [],
  inviterInvCurParty: []
}

export default (state = initState, action) => {
	switch (action.type) {
    case 'GET_INVITED_PARTIES':
      return {
      	...state, 
      	invitedParties: action.payload
      }
    case 'GET_INV_CURRENT_PARTY':
      return {
        ...state, 
        invCurParty: action.payload
      }
    case 'REMOVE_INV_CURRENT_PARTY':
      return {
        ...state, 
        invCurParty: [],
        invCurPartyWishes: [],
        inviterInvCurParty: []
      }
    case 'GET_WISHES_IN_INV_CURRENT_PARTY':
      return {
        ...state, 
        invCurPartyWishes: action.payload
      }
    case 'GET_INVITER_IN_INV_CURRENT_PARTY':
      return {
        ...state, 
        inviterInvCurParty: action.payload
      }
    default:
      return state
  }
}