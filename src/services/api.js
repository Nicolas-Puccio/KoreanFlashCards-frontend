const URL = 'http://localhost:3001/api/'

//if undefined is then set by login, used in authenticated routes
export let token = undefined
export const setToken = _token => {
  token = token
}


/**
 * gets songs and words
 * sends username if user is logged in to also retrieve stats
 * @param {*} username 
 * @returns 
 */
export const getData = async (username = undefined) => {
  try {
    //sends the username as a query param, not safe at all but it is not critical or private information anyway
    const res = await fetch(URL + 'song/' + username ?? '')


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

    token = data.token
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