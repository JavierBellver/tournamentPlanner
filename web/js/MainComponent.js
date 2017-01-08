var React = require('react')
var ReactDOM = require('react-dom')
var LoginComponent = require('./LoginComponent')
var EventBus = require('./servicios/EventBus')
var TournamentList = require('./TournamentListComponent')

var MainPage = React.createClass({
	getInitialState: function() {
		return {login: true, tournamentslist: false}
	},
	componentDidMount: function() {
		EventBus.eventEmitter.addListener('loggedIn', this.onLogin)
		this.renderLogin();
	},
	onLogin: function () {
		this.renderList();
	},
	onLogout: function() {
		localStorage.removeItem('token');
		this.renderLogin();
	},
	renderLogin: function() {
		ReactDOM.render(<LoginComponent/>, document.getElementById('loginComponent'));
		ReactDOM.unmountComponentAtNode(document.getElementById('tournamentListComponent'));
	},
	renderList: function() {
		ReactDOM.render(<TournamentList/>, document.getElementById('tournamentListComponent'));
		ReactDOM.unmountComponentAtNode(document.getElementById('loginComponent'));
	},
	render: function () {
		return 	<div>
					<h1>Bienvenido a TournamentPlanner</h1>
					<ul>
					  <li><a href="#" onClick={this.onLogout}>Logout</a></li>
					</ul> 
					<div id="loginComponent"></div>
					<div id="tournamentListComponent"></div>
				</div>
	}
})
module.exports = MainPage