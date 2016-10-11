var express = require('express');
var app = express();

var bodyParser = require('body-parser');



app.get('*', function(req, res){
	res.send("Bienvenido a tournamentPlanner")
})

app.listen(3000, function() {
	console.log("Inicialización de servidor de tournamentPlanner")
})