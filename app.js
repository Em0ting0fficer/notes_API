var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/notes.db');

function main() {
    initDb();

    var express = require('express')
        , bodyParser = require('body-parser');
    var restapi = express.Router();

    restapi.use(bodyParser.json());

    restapi.route('/notes')
        .get(notesGETall)
        .post(notesPOST)

    restapi.route('/notes/:key')
        .get(noteGETbyID)
        .put(notePUTbyID)
        .delete(noteDELETEbyID)

    server=express();
    server.use('/api/',restapi);
    server.listen(3000);
}

function initDb(){
    db.run("CREATE OR IGNORE notes (id INTEGER PRIMARY KEY, body TEXT)");
    db.run("INSERT INTO notes (id, body) VALUES (1, This is the first note)(2, This is the second note)(3, This is the third note)");
}

function notesGETall(res) {
    let sql = `SELECT * FROM notes`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.json(rows);        
    });
}

function notesPOST(req, res) {
    let sql = `INSERT INTO notes ('body') VALUES ('${req.body}') `;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.json(`post succesfull`);
    });
}

main();