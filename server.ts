"use strict";
/// <reference path="./node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="./node_modules/@types/express/index.d.ts"/>
/// <reference path="./node_modules/@types/express/index.d.ts"/>
/// <reference path="./INomination.ts"/>

// BASE SETUP
// =============================================================================

// call the packages we need
import { INomination } from './INomination';
import * as bodyParser from 'body-parser';
import * as express from "express";        // call express
var app = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var nominations: INomination[] = [];
router.get('/nomination', function (req, res) {
    res.json(nominations);
});

router.post('/nomination', function (req, res) {
    let body = req.body;
	let n: INomination = {
        name: body.name,
        approves: body.approves,
        vetoes: body.vetoes
    };
    nominations.push(n);
	while(nominations.length > 1000){
		nominations.shift();
	}
    res.json(nominations);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);