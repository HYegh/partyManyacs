import axios from 'axios';

export const getUserData = () => {
  return fetch(`${window.location.origin}/auth/verify`).then(data => data.json())
}

export const uploadProfImg = (id, data) => {
	return axios.post(`${window.location.origin}/upload/profileImg/${id}`, data)
}

export const updateProfile = (id, obj) => {
	return fetch(`${window.location.origin}/profile/update/${id}`,{
			    method: "POST",
			    body: JSON.stringify({ 
			    	fullName: obj.fullName,
			    	phoneNumber: obj.phoneNumber,
			    	gender: obj.gender
			    }),
			    headers: {"Content-Type": "application/json"}
			  })
				.then(data => data.json())
}