const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2c3ea2a423de522a6ecb87e3f9aeb41f/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si&lang=en`
    request({url, json: true}, (err,{body}) => {
    if (err) {
       callback('Unable to connect to weather service', undefined);    
    } else if (body.error) {
        callback('Unable to find location', undefined);     
    } else {
        const curWeather = body.currently
    
        info =  `${body.daily.data[0].summary} It is currently ${curWeather.temperature} degrees out. There is a ${curWeather.precipProbability}% chance of rain.
        The minimum temperature today: ${body.daily.data[0].temperatureLow}.
        The maximum temperature today: ${body.daily.data[0].temperatureHigh}.`
        callback(undefined, info);
    }
    })
}

module.exports = forecast