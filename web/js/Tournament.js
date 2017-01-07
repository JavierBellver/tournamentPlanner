var React = require('react')

module.exports = React.createClass({
	verDetalles : function (evento) {
		this.props.handleVerDetalles(this.props.pos)
	},
	render: function () {
		return <div className="tournament">
				<span className="nombre">{this.props.name}</span>&nbsp;
				<span className="detalles">
				<a href="#" onClick={this.verDetalles}>Detalles</a></span>
				</div>
	}
})