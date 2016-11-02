var assert = require('assert');
var supertest = require('supertest');
var app = require('../index');


describe("Controlador Principal", function(){
	describe("Obtener Coleccion de torneos", function(){
		it("Debeŕía obtener la colección en un array", function(done) {
			supertest(app)
			.get('/api/tournaments')
			.expect(200)
			.expect(function(res) {
				assert(res.body instanceof Array);
			})
			.end(done);
		});

		it("Si hay un objeto en la colección debe tener los campos correctos", function(done) {
			supertest(app)
			.get('/api/tournaments')
			.expect(200)
			.expect(function(res){
				assert(res.body.length != 0);
				var obj = res.body[0];
				assert(obj.name && obj.game && obj.matches && obj.competitors);
			})
			.end(done);
		});
	});

	describe("Obtener un torneo por id", function(){
		it("Debería obtener un código 404",function(done) {
			supertest(app)
			.get('/api/tournaments/999999')
			.expect(404)
			.end(done);
		});

		it("Deberia obtener un objeto tournament", function(done) {
			supertest(app)
			.get('/api/tournaments/5817327cdbab100cffe3ddd5')
			.expect(200)
			.expect(function(res){
				assert(res.body.name && res.body.game && res.body.matches && res.body.competitors);
			})
			.end(done);
		});
	});

	describe("Crear un nuevo torneo", function(){
		it("El torneo no debería crearse",function(done) {
			var torneo = {};
			supertest(app)
			.post('/api/tournaments',torneo)
			.expect(400)
			.end(done);
		});

		it("El torneo debería crearse",function(done) {
			var torneo = {"name":"haihai","game":"Overwatch","matches":[],"competitors":[]};
			supertest(app)
			.post('/api/tournaments')
			.send(torneo)
			.expect(201)
			.end(done);
		});
	});

	describe("Modificar un torneo", function(){
		it("El torneo debería haberse modificado",function(done) {
			var torneo = {"name":"dala","game":"Overwatch","matches":[],"competitors":[]};
			supertest(app)
			.put('/api/tournaments/5817327cdbab100cffe3ddd5')
			.send(torneo)
			.expect(200)
			.end(done);
		});
	});

	describe("Eliminar un torneo", function(){
		it("El torneo deberia eliminarse",function(done) {
			supertest(app)
			.delete('/api/tournaments/5817327cdbab100cffe3ddd5')
			.expect(200)
			.end(done);
		})
	});

	describe("Obtener Coleccion de organizadores", function(){
		it("Debeŕía obtener la colección en un array", function(done) {
			supertest(app)
			.get('/api/organizers')
			.expect(200)
			.expect(function(res) {
				assert(res.body instanceof Array);
			})
			.end(done);
		});

		it("Si hay un objeto en la colección debe tener los campos correctos", function(done) {
			supertest(app)
			.get('/api/organizers')
			.expect(200)
			.expect(function(res){
				assert(res.body.length != 0);
				var obj = res.body[0];
				assert(obj.name && obj.email && obj.organizacion);
			})
			.end(done);
		});
	});

	describe("Obtener un organizador por id", function(){
		it("Debería obtener un código 404",function(done) {
			supertest(app)
			.get('/api/organizers/999999')
			.expect(404)
			.end(done);
		});

		it("Deberia obtener un objeto organizador", function(done) {
			supertest(app)
			.get('/api/organizers/5818cd148e43e719823877a9')
			.expect(200)
			.expect(function(res){
				console.log(res.body);
				assert(res.body.name && res.body.email && res.body.organizacion);
			})
			.end(done);
		});
	});

	describe("Crear un nuevo organizador", function(){
		it("El organizador no debería crearse",function(done) {
			var organizador = {};
			supertest(app)
			.post('/api/organizers',organizador)
			.expect(400)
			.end(done);
		});

		it("El organizador debería crearse",function(done) {
			var organizador = {"name":"hoihoi","email":"overwatch@gmail.es","organizacion":"Ito Illos"};
			supertest(app)
			.post('/api/organizers')
			.send(organizador)
			.expect(201)
			.end(done);
		});
	});

	describe("Modificar un organizador", function(){
		it("El organizador debería haberse modificado",function(done) {
			var organizador = {"name":"Hello","email":"overwatch@gmail.es","organizacion":"Ito Illos"};
			supertest(app)
			.put('/api/organizers/580f4373f96202adeed45399')
			.send(organizador)
			.expect(200)
			.end(done);
		});
	});

	describe("Eliminar un torneo", function(){
		it("El torneo deberia eliminarse",function(done) {
			supertest(app)
			.delete('/api/organizers/580f4373f96202adeed45399')
			.expect(200)
			.end(done);
		})
	});

	describe("Obtener los competidores de un torneo", function(){
		it("Debe obtener los competidores del torneo seleccionado",function(done) {
			supertest(app)
			.get('/api/tournaments/5817328cdbab100cffe3ddd7/competitors')
			.expect(200)
			.end(done);
		});
	});

	describe("Añadir un competidor a un torneo", function(){
		it("Debe crear un nuevo competidor en el torneo seleccionado",function(done) {
			var competidor = {"name":"HeyImACompetitor","email":"competitor@gmail.es","webpage":"teamwebpage.com"};
			supertest(app)
			.post('/api/tournaments/5817327cdbab100cffe3ddd5/competitors')
			.send(competidor)
			.expect(201)
			.end(done);
		});
	});
});