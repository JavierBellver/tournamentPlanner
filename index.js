var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectId = require('mongodb').ObjectId;
var Server = require('mongodb').Server;
var MongoUrl = 'mongodb://localhost:27017/tournamentplannerdb'
var db = new Db('tournamentplannerdb', new Server('localhost',27017));

var tournaments = [];

app.get('/api/tournaments')

app.get('/api/tournaments', function(req, res){
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("tournamentcollection").find().toArray(function(err, documents){
			assert.equal(null, err);
			res.send(documents);
			db.close();
		});
	});
});

app.get('/api/tournaments/:id', function(req, res) {
	var id = req.params.id;
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("tournamentcollection").find(ObjectId(id)).each(function(err, document){
			assert.equal(null, err);
			return res.end(JSON.stringify(document));
		});
		db.close();
	});
});

app.post('/api/tournaments', function(req, res){

});

app.put('/api/tournaments/:id', function(req, res){

});

app.delete('/api/tournaments/:id', function(req, res) {

});

app.get('/api/organizers', function(req, res){
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("organizerscollection").find().toArray(function(err, documents){
			assert.equal(null, err);
			res.send(documents);
			db.close();
		});
	});
});

app.get('/api/organizers/:id', function(req, res){
	var id = req.params.id;
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("organizerscollection").find(ObjectId(id)).each(function(err, document){
			assert.equal(null, err);
			return res.end(JSON.stringify(document));
		});
		db.close();
	});
});

app.post('/api/organizer', function(req, res){

});

app.put('/api/organizer/:id', function(req, res){

});

app.delete('/api/organizer/:id', function(req, res){

});

app.get('/api/tournaments/:id/competitors', function(req, res){

});

app.post('/api/tournaments/:id/competitors', function(req, res){

});

app.listen(3000, function() {
	console.log("Inicialización de servidor de tournamentPlanner")
	MongoClient.connect(MongoUrl, function(error, db){
		assert.equal(null, error);
		console.log("Conectado a la BD de tournamentPlanner");
		db.close();
	})
})