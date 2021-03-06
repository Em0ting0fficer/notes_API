var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/notes.db');


function initDb() {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, user TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, body TEXT,user INTEGER, FOREIGN KEY(user) REFERENCES users(id))");
    db.run("PRAGMA foreign_keys = ON");
    //db.run("INSERT INTO notes (body) VALUES ('This is the first note'),('This is the second note'),('This is the third note')");
}

function notesGETall(req, res) {
    let sql = `SELECT * FROM notes`;
    db.all(sql, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
}

function notesPOST(req, res) {
    let sql = `INSERT INTO notes ('title','body','user') VALUES ('${req.body.title}','${req.body.body}','${req.body.user}') `;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function noteGETbyID(req, res) {
    let sql = `SELECT * FROM notes WHERE id=${req.params.key}`;
    db.all(sql, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
}

function notePUTbyID(req, res) {
    let sql = `INSERT OR REPLACE INTO notes ('id','title','body','user') VALUES ('${req.params.key}','${req.body.title}','${req.body.body}','${req.body.user}')`;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function noteDELETEbyID(req, res) {
    let sql = `DELETE FROM notes WHERE id=${req.params.key}`;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function usersGETall(req, res) {
    let sql = `SELECT * FROM users`;
    db.all(sql, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
}

function userPOST(req, res) {
    let sql = `INSERT INTO users ('user') VALUES ('${req.body.user}')`;
    db.all(sql, function (err, rows) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function userPUTbyUSER(req, res) {
    let sql = `INSERT OR REPLACE INTO users ('id','user') VALUES ('${req.params.key}','${req.body.user}')`;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function userDELETE(req, res) {
    let sql = `DELETE FROM users WHERE id=${req.params.key}`;
    let sql2 = `DELETE FROM notes WHERE user=${req.params.key}`;
    db.run(sql2, function (err) {
        if (err) res.json(err);
        else {
            db.run(sql, function (err) {
                if (err) res.json(err);
                else res.send('succ');
            });
        }
    });
}

function notesGETbyUSER(req, res) {
    let sql = `SELECT * FROM notes WHERE user${req.params.key}`;
    db.all(sql, function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    });
}

function notePOSTbyUSER(req, res) {
    let sql = `INSERT INTO notes ('title','body','user') VALUES ('${req.body.title}','${req.body.body}','${req.params.key}') `;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function notePUTbyUSER(req, res) {
    let sql = `INSERT OR REPLACE INTO notes ('id','title','body','user') VALUES ('${req.body.id}','${req.body.title}','${req.body.body}','${req.params.key}')`;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function noteDELTEbyUSER(req, res) {
    let sql = `DELETE FROM notes WHERE user=${req.params.key} AND id=${req.body.id}`;
    db.run(sql, function (err) {
        if (err) res.json(err);
        else res.send('succ');
    });
}

function userGETbyUSER(req, res) {
    result = {};
    db.serialize(function () {
        let sql = `SELECT * FROM users WHERE id=${req.params.key}`;
        db.all(sql, function (err, rows) {
            if (err) res.json(err);
            else {
                result.user = rows[0].user;
                result.notes = [];
                let sql2 = `SELECT id FROM notes WHERE user=${req.params.key}`;
                let ids = [];
                db.all(sql2, function (err, rows) {
                    rows.forEach(element => {
                        result.notes.push(`localhost:3000/api/notes/${element.id}`);
                    });
                    if (err) res.json(err);
                    else {
                        res.json(result)
                    };
                })
            }
        });
    })
}

module.exports = {
    initDb,
    notesGETall,
    notesPOST,
    noteGETbyID,
    notePUTbyID,
    noteDELETEbyID,
    notesGETbyUSER,
    notePOSTbyUSER,
    notePUTbyUSER,
    noteDELTEbyUSER,
    usersGETall,
    userPOST,
    userGETbyUSER,
    userPUTbyUSER,
    userDELETE,
}

