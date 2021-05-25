//jshintesversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var axios = require("axios").default;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
 res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){

  var stockName = req.body.stock.toUpperCase();
  var options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      // interval: '',
      function: 'GLOBAL_QUOTE',
      symbol: 'BSE:'+stockName,
      datatype: 'json',
      output_size: 'compact'
    },

    headers: {
      'x-rapidapi-key': process.env.X_KEY,
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
  	console.log(response.data);
    res.json(response.data);
  }).catch(function (error) {
  	console.error(error);
  });
})

app.listen(3000 , function(){
  console.log("Successfully started at port 3000 ");
})
