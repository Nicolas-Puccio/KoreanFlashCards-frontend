const URL = 'http://localhost:3001/api/' //'https://kfc-backend-eb38.onrender.com/api/'

//gets songs and words
export const getData = async () => {
  try {
    const res = await fetch(URL + 'song')

    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}