

const request = require('postman-request');

//Wheater API demo
// request('http://api.weatherstack.com/current?access_key=a47c9f540957971d13382386594ead01&query=india', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   const data= JSON.parse(body);
//   console.log('body:', data.current); // Print the HTML for the Google homepage.
// });

// mapbox  Location api 
//https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia3Jpc2huYS1rdW1hcjA4MCIsImEiOiJja203cGE2dHEwbzVyMnZtem4yajlhamFuIn0.9riemhHb-zlnXGvpi9F_9Q

const geocode = (address,callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent(${address}).json?access_token=pk.eyJ1Ijoia3Jpc2huYS1rdW1hcjA4MCIsImEiOiJja203cGE2dHEwbzVyMnZtem4yajlhamFuIn0.9riemhHb-zlnXGvpi9F_9Q`;
  //console.log(encodeURIComponent(url))
  request({url:url, json:true}, (error,response) => {
        if(error){
          callback('Unable to connect to location',undefined)
        }
        else if(response.body.features.length === 0){
          callback('Unable to find location. Try to another Search',undefined)
        }
        else{
          callback(undefined,{
             latitude:response.body.features[0].center[0],
             longitude:response.body.features[0].center[1],
             location:response.body.features[0].place_name
          })
        }
  })
}
module.exports = geocode;