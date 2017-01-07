var React = require('react');
var EventBus = require('./servicios/EventBus')
var API_torneos = require('./servicios/API_tournaments')

var TournamentList = React.createClass({
	getInitialState: function() {
		return {tournaments:[]}
	},
	componentDidMount: function() {
		EventBus.eventEmitter.addListener('newTournament', this.addTournament)
		this.refrescarTorneos();
	},
	addTournament: function(newTournament) {
		var torneos = this.state.tournaments;
		torneos.push(newTournament)
		this.setState({tournaments: torneos, detalle:undefined})
	},
	refrescarTorneos: function() {
		API_tournaments.getTournaments()
			.then(data => {
				this.setState({tournaments: data})
			})
	},
	seeDetails: function(i) {
		this.setState({detalle:i})
	},
	hideDetails: function() {
		this.setState({detalle:undefined})
	},
	render: function() {
		var tournaments = []
		for(var i=0; i<this.state.tournaments.length; i++) {
			var actual = this.state.tournaments[i]
			var elemento;
			if (this.state.detalle==i) {
				elemento = <DetallesTournament key={i}
											pos={i}
											name={actual.name}
											game={actual.game}
											matches={actual.matches}
											competitors={actual.competitors}
											handleOcultarDetalles={this.hideDetails}/>
			}
			else {
				elemento = <Tournament key={i}
									pos={i}
									name={actual.name}
									handleVerDetalles={this.seeDetails}/>
			}
			tournaments.push(elemento);
		}
		return <div id="lista">
					<h1>Lista de torneos</h1>
					{tournaments}
				</div>
	}
})

module.exports = TournamentList