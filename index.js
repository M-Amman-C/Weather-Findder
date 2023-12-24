import env from "dotenv"; /*WeatherAPI.com*/
env.config();
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

const APIURL= process.env.APIURL
const APIKEY = process.env.APIKEY

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

var location, region, country, time, label, wind_kph, humidity, temp_c, feelslike_c, w_img, condition_text;


app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.post("/", async (req,res)=>{
    try {
        var response = await axios.get("http://api.weatherapi.com/v1/current.json?key="+APIKEY+"&q="+req.body.q+"&aqi=no")
    } catch (error) {
        console.log(error.message);
    }
    response = response.data;

    location= response.location.name;
    region= response.location.region;
    country= response.location.country;
    time= response.current.last_updated.slice(-5);
    wind_kph= response.current.wind_kph,
    humidity= response.current.humidity,
    temp_c= response.current.temp_c,
    feelslike_c= response.current.feelslike_c,
    condition_text = response.current.condition.text
    
    if(time<"12:00"){
        label = " AM";
    }else{
        label = " PM";
    }

    if(response.current.is_day == 1){
        w_img = response.current.condition.icon.slice(-11);
    } else{
        w_img = response.current.condition.icon.slice(-13);
    }
    res.redirect("/curr_weather");
})

app.get("/curr_weather",(req,res)=>{
    res.render("weather.ejs",{
        location: location,
        region: region,
        country: country,
        time: time,
        label: label,
        wind_kph: wind_kph,
        humidity: humidity,
        temp_c: temp_c,
        feelslike_c: feelslike_c,
        w_img: "Icons/"+w_img,
        condition_text: condition_text
    });
})

/*app.post("/", async (req,res)=>{
    
    res.redirect("/");
})*/

app.listen(port,()=>{
    console.log("Server running on port "+port+"...\n link: http://localhost:3000/");
})



/* var response = {
    "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11,
        "tz_id": "Europe/London",
        "localtime_epoch": 1703400640,
        "localtime": "2023-12-24 6:50"
    },
    "current": {
        "last_updated_epoch": 1703400300,
        "last_updated": "2023-12-24 06:45",
        "temp_c": 12.0,
        "temp_f": 53.6,
        "is_day": 0,
        "condition": {
            "text": "Light drizzle",
            "icon": "//cdn.weatherapi.com/weather/64x64/night/266.png",
            "code": 1153
        },
        "wind_mph": 13.6,
        "wind_kph": 22.0,
        "wind_degree": 250,
        "wind_dir": "WSW",
        "pressure_mb": 1006.0,
        "pressure_in": 29.71,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 94,
        "cloud": 100,
        "feelslike_c": 9.5,
        "feelslike_f": 49.0,
        "vis_km": 4.0,
        "vis_miles": 2.0,
        "uv": 1.0,
        "gust_mph": 24.2,
        "gust_kph": 39.0
    }
}

*/