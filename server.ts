"use strict";

// BASE SETUP
// =============================================================================

// call the packages we need
import { INomination, nominationId } from './INomination';
import { NominationRepository } from './NominationRepository';
import * as bodyParser from 'body-parser';
import * as express from "express";        // call express
import * as debug from "debug";
var server = express();                 // define our server using express
var nominationRepository = new NominationRepository();

// configure server to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var port = normalizePort(process.env.PORT || 8080);        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'hello world' });
});


router.get('/nomination', (req, res) => {
    res.json(nominationRepository.getAll());
});

router.post('/nomination', (req, res) => {
    let body = req.body;
    let nomination = nominationRepository.create(body.name);
    res.json(nomination);
});

router.patch('/nomination/approve', (req, res) => {
    let body = req.body;
    let nomination = nominationRepository.approve(body.id);
    res.json(nomination);
});

router.patch('/nomination/veto', (req, res) => {
    let body = req.body;
    let nomination = nominationRepository.veto(body.id);
    res.json(nomination);
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
server.use('/api', router);

// START THE SERVER
// =============================================================================
server.listen(port);
console.log('Magic happens on port ' + port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}




