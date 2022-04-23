const request = require('request');



const forecast = (lat, lon, callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) +"&lon=" + encodeURIComponent(lon) +"&appid=7e530a36779195ce81ef81eb306be19e&units=imperial";


    request({url, json: true}, (error, {body})=>{
        if (error){
            callback("unable to connet to the web service...",undefined)
        }else if (body.cod === "400"){
            // console.log("required location is not exist...")
            callback("required location is not exist...",undefined);
        }else{
            callback(undefined, body.weather[0].description +", it is currently "+ body.main.temp + " degrees out and feel like "+ body.main.feels_like + ", Humidity level is " + body.main.humidity +'%. Wind speed is ' + body.wind.speed + 'm/s and ' + body.clouds.all + '% cloudiness.')
        }

    })
}



module.exports = forecast