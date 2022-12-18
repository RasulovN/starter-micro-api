const axios = require("axios");

async function storeDown(store_url){
    try {
        const options = {
          method: 'GET',
          url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
          params: {url: store_url},
          headers: {
            'X-RapidAPI-Key': '20a8791285mshd579cfa271d2d40p14c43fjsne60c098d082a',
            'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
          }
        };
        
        const response = await axios.request(options)
        const result = {
            data: response.data,
            media: response.data.media,
            title: response.data.title,
        }
        return result
        // console.log(response.data.media);
        
    } catch (error) {
        console.log(error);
    }
}



// storeDown()
module.exports = {storeDown};