const express = require('express')
const request = require('request');

const port=process.env.PORT || 3000
const bodyParser = require('body-parser');
const app = express()


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {

	let apiKey = '4c7ea1e2a887a56b5dc3c84c7c7e3ea2';
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {
  if(err){
    res.render('index', {weather: null, error: 'Error, please try again'});
  } else {
    let weather = JSON.parse(body)

    if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} farenhit degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
  }
});
})

app.listen(port, function () {
  console.log(`Example app listening on port `+port)
})