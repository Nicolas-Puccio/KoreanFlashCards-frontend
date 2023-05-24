const URL = 'https://kfc-backend-eb38.onrender.com/api/'

//gets songs and words
export const getData = async () => {
  try {
    //sends the username as a query param, not safe at all but it is not critical or private information anyway
    const res = await fetch(URL + 'song/', {
      credentials: 'include'
    })

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

export const getStats = async () => {
  try {
    const res = await fetch(URL + 'user/stats', {
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


export const login = async (action, body) => {
  try {
    const res = await fetch(URL + 'user/' + action, {
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



export const review = async (body) => {
  try {
    const res = await fetch(URL + 'song/review', {
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