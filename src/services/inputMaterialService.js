import apiURL from "./api.js";

export default {
  saveToCollection: async (inputjson) => {
    //console.log(data)
    if(inputjson.data !== ''){
      try {
        var url = apiURL.URLInput

        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify(inputjson),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
        const json = await response.json()
        console.log('Success: ',json);
        return json
      } catch ( err ) {
        console.log('Error: ', err.toString() )
      }
    }
  }
}