var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express();

function getTodos(callback) {
    fs.readFile(__dirname + '/private/todos.json', 'utf8', function (err,data) {
        var parsedData = data;
        if (data) {
            parsedData = JSON.parse(data);
        }
        callback(err, parsedData);
    });
}

function saveTodos(todos, callback) {
    // Real code
    // fs.writeFile(__dirname + '/private/todos.json', JSON.stringify(todos), function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     callback(err);
    // });
    //
    // Dummy
    callback(null);
}

app.use(bodyParser());

app.get('/todo', function(req, res) {
    getTodos(function(err, todos) {
        res.send(todos);
    });
});

app.post('/todo', function(req, res) {
    getTodos(function(err, todos) {
        var todo = req.body.todo;
        todos.push(todo);
        saveTodos(todos, function(err) {
            if (!err) {
                res.send(todo);
            } else {
                res.status(500);
                res.send(err);
            }

        });
    });
});

app.use('/', express.static(__dirname + '/public/index.html'));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});