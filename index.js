var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis')
var client = redis.createClient();

client.on("error", function(err)
{
    console.log("Error: " + err);
});

app.get('/', function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

nameNumber = 0;

io.on('connection', function(socket)
{
    socket.on('identity', function(msg)
    {
        io.emit('identity', nameNumber);
        nameNumber += 1;
    });
    socket.on('tempMessage', function(msg)
    {
        realName = msg.substr(0, msg.indexOf("\n"));
        realMsg = msg.substr(msg.indexOf("\n") + 1);
        io.emit('tempMessage', realName + "\n" + realMsg);
        client.set("message" + realName, realName + "\n" + realMsg);
    });
    socket.on('getAllMessage', function(msg)
    {
        for(var i = nameNumber - 1; i >= 0 && i >= nameNumber - 101; i -= 1)
        {
            client.get("message" + i, function(err, reply)
            {
                io.emit('tempMessage', reply);
            });
        }
    });
});

http.listen(26247);
