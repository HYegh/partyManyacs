const initState = {
	clientId: "",
	email: "",
	fullName: "",
	gender: "",
	phoneNumber: "",
	image: "",
	loader: false,
	request: false
}

export default (state = initState, action) => {
	switch (action.type) {
		case 'DATA_LOAD':
			return {
				...state,
				clientId: action.payload.ClientId,
				email: action.payload.email,
				fullName: action.payload.fullName,
				gender: action.payload.gender,
				phoneNumber: action.payload.phoneNumber,
				image: action.payload.image,
				loader: false
			}
		case 'SHOW_LOADER':
			return {
				...state,
				loader: true
			}
		case 'CHANGE_VALUE':
			return {
				...state,
				[action.payload.type]: action.payload.value
			}
		case 'DATA_REQUEST':
			return {
				...state,
				request: !state.request
			}
		default:
			return state
	}
}