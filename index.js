var express = require('express');
var app = express();

app.get('/', function(req, res)
{
    res.send('Hello World');
});

app.listen(26247, function()
{
    console.log('On port 26247');
});
