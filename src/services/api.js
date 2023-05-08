const URL = 'http://localhost:3001/api/' //'https://kfc-backend-eb38.onrender.com/api/'
//-change url

//gets songs and words
export const getData = async () => {
  try {
    const res = await fetch(URL + 'song')

    const data = await res.json()
    if (!res.ok)
      throw new Error(data.message)

    return data
  } catch (error) {
    console.error(error)

    if (error.message === 'Failed to fetch')
      return alert(error.message + ': please wait 2 minutes for the backend to spin up and try again')

    alert(error.message)
  }
}

export const login = async (action, body) => {
  try {
    const res = await fetch(`http://localhost:3001/api/user/${action}`, {
      method: "POST",
      body,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include'
    })

    const data = await res.json()
    if (!res.ok)
      throw new Error(data.message)

    return data

  } catch (error) {
    console.error(error)

    alert(error.message)
  }
}