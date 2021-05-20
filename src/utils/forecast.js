const request = require('request')

const forecast = (x,y,callback)=>{

    const url ='http://api.weatherstack.com/current?access_key=1c895a8621880e0cba62e0d888a93b1f&query='+ x + ',' + y + "&unit=m"
    request( { url, json: true},(error, {body})=>{
        if(error){
            callback("Unable to connect to service",undefined)
        }
        else if (body.success === false){
            callback("Unable to find coordinates", undefined)
        }
        else{
            const real_temp = body.current.temperature
            const feels = body.current.feelslike
            const answer = "It is " + real_temp + " degrees, but it feels like " + feels + " degrees"
            callback(undefined,answer)

        }

    })

}

module.exports = forecast