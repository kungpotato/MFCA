import apiURL from './api'

export default {
  getDept: async (id) => { //eslint-disable-line
    try {
      const response = (id !== undefined) ? await fetch(`${apiURL.URLDept}?_id=${id}`) : await fetch(`${apiURL.URLDept}`)
      const json = await response.json()
      // console.log('Success: ',json);
      return json
    } catch (error) {
      // console.log('Error: ',error);
    }
  },
  getMat: async (id) => { //eslint-disable-line
    try {
      const response = (id !== undefined) ? await fetch(`${apiURL.URLMat}?_id=${id}`) : await fetch(`${apiURL.URLMat}`)
      const json = await response.json()
      // console.log('Success: ',json);
      return json
    } catch (error) {
      // console.log('Error: ',error);
    }
  },
  getUnit: async (id) => { //eslint-disable-line
    try {
      const response = (id !== undefined) ? await fetch(`${apiURL.URLUnit}?_id=${id}`) : await fetch(`${apiURL.URLUnit}`)
      const json = await response.json()
      // console.log('Success: ',json);
      return json
    } catch (error) {
      // console.log('Error: ',error);
    }
  },
  saveToCollection: async (type, inputjson) => { //eslint-disable-line
    // console.log(data)
    if (inputjson.data !== '') {
      try {
        let url = ''
        if (type === 'dept') {
          url = apiURL.URLDept
        } else if (type === 'mat') {
          url = apiURL.URLMat
        } else if (type === 'unit') {
          url = apiURL.URLUnit
        }

        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify(inputjson),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        const json = await response.json()
        // console.log('Success: ',json);
        return json
      } catch (err) {
        // console.log('Error: ', err.toString() )
      }
    }
  }
}
