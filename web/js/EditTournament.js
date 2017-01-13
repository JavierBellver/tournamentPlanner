var React = require('react')
var API_tournaments = require('./servicios/API_tournaments')
var EventBus = require('./servicios/EventBus')

var EditTournament = React.createClass({
	clickEdit: function() {
		var editado = {
			name: this.campoName.value,
			game: this.campoGame.value,
			matches: [],
			competitors: [],
		}
		API_tournaments.editTournament(editado,this.props.id).then(function(datos){
			editado.id = this.props.id;
			EventBus.eventEmitter.emit('editedTournament', [editado])
		}.bind(this))
	},
	render: function() {
		return <div>
			<h1>Editar Torneo</h1>
			<input type="text" placeholder="Nombre del torneo"
				ref={(campo)=>{this.campoName=campo}}/>
			<input type="text" placeholder="Nombre del juego"
				ref={(campo)=>{this.campoGame=campo}}/>
			<button onClick={this.clickEdit}>Editar el torneo</button>
		</div>
	}
})
module.exports = EditTournament;