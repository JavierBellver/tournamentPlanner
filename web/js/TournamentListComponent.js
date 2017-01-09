var React = require('react');
var ReactDOM = require('react-dom');
var Tournament = require('./Tournament')
var TournamentDetails = require('./TournamentDetails')
var AddTournamentComponent = require('./CreateTournament')
var EditTournament = require('./EditTournament')
var EventBus = require('./servicios/EventBus')
var API_tournaments = require('./servicios/API_tournaments')

function findById(array,value) {
	for(var i=0; i < array.length;i++) {
		if(array[i].id === value) {
			return i
		}
	}
	return -1;
}

var TournamentList = React.createClass({
	getInitialState: function() {
		return {tournaments:[]}
	},
	componentDidMount: function() {
		EventBus.eventEmitter.addListener('newTournament', this.addTournament)
		EventBus.eventEmitter.addListener('editedTournament', this.onEditTournament)
		this.refrescarTorneos();
		this.renderAddTournament();
	},
	addTournament: function(newTournament) {
		var torneos = this.state.tournaments;
		torneos.push(newTournament[0])
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
	onEditTournament: function(edited) {
		var torneos = this.state.tournaments;
		var i = findById(torneos,edited.id);
		torneos[i] = edited[0];
		this.setState({tournaments: torneos})
		ReactDOM.unmountComponentAtNode(document.getElementById('editTournament'));
	},
	deleteDetails: function(id,pos) {
		API_tournaments.deleteTournament(id)
			.then(data => {
				var torneos = this.state.tournaments;
				torneos = torneos.filter(function(t){
					return t._id != id;
				})
				this.setState({tournaments: torneos})
			})
	},
	renderAddTournament: function() {
		ReactDOM.render(<AddTournamentComponent/>, document.getElementById('addNewTournament'));
	},
	renderEditTorneo: function(id,pos) {
		ReactDOM.render(<EditTournament id={id}/>, document.getElementById('editTournament'));
	},
	render: function() {
		var tournaments = []
		for(var i=0; i<this.state.tournaments.length; i++) {
			var actual = this.state.tournaments[i]
			var elemento;
			if (this.state.detalle==i) {
				elemento = <TournamentDetails key={i}
											pos={i}
											id={actual._id}
											name={actual.name}
											game={actual.game}
											matches={actual.matches}
											competitors={actual.competitors}
											handleOcultarDetalles={this.hideDetails}/>
			}
			else {
				elemento = <Tournament key={i}
									pos={i}
									id={actual._id}
									name={actual.name}
									handleVerDetalles={this.seeDetails}
									handleEditarDetalles={this.renderEditTorneo}
									handleEliminarDetalles={this.deleteDetails}/>
			}
			tournaments.push(elemento);
		}
		return <div id="lista">
					<h1>Lista de torneos</h1>
					<div id="editTournament"></div>
					{tournaments}
					<div id="addNewTournament"></div>
				</div>
	}
})
module.exports = TournamentList