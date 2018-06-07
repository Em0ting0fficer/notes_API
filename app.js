const lib = require('./library');

function main() {
    lib.initDb();

    var express = require('express')
        , bodyParser = require('body-parser');
    var restapi = express.Router();

    restapi.use(bodyParser.json());

    restapi.route('/notes')
        .get(lib.notesGETall)
        .post(lib.notesPOST)

    restapi.route('/notes/:key')
        .get(lib.noteGETbyID)
        .put(lib.notePUTbyID)
        .delete(lib.noteDELETEbyID)

    restapi.route('/notes/u/:key')
        .get(lib.notesGETbyUSER)
        .post(lib.notePOSTbyUSER)
        .put(lib.notePUTbyUSER)
        .delete(lib.noteDELTEbyUSER)

    restapi.route('/users')
        .get(lib.usersGETall)
        .post(lib.userPOST)

    restapi.route('/users/:key')
        .get(lib.userGETbyUSER)
        .put(lib.userPUTbyUSER)
        .delete(lib.userDELETE)

    server=express();
    server.use('/api/',restapi);
    server.listen(3000);
}

main();
