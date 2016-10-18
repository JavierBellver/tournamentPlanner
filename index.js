var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var assert = require('assert');

var MongoClient = require('mongodb').MongoClient;
var MongoUrl = 'mongodb://localhost:27017/test'

var tournaments = [];

app.get('/api/tournaments')

app.get('*', function(req, res){
	res.send("Bienvenido a tournamentPlanner")
});

app.get('/api/tournaments', function(req, res){

});

app.get('/api/tournaments/:id', function(req, res) {

});

app.post('/api/tournaments', function(req, res){

});

app.put('/api/tournaments/:id', function(req, res){

});

app.delete('/api/tournaments/:id', function(req, res) {

});

app.get('/api/organizer', function(req, res){

});

app.get('/api/organizer/:id', function(req, res){

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
		console.log("Conectado a la BD de MongoDB");

		db.close();
	})
})