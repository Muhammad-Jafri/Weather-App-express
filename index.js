const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")
const { url } = require("inspector")

app.use(bodyParser.urlencoded({extended: true}))



app.listen(3000, () => {
    console.log("server running at port 3000")
})

app.get("/" , (req,res) => {

    res.sendFile(__dirname + "/index.html")

    

})

app.post("/", (req,res) => {

    const cityName = req.body.city
    const countryName = req.body.country

    console.log(cityName)
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=73eeb1e705473fb7a588957557f5547c&q="+cityName+"&units=metric"

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
    
            res.write("<div style='text-align: center; margin-top: 20px;'>");
            res.write("<h1 style='font-size: 36px;'>The temperature in " + cityName + " is " + temp + " celsius</h1>");
            res.write("<p style='font-size: 18px;'>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src='http://openweathermap.org/img/w/" + icon + ".png' alt='Weather Icon' style='width: 100px; height: 100px;'>");
            res.write("</div>");
    
            res.send();
        });
    });
    




})

