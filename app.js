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
    db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, body TEXT)");
    //db.run("INSERT INTO notes (body) VALUES ('This is the first note'),('This is the second note'),('This is the third note')");
}

function notesGETall(req, res) {
    let sql = `SELECT * FROM notes`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.json(rows);        
    });
}

function notesPOST(req, res) {
    let sql = `INSERT INTO notes ('body') VALUES ('${req.body.body}') `;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function noteGETbyID(req, res) {

}

function notePUTbyID(req, res) {
    
}

function noteDELETEbyID(req, res) {
    let sql = `DELETE FROM notes WHERE id=${req.params.key}`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

main();
