const request = require('request');



const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hlemFkaWwiLCJhIjoiY2wwbngzbGpkMWtuNTNrbjU3bjgzNWVwayJ9.0ovBh9PFJ8Ggb3vyeykgtg&limit=1'

    request({url, json: true},(error, {body})=>{
        if (error){
            callback("unable to connet to the web service...")
        }else if(body.features.length === 0){
            callback("required location is not exist...")
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place: body.features[0].place_name

            })
        }

    })

}



module.exports = geocode