export const addPartyToDb = (obj) => {
  return fetch(`${window.location.origin}/party/addData`,{
    method: "POST",
    body: JSON.stringify({ ...obj }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const getPartyToDb = (id) => {
  return fetch(`${window.location.origin}/party/getData`,{
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const getInvitedPartiesToDb = (email) => {
  return fetch(`${window.location.origin}/party/invitedParties`,{
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const getCurrentParty = (id) => {
  return fetch(`${window.location.origin}/party/getCurrentParty`,{
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const editCurrentParty = (obj) => {
  return fetch(`${window.location.origin}/party/editCurrentParty`,{
    method: "POST",
    body: JSON.stringify({ ...obj }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const deleteCurrentParty = (id) => {
  return fetch(`${window.location.origin}/party/deleteCurrentParty`,{
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const addWishesInCurrentParty = (party_id, wishes) => {
  return fetch(`${window.location.origin}/party/addWishes`,{
    method: "POST",
    body: JSON.stringify({ party_id, wishes }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const getWishesInCurrentParty = (id) => {
  return fetch(`${window.location.origin}/party/getCurrentWishes`,{
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const addGuestsInCurrentParty = (party_id, emails) => {
  return fetch(`${window.location.origin}/party/addGuests`,{
    method: "POST",
    body: JSON.stringify({ party_id, emails }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const getGuestsInCurrentParty = (id) => {
  console.log(id)
  return fetch(`${window.location.origin}/party/getCurrentGuests`,{
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const searchUsers = (name) => {
  return fetch(`${window.location.origin}/party/searchUsers`,{
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}

export const getInviter = (id) => {
  return fetch(`${window.location.origin}/party/inviter/${id}`).then(data => data.json())
}

export const removeCurWishToDb = (wish_id, party_id) => {
  return fetch(`${window.location.origin}/party/removeCurWish`,{
    method: "POST",
    body: JSON.stringify({ wish_id, party_id }),
    headers: {"Content-Type": "application/json"}
  })
  .then( data => data.json() )
}