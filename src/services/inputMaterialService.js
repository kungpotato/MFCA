import apiURL from './api'

export default {
  getInpuMat: async (id) => { //eslint-disable-line
    try {
      const response = (id !== undefined) ? await fetch(`${apiURL.URLInput}?_id=${id}`) : await fetch(`${apiURL.URLInput}`)
      const json = await response.json()
      // console.log('Success: ',json);
      return json
    } catch (error) {
      console.log('Error: ', error)
    }
  },
  saveToCollection: async (inputjson) => { //eslint-disable-line
    // console.log(data)
    if (inputjson.data !== '') {
      try {
        const url = apiURL.URLInput

        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify(inputjson),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        const json = await response.json()
        console.log('Success: ', json)
        return json
      } catch (err) {
        console.log('Error: ', err.toString())
      }
    }
  }
}
