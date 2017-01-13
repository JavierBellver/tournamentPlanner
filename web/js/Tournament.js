var React = require('react')

module.exports = React.createClass({
	verDetalles : function (evento) {
		this.props.handleVerDetalles(this.props.pos)
	},
	eliminar: function() {
		this.props.handleEliminarDetalles(this.props.id,this.props.pos)
	},
	editar: function() {
		this.props.handleEditarDetalles(this.props.id,this.props.pos)
	},
	render: function () {
		return <div className="tournament">
				<span className="nombre">{this.props.name}</span>&nbsp;
				<span className="detalles">
				<a href="#" onClick={this.verDetalles}>Detalles</a></span>
				<span className="editar">
				<a href="#" onClick={this.editar}>Editar</a></span>
				<span className="eliminar">
				<a href="#" onClick={this.eliminar}>Eliminar</a></span>
				</div>
	}
})