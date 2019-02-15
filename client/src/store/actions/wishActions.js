import {  getWishesFromDb, 
          addWishToDb, 
          deleteWishFromDb, 
          updateWishInDb, 
          uploadWishImg } from '../../requests/wishList'

export const getWishlist = (data) => ({type: 'GET_WISHLIST', payload: data})
export const request = () => ({type: 'DATA_REQUEST'})

export const fetchWishes = (user_id) => {
  return (dispatch) => {
    getWishesFromDb(user_id)
      .then(data => dispatch(getWishlist(data)))
  }
}

export const addWish = (user_id, text) => {
	return (dispatch) => {
		dispatch(request())
		addWishToDb(user_id, text)
			.then(data => dispatch(fetchWishes(user_id)) )
			.then(data => dispatch(request()))
  }
}




export const deleteWish = (user_id, wishId) => {
  return (dispatch) => {
    dispatch(request())
    deleteWishFromDb(wishId)
      .then((data) => {
        dispatch(fetchWishes(user_id))
      })
      .then(data => dispatch(request()))
  }
}

export const updateWishName = (user_id, wishName, wishId) => {
  return (dispatch) => {
    dispatch(request())
    updateWishInDb(wishName, wishId)
      .then(data => dispatch(fetchWishes(user_id)))
      .then(data => dispatch(request()))
  }
}

export const updateWishImage = (user_id, image, wishId) => {
  return (dispatch) => {
    dispatch(request())
    uploadWishImg(image, wishId)
      .then(data => dispatch(fetchWishes(user_id)))
      .then(data => dispatch(request()))
  }
}
