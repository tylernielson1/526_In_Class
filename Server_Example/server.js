"use strict";

// Port definition
const PORT = 8000;

//Importing the HTTP library
const http = require('http');
const fs = require('fs');

function handleRequest(req, res) {
    console.log(req.url);

    switch(req.url) {
        case '/':
        case '/openhouse.html':
            res.end(fs.readFileSync('public/openhouse.html'));
            break;
        case '/openhouse.css':
            res.end(fs.readFileSync('public/openhouse.css'));
            break;
        case '/openhouse.js':
            res.end(fs.readFileSync('public/openhouse.js'));
            break;
        default:
            res.statusCode = 404;
            res.end("File not found");
    }
}

// Create the Web server
var server = http.createServer(handleRequest)

// Start listening
server.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});