const http = require('http')
const fs = require('fs')

const PORT = 8001;

// Load synced files here (cached)
var students = JSON.parse(fs.readFileSync("students.json", {encoding: 'utf8'}))

function studentList() {
    return students.map(function(item) {
        return item.name
    }).join(", ")
}
function studentForm() {
    var form = "<form>"
    form +=    "  <fieldset>"
    form +=    "    <label for='name'>Student Name</label>"
    form +=    "    <input type='text' name='name'/>"
    form +=    "  </fieldset>"
    form +=    "  <fieldset>"
    form +=    "    <label for='eid'>Student Eid</label>"
    form +=    "    <input type='text' name='eid'/>"
    form +=    "  </fieldset>"
    form +=    "  <fieldset>"
    form +=    "    <label for='description'>Description</label>"
    form +=    "    <textarea name='description></textarea>"
    form +=    "  </fieldset>"
    form +=    "</form>"
    return form
}

function handleRequest(req, res) {
    var html = "<!doctype html>";
    html +=    "  <html>"
    html +=    "    <head>"
    html +=    "      <title>Hello World</title>"
    html +=    "    </head>"
    html +=    "    <body>"
    html +=    "      <h1>"
    html +=    "        Hello World"
    html +=    "      </h1>"
    html +=    studentList()
    html +=    studentForm()
    html +=    "    </body>"
    html +=    "  </html>"
    res.setHeader("ContentType", "text/html");
    res.end(html)
}

var server = http.createServer(handleRequest)

server.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})