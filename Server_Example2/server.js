"use strict";

// PORT definition
const PORT = 8000;

// Import the HTTP library
const http = require('http');

// Import the fs library 
const fs = require('fs');

const cache = {};
cache['openhouse.html'] = fs.readFileSync('public/openhouse.html');
cache['openhouse.css'] = fs.readFileSync('public/openhouse.css');
cache['openhouse.js'] = fs.readFileSync('public/openhouse.js');

/** @function serveIndex
 * Serves the index file with the provided response object
 * @param {string} path - Specifies the file path to read
 * @param {http.serverResponse} res - the http response object
 */
function serveIndex(path, res) {
    fs.readdir(path, function(err, files) {
        if(err) {
            console.error(err);
            res.statusCode = 500;
            res.end(err.message);
            return;
        }
        var html = "<p>Index of " + path + "</p>";
        html += "<ul>";
        html += files.map(function(item) {
            return "<li><a href='" + item + "'>" + item + "</a></li>";
        }).join("");
        html += "</ul>";
        res.end(html);
    });
}

/** @function serveFile
 * Serves the specified file with the provided response object
 * @param {string} path - Specifies the file path to read
 * @param {http.serverResponse} res - the http response object
 */
function serveFile(path, res) {
    fs.readFile(path, function(err, data) {
        fs.readFile(path, function(err, data) {
            if(err) {
                console.error(err);
                res.statusCode = 500;
                res.end(err.message);
                return;
            }
            res.end(data);
        });
    })
}

/** @function handleRequest
 * Request handler for our http server
 * @param {http.ClientRequest} req - the http request object
 * @param {http.serverResponse} res - the http response object
 */
function handleRequest(req, res) {
    console.log(req.url);
    
    switch(req.url) {
        case '/':
            serveIndex('public', res);
            break;
        case '/openhouse.html':
            //res.end(cache['openhouse.html']);
            serveFile('public/openhouse.html', res);
            break;
        case '/openhouse.css':
            //res.end(cache['openhouse.css']);
            serveFile('public/openhouse.css', res);
            break;
        case '/openhouse.js':
            serveFile('public/openhouse.js', res);
            break;
        default:
            res.statusCode = 404;
            res.end("File Not Found");
    }

}

// Create the web server
var server = http.createServer(handleRequest);

// Start listening on port PORT
server.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});