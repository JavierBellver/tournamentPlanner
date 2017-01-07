var React = require('react')
var API_tournaments = require('./servicios/API')
var EventBus = require('./servicios/EventBus')

var AddTournamentComponent = React.createClass({
	clickAdd: function () {
		var nuevo = {
			nombre: this.campoName.value,
			game: this.campoGame.value,
			matches: [],
			competitors: []
		}
		API_tournaments.createTournament(nuevo).then(function(datos){
			EventBus.eventEmitter.emitEvent('newTournament' [nuevo])
		})
	},
	render : function () {
		return <div>
			<h1>Nuevo Torneo</h1>
			<input type="text" placeholder="Nombre del torneo"
				ref={(campo)=>{this.campoName=campo}}/> </br>
			<input type="text" placeholder="Nombre del torneo"
				ref={(campo)=>{this.campoGame=campo}}/> </br>
			<button onClick={this.clickAdd}>Crear nuevo Torneo</button>
		</div>
	}
})
module.exports = AddTournamentComponent;