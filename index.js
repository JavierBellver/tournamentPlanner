// npm run
// express use static
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var ObjectId = require('mongodb').ObjectId;
var Server = require('mongodb').Server;
var MongoUrl = 'mongodb://tournamentplanneruser:tournamentplannerpassword@ds139197.mlab.com:39197/heroku_vgr65f61'
var db = new Db('heroku_vgr65f61', new Server('ds139197.mlab.com',39197));

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));
app.use('/web', express.static('web'));

app.post('/login', function(req, res){
	var loginData = req.body;
	if(loginData.login && loginData.password) {
		if(loginData.login == "usuario" && loginData.password == "password") {
			res.status(200);
			res.send("Autorizado");
		}
		else {
			res.status(403);
			res.send("Usuario no autorizado")
		}
	}
	else {
		res.status(400);
		res.send("Error, parametros incorrectos")
	}
});

app.get('/api/tournaments', function(req, res){
	var numpagina = req.query.pagina;
	db.open(function(err, db) {
		if(err) {
			res.status(500);
			return res.send("Error en la llamada a la BD para obtener los torneos")
		}
		db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
			if(err) {
				res.status(500);
				res.send("Error en la autenticacion con la BD");
				return db.close();
			}
			db.collection("tournamentcollection").find().skip(3*(numpagina-1)).limit(3).toArray(function(err, documents){
				assert.equal(null, err);
				res.send(documents);
				return db.close();
			});
		});
	});
});

app.get('/api/tournaments/:id', function(req, res) {
	var id = req.params.id;
	if(!id) {
		res.status(404);
		return res.end();
	}
	else {
		db.open(function(err, db) {
			if(err) {
				res.status(500);
				return res.end();
			}
			if(!ObjectId.isValid(id)) {
				res.status(404);
				return res.send("Error, id no valida");
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					return res.send("Error en la autenticacion con la BD");
				}
				db.collection("tournamentcollection").find(ObjectId(id)).each(function(err, document){
					if(err) {
						res.status(500);
						res.end("Error en la BD al obtener el torneo");
						return db.close();
					}
					else {
						res.status(200);
						res.end(JSON.stringify(document));
						return db.close();
					}
				});
			});
		});
	}
});

app.post('/api/tournaments', function(req, res){
	var nuevoTorneo = req.body;
	if(nuevoTorneo.name && nuevoTorneo.game && nuevoTorneo.matches && nuevoTorneo.competitors) {
		var torneoCreado = {name: nuevoTorneo.name, game:nuevoTorneo.game, matches:nuevoTorneo.matches, competitors:nuevoTorneo.competitors};
		db.open(function(err, db) {
			if(err) {
				res.status(500);
				return res.end();
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					return res.send("Error en la autenticacion con la BD");
				}
				db.collection("tournamentcollection").insert(torneoCreado, function(err, doc){
					res.status(201);
					res.header('Location','/api/tournaments/'+torneoCreado._id);
					res.end();
					return db.close();
				});;
			});
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
			if(err) {
				res.status(500);
				return res.end();
			}
			if(!ObjectId.isValid(id)) {
				db.close();
				res.status(404);
				return res.send("Error, id no valida");
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					res.send("Error en la autenticacion con la BD");
					return db.close();
				}
				db.collection("tournamentcollection").save({"_id":ObjectId(id),"name": nuevoTorneo.name, "game":nuevoTorneo.game, "matches":nuevoTorneo.matches, "competitors":nuevoTorneo.competitors});
				res.status(200);
				res.header('Location','/api/tournaments/'+id);
				res.end();
				db.close();
			});
		});
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
		if(err) {
			res.status(500);
			return res.end();
		}
		if(!ObjectId.isValid(id)) {
			db.close();
			res.status(404);
			return res.send("Error, id no valida");
		}
		db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
			if(err) {
				res.status(500);
				res.send("Error en la autenticacion con la BD");
				return db.close();
			}
			db.collection("tournamentcollection").remove({_id: ObjectId(id)}, function(err, doc){
				if(err) {
					console.log(err);
					res.status(500);
					res.send("Error en el borrado del torneo");
					db.close();
				}
				else {
					res.status(204);
					res.end();
					db.close();
				}
			});
		});
	});
});

app.get('/api/organizers', function(req, res){
	var numpagina = req.query.pagina;
	db.open(function(err, db) {
		if(err) {
			res.status(500);
			return res.end();
		}
		db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
			if(err) {
				res.status(500);
				res.send("Error en la autenticacion con la BD");
				return db.close();
			}
			db.collection("organizerscollection").find().skip(3*(numpagina-1)).limit(3).toArray(function(err, documents){
				if(err) {
					res.status(500);
					res.send("Error obteniendo los organizadores");
					return db.close();
				}
				res.status(200);
				res.send(documents);
				db.close();
			});
		});
	});
});

