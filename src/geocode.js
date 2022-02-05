const request = require("request");

 const geocode  = (address,cb)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWhtYWRzaDAwMiIsImEiOiJja3l6dGg2cHAwbWxuMnZtand3amlxOW5uIn0.knAfj1bcjQ30Lsy_ziGwuw';
    request({url:url,json:true},(err,{body})=>{
        if(err){
            cb('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0){
            cb('unable to find location, Try another search',undefined)
        }else{
            cb(undefined,{
                lat:body.features[0].center[1],
                lon:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

}
const forecast =(lat,lon,cb)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bf6669dc33d115852e31efe9c47edef3&query='+lat+','+lon;
    request({url:url,json:true},(err,{body})=>{

        if(err){
            cb('Unable to connect to weather station!',undefined)
        }else if(body.error){
            cb('unable to find location, Try another search',undefined)
        }else{
            cb(undefined,
                body.current.weather_descriptions[0] + "\n It is currently " + body.current.temperature + " It FeelsLike  " + body.current.feelslike  + " degrees out. "
            )
        }
    })
}

module.exports ={
     geocode:geocode,
     forecast:forecast
    }