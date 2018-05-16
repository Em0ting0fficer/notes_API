var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data/notes.db');

function main() {
    initDb();

    var express = require('express')
        , bodyParser = require('body-parser');
    var restapi = express.Router();

    restapi.use(bodyParser.json());

    restapi.route('/word')
        .get(notesGET)
        .post(notesPOST)

    restapi.route('/word/:key')
        .get(noteGETbyID)
        .put(notePUTbyID)
        .delete(noteDELETEbyID)

    server=express();
    server.use('/api/',restapi);
    server.listen(3000);
}

function initDb(){
    db.run("CREATE OR IGNORE notes ")
}