app.get('/api/organizers/:id', function(req, res){
	var id = req.params.id;
	if(!id) {
		res.status(500);
		res.end();
	}
	db.open(function(err, db) {
		if(err) {
			db.close();
			res.status(500);
			return res.end();
		}
		if(!ObjectId.isValid(id)) {
			db.close();
			res.status(404);
			return res.end();
		}
		db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
			if(err) {
				res.status(500);
				res.send("Error en la autenticacion con la BD");
				return db.close();
			}
			db.collection("organizerscollection").find(ObjectId(id)).each(function(err, document){
				if(err) {
					res.status(500);
					res.send("Error obteniendo el organizador");
					return db.close();
				}
				res.status(200);
				res.end(JSON.stringify(document));
				db.close();
			});
		});
	});
});

app.post('/api/organizers', function(req, res){
	var nuevoOrganizador = req.body;
	if(nuevoOrganizador.name && nuevoOrganizador.email && nuevoOrganizador.organizacion) {
		var organizadorCreado = {name: nuevoOrganizador.name, email:nuevoOrganizador.email, organizacion:nuevoOrganizador.organizacion};
		db.open(function(err, db) {
			if(err) {
				res.status(500);
				return res.end();
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					res.send("Error en la autenticacion con la BD");
					return db.close();
				}
				db.collection("organizerscollection").insert(organizadorCreado, function(err, doc){
					res.status(201);
					res.header('Location','/api/organizers/'+organizadorCreado._id);
					res.end();
					db.close();
				});
			});
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
		return res.end();
	}
	if(organizador.name && organizador.email && organizador.organizacion) {
		db.open(function(err, db) {
			if(err) {
				res.status(500);
				return res.end();
			}
			if(!ObjectId.isValid(id)) {
				db.close();
				res.status(404);
				return res.send("Error, id no valida");
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					res.send("Error en la autenticacion con la BD");
				}
				db.collection("organizerscollection").save({"_id":ObjectId(id),"name": organizador.name, "email":organizador.email, "organizacion": organizador.organizacion});
				res.status(200);
				res.header('Location','/api/organizers/');
				res.end();
				db.close();
			});
		});
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
		return res.end();
	}
	db.open(function(err, db) {
		if(err) {
			res.status(500);
			return res.end();
		}
		if(!ObjectId.isValid(id)) {
			db.close();
			res.status(404);
			return res.send("Error, id no valida");
		}
		db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
			if(err) {
				res.status(500);
				res.send("Error en la autenticacion con la BD");
				return db.close();
			}
			db.collection("organizerscollection").remove({_id: ObjectId(id)}, function(err, doc){
				res.status(204);
				res.end();
				return db.close();
			});;
		});
	});
});

app.get('/api/tournaments/:id/competitors', function(req, res){
	var id = req.params.id;
	if(!id) {
		res.status(404);
		return res.send("Error id nula");
	}
	else {
		db.open(function(err, db) {
			if(err) {
				res.status(500);
				return res.end();
			}
			if(!ObjectId.isValid(id)) {
				db.close();
				res.status(404);
				return res.send("Error, id no valida");
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					res.send("Error en la autenticacion con la BD");
					return db.close();
				}
				db.collection("tournamentcollection").find(ObjectId(id)).each(function(err, document){
					if(err) {
						res.status(500);
						res.send("Error al obtener los competidores")
						return db.close();
					}
					if(document && document !== null && typeof document !== 'undefined' && document !== 'undefined') {
						var competitors = document.document.competitors;
						res.status(200);
						res.send(JSON.stringify(competitors));
						return db.close();
					}
				});
			});
		});
	}
});

app.post('/api/tournaments/:id/competitors', function(req, res){
	var id = req.params.id;
	var competitor = req.body;
	if(!id) {
		res.status(404);
		return res.end();
	}
	if(competitor.name && competitor.email && competitor.webpage) {
		db.open(function(err,db) {
			if(err) {
				res.status(500);
				return res.end();
			}
			if(!ObjectId.isValid(id)) {
				db.close();
				res.status(404);
				return res.send("Error, id no valida");
			}
			db.authenticate("tournamentplanneruser","tournamentplannerpassword", function(err, authdb){
				if(err) {
					res.status(500);
					return res.send("Error en la autenticacion con la BD");
				}
				db.collection("tournamentcollection").find(ObjectId(id)).each(function(err, document){
					if(err) {
						res.status(500);
						return res.send("Error creando el nuevo competidor");
					}
					if(document) {
						document.competitors.push(competitor);
						db.collection("tournamentcollection").save({"_id":ObjectId(id),document});
						res.status(201);
						res.end();
						db.close();
					}
				});
			});
		});
	}
});

app.get('/', function(req, res){
	res.status(200);
	res.send("Welcome to tournamentPlannerAPI");
})

app.listen(app.get('port'), function() {
	console.log("Inicialización de servidor de tournamentPlanner")
	MongoClient.connect(MongoUrl, function(error, db){
		assert.equal(null, error);
		console.log("Conectado a la BD de tournamentPlanner");
		db.close();
	})
});

module.exports = app;