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

app.use(bodyParser.json());

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
	if(!id) {
		res.status(404);
		res.end();
	}
	else {
		db.open(function(err, db) {
			assert.equal(null, err);
			db.collection("tournamentcollection").find(ObjectId(id)).each(function(err, document){
				assert.equal(null, err);
				return res.end(JSON.stringify(document));
			});
			db.close();
		});
	}
});

app.post('/api/tournaments', function(req, res){
	var nuevoTorneo = req.body;
	if(nuevoTorneo.name && nuevoTorneo.game && nuevoTorneo.matches) {
		var torneoCreado = {name: nuevoTorneo.name, game:nuevoTorneo.game, matches:nuevoTorneo.matches};
		db.open(function(err, db) {
			assert.equal(null, err);
			db.collection("tournamentcollection").insert(torneoCreado, function(err, doc){
				res.status(201);
				res.header('Location','http://localhost:3000/api/tournaments/'+torneoCreado._id);
				res.end();
			});;
			db.close();
		});
	}
	else {
		res.status(400);
		res.send("El Torneo no tiene los campos adecuados");
	}
});

app.put('/api/tournaments/:id', function(req, res){ //TODO arreglar put
	var nuevoTorneo = req.body;	
	var id = req.params.id;
	if(!id) {
		res.status(404);
		res.end();
	} 
	if(nuevoTorneo.name && nuevoTorneo.game && nuevoTorneo.matches) {
		db.open(function(err, db) {
			assert.equal(null, err);
			db.collection("tournamentcollection").save({"_id":ObjectId(id),"name": nuevoTorneo.name, "game":nuevoTorneo.game, "matches":nuevoTorneo.matches});
			db.close();
		});
		res.status(201);
		res.header('Location','http://localhost:3000/api/tournaments/');
		res.end();
	}
	else {
		res.status(400);
		res.send("El Torneo no tiene los campos adecuados");
	}
});

app.delete('/api/tournaments/:id', function(req, res) {
	var id = req.params.id;
	if(!id) {
		res.status(400);
		res.end();
	}
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("tournamentcollection").remove({_id: ObjectId(id)}, function(err, doc){
			res.end();
		});;
	db.close();
	});
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
	if(!id) {
		res.status(404);
		res.end();
	}
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