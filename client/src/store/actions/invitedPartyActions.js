import { getInvitedPartiesToDb, getWishesInCurrentParty, getCurrentParty, getInviter } from '../../requests/party'
import { checkedWish } from '../../requests/wishList'

export const getInvitedParties = (data) => ({type: 'GET_INVITED_PARTIES', payload: data})
export const removeInvCurrentParty = () => ({type: 'REMOVE_INV_CURRENT_PARTY'})
export const dispatchInvCurrentParty = (data) => ({type: 'GET_INV_CURRENT_PARTY', payload: data})
export const getWishesInvCurParty = (data) => ({type: 'GET_WISHES_IN_INV_CURRENT_PARTY', payload: data})
export const getInviterInvCurParty = (data) => ({type: 'GET_INVITER_IN_INV_CURRENT_PARTY', payload: data})
export const request = () => ({type: 'DATA_REQUEST'})

export const fetchInvitedParties = (email) => {
  return (dispatch) => {
    getInvitedPartiesToDb(email)
      .then(data => dispatch(getInvitedParties(data)))
  }
}

export const dispatchingInvCurrentParty = (id) => {
	return (dispatch) => {
		dispatch(request())
		getCurrentParty(id)
			.then( (data) => dispatch(dispatchInvCurrentParty(data)) )
			.then(data => dispatch(request()))
  }
}

export const fetchInvPartiesWishes = (party_id) => {
  return (dispatch) => {
    getWishesInCurrentParty(party_id)
      .then(data => dispatch(getWishesInvCurParty(data)))
  }
}

export const fetchInvPartiesInviter = (user_id) => {
  return (dispatch) => {
    getInviter(user_id)
      .then(data => dispatch(getInviterInvCurParty(data)))
  }
}

export const checkWish = (id, checked, clientId, party_id) => {
  return (dispatch) => {
    dispatch(request())
    checkedWish(id, checked, clientId, party_id)
      .then(data => dispatch(fetchInvPartiesWishes(party_id)) )
      .then(data => dispatch(request()))
  }
}