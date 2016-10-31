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
	var numpagina = req.query.pagina;
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("tournamentcollection").find().skip(3*(numpagina-1)).limit(3).toArray(function(err, documents){
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
	if(nuevoTorneo.name && nuevoTorneo.game && nuevoTorneo.matches && nuevoTorneo.competitors) {
		var torneoCreado = {name: nuevoTorneo.name, game:nuevoTorneo.game, matches:nuevoTorneo.matches, competitors:nuevoTorneo.competitors};
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
	if(nuevoTorneo.name && nuevoTorneo.game && nuevoTorneo.matches && nuevoTorneo.competitors) {
		db.open(function(err, db) {
			assert.equal(null, err);
			db.collection("tournamentcollection").save({"_id":ObjectId(id),"name": nuevoTorneo.name, "game":nuevoTorneo.game, "matches":nuevoTorneo.matches, "competitors":nuevoTorneo.competitors});
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
	var numpagina = req.query.pagina;
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("organizerscollection").find().skip(3*(numpagina-1)).limit(3).toArray(function(err, documents){
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

app.post('/api/organizers', function(req, res){
	var nuevoOrganizador = req.body;
	if(nuevoOrganizador.name && nuevoOrganizador.email && nuevoOrganizador.organizacion) {
		var organizadorCreado = {name: nuevoOrganizador.name, email:nuevoOrganizador.email, organizacion:nuevoOrganizador.organizacion};
		db.open(function(err, db) {
			assert.equal(null, err);
			db.collection("organizerscollection").insert(organizadorCreado, function(err, doc){
				res.status(201);
				res.header('Location','http://localhost:3000/api/organizers/'+organizadorCreado._id);
				res.end();
			});;
			db.close();
		});
	}
	else {
		res.status(400);
		res.send("El Organizador no tiene los campos adecuados");
	}
});

app.put('/api/organizers/:id', function(req, res){
	var id = req.params.id;
	var organizador = req.body;
	if(!id) {
		res.status(400);
		res.end();
	}
	if(organizador.name && organizador.email && organizador.organizacion) {
		db.open(function(err, db) {
			assert.equal(null, err);
			db.collection("organizerscollection").save({"_id":ObjectId(id),"name": organizador.name, "email":organizador.email, "organizacion": organizador.organizacion});
			db.close();
		});
		res.status(201);
		res.header('Location','http://localhost:3000/api/organizations/');
		res.end();
	}
	else {
		res.status(494);
		res.end();
	}
});

app.delete('/api/organizers/:id', function(req, res){
	var id = req.params.id;
	if(!id) {
		res.status(400);
		res.end();
	}
	db.open(function(err, db) {
		assert.equal(null, err);
		db.collection("organizerscollection").remove({_id: ObjectId(id)}, function(err, doc){
			res.end();
		});;
	db.close();
	});
});

app.get('/api/tournaments/:id/competitors', function(req, res){
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
				if(document != null) {
					var competitors = document.document.competitors;
					res.send(JSON.stringify(competitors));
				}
			});
			db.close();
		});
	}
});

app.post('/api/tournaments/:id/competitors', function(req, res){
	var id = req.params.id;
	var competitor = req.body;
	if(!id) {
		res.status(404);
		res.end();
	}
	if(competitor.name && competitor.email && competitor.webpage) {
		db.open(function(err,db) {
			assert.equal(null, err);
			db.collection("tournamentcollection").find(ObjectId(id)).each(function(err, document){
				assert.equal(null,err);
				if(document) {
					document.competitors.push(competitor);
					db.collection("tournamentcollection").save({"_id":ObjectId(id),document});
					db.close();
				}
			});
			res.end();
		});
	}
});

app.listen(3000, function() {
	console.log("Inicialización de servidor de tournamentPlanner")
	MongoClient.connect(MongoUrl, function(error, db){
		assert.equal(null, error);
		console.log("Conectado a la BD de tournamentPlanner");
		db.close();
	})
})

module.exports = app;