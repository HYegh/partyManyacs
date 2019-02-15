import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import wishReducer from './reducers/wishReducer'
import partyReducer from './reducers/partyReducer'
import invitedPartyReducer from './reducers/invitedPartyReducer'

const reducer = combineReducers({ 
	user: userReducer, 
	wishList: wishReducer,
	partyReducer: partyReducer,
	invitedPartyReducer: invitedPartyReducer
})

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)