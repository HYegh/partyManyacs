import { getUserData, uploadProfImg, updateProfile } from '../../requests'


export const loadData = (data) => ({ type: 'DATA_LOAD', payload: data })
export const request = () => ({ type: 'DATA_REQUEST' })
export const showLoader = () => ({ type: 'SHOW_LOADER' })
export const changeValue = (data) => ({ type: 'CHANGE_VALUE', payload: data })


export const getUser = () => {
  return (dispatch) => {
    dispatch(showLoader())
    getUserData()
      .then(data => dispatch(loadData(data)))
  }
}

export const getUpProfImg = (id, fileData) => {
  return (dispatch) => {
    dispatch(showLoader())
    uploadProfImg(id, fileData)
      .then(data => getUserData())
      .then(data => dispatch(loadData(data)))
  }
}

export const getUpProfile = (id, obj) => {
  return (dispatch) => {
    dispatch(request())
    updateProfile(id, obj)
      .then(data => getUserData())
      .then(data => dispatch(loadData(data)))
      .then(data => dispatch(request()))
  }
}



