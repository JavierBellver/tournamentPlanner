var React = require('react')
var ReactDOM = require('react-dom')

var MainPage = React.createClass({
	onLogin: function () {

	},
	onLogout: function() {

	},
	render: function () {
		return 	<div>
					<h1>Bienvenido a TournamentPlanner</h1>
					<div id="loginComponent"></div>
					<div id="tournamentListComponent"></div>
				</div>
	}
})
module.exports = MainPage