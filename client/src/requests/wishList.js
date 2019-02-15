import axios from 'axios';

export const getWishesFromDb = (id) => {
  return fetch(`${window.location.origin}/wish/getData`,{
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}
  })
  .then(data => data.json())
}

export const addWishToDb = (id, text) => {
  return fetch(`${window.location.origin}/wish/addData`,{
    method: "POST",
    body: JSON.stringify({ 
    	name: text, 
    	//imageURL: "", 
    	user_id: id
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const deleteWishFromDb = (wishId) => {
  return  axios.delete('/wish/delete/'+ wishId, {
    data: {
      _id: wishId
    }
  })
}

export const updateWishInDb = (wishName, wishId) => {
  return axios.post('/wish/update/' + wishId, {
    _id: wishId,
    name: wishName
  })
}

export const uploadWishImg = (data, wishId) => {
	return axios.post('/upload/updateWishImg/' + wishId, data)
}

export const checkedWish = (id, checked, clientId, party_id) => {
  return fetch(`${window.location.origin}/wish/checkedWish`,{
    method: "POST",
    body: JSON.stringify({ id, checked, clientId, party_id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}