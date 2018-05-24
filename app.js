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

    restapi.route('/notes/:user')
        .get(notesGETbyUSER)
        .post(notePOSTbyUSER)
        .put(notePUTbyUSER)
        .delete(noteDELTEbyUSER)

    restapi.route('/users')
        .get(usersGETall)
        .post(userPOST)

    restapi.route('/users/:key')
        .get(userGETbyUSER)
        .put(userPUTbyUSER)
        .delete(userDELETE)

    server=express();
    server.use('/api/',restapi);
    server.listen(3000);
}

function initDb(){
    db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, body TEXT, userfk INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS users (userPK INTEGER PRIMARY KEY, user TEXT)");
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
    let sql = `INSERT INTO notes ('title','body','user') VALUES ('${req.body.title}','${req.body.body}','${req.body.user}') `;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function noteGETbyID(req, res) {
    let sql = `SELECT * FROM notes WHERE id=${req.params.key}`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.json(rows);        
    });
}

function notePUTbyID(req, res) {
    let sql = `INSERT OR REPLACE INTO notes ('id','title','body','user') VALUES ('${req.params.key}','${req.body.title}','${req.body.body}','${req.body.user}')`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function noteDELETEbyID(req, res) {
    let sql = `DELETE FROM notes WHERE id=${req.params.key}`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function usersGETall(req, res) {
    let sql = `SELECT * FROM users`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.json(rows);        
    });
}

function userPOST(req, res) {
    let sql = `INSERT INTO users ('user') VALUES ('${req.body.user}')`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.send('succ');        
    });
}

function userGETbyUSER(req, res) {
    let sql = `SELECT * FROM users WHERE userPK=${req.params.key}`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.json(rows);        
    });
}

function userPUTbyUSER(req, res) {
    let sql = `INSERT OR REPLACE INTO users ('userPK','user') VALUES ('${req.params.key}','${req.body.user}')`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function userDELETE(req, res) {
    let sql = `DELETE FROM users WHERE userPK=${req.params.key}`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function notesGETbyUSER(req, res) {
    let sql = `SELECT * FROM notes WHERE userfk=${req.params.key}`;
    db.all(sql, function(err,rows){
        if(err) res.json(err);
        else res.json(rows);        
    });
}

function notePOSTbyUSER(req, res) {
    let sql = `INSERT INTO notes ('title','body','userfk') VALUES ('${req.body.title}','${req.body.body}','${req.params.key}') `;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function notePUTbyUSER(req, res) {
    let sql = `INSERT OR REPLACE INTO notes ('id','title','body','userfk') VALUES ('${req.body.id}','${req.body.title}','${req.body.body}','${req.params.key}')`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

function noteDELTEbyUSER(req, res) {
    let sql = `DELETE FROM notes WHERE userfk=${req.params.key} && id=${req.body.id}`;
    db.run(sql, function(err){
        if(err) res.json(err);
        else res.send('succ');
    });
}

main();
