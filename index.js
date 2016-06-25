var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
    });
});

http.listen(26247);
