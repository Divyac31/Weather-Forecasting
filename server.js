'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var fs = require('fs');
const axios = require('axios');
const Handlebars = require("handlebars");

http.createServer(function (req, res) {
    axios({
        url: 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
        method: 'get'
    })
        ; (async () => {
            const response = await axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
            fs.writeFile("users.json", JSON.stringify(response.data), err => {

                // Checking for errors 
                if (err) throw err;

                console.log("Done writing"); // Success 
            }); 

        })()
    var data = fs.readFileSync('users.json', 'utf8');
    var climate = JSON.parse(data);
    //console.log(climate);
    var t = 5;
    var x;
    
    var source ="<html><head><style> table ,th,td { border: 1px solid black;} </style></head>"+
        "<table> <tr> <td> City </td> <td> {{name}} </td> </tr>" +
        "<tr> {{#weather}} <td> Weather </td> <td>{{main}} </td> {{/weather}}</tr>" +
        "<tr> {{#weather}} <td> Description </td> <td>{{description}} </td> {{/weather}}</tr>" +
        "<tr> {{#main}} <td> Current Temperature </td> <td>{{temp}} </td> {{/main}}</tr>" +
        "<tr> {{#main}} <td> Maximum Temperature </td> <td>{{temp_max}} </td> {{/main}}</tr>" +
        "<tr> {{#main}} <td> Minimum Temperature </td> <td>{{temp_min}} </td> {{/main}}</tr>" +
        "<tr> {{#main}} <td> Pressure </td> <td>{{pressure}} </td> {{/main}}</tr>" +
        "<tr> {{#main}} <td> Humidity </td> <td>{{humidity}} </td> {{/main}}</tr>" +
        "<tr> <td> Visibility </td> <td> {{visibility}} </td> </tr></table></html>";
    var template = Handlebars.compile(source);
    var result = template(climate);
    res.write(result);
    res.end();

}).listen(port);
