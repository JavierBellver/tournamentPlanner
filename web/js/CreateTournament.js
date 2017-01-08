var React = require('react')
var API_tournaments = require('./servicios/API_tournaments')
var EventBus = require('./servicios/EventBus')

var AddTournamentComponent = React.createClass({
	clickAdd: function () {
		var nuevo = {
			name: this.campoName.value,
			game: this.campoGame.value,
			matches: [],
			competitors: [],
		}
		API_tournaments.createTournament(nuevo).then(function(datos){
			EventBus.eventEmitter.emit('newTournament', [nuevo])
		})
	},
	render : function () {
		return <div>
			<h1>Nuevo Torneo</h1>
			<input type="text" placeholder="Nombre del torneo"
				ref={(campo)=>{this.campoName=campo}}/>
			<input type="text" placeholder="Nombre del juego"
				ref={(campo)=>{this.campoGame=campo}}/>
			<button onClick={this.clickAdd}>Crear nuevo Torneo</button>
		</div>
	}
})
module.exports = AddTournamentComponent;