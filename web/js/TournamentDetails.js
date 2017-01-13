var React = require('react')

module.exports = React.createClass({
	ocultarDetalles: function () {
		this.props.handleOcultarDetalles(this.props.pos);
	},
	render: function () {
		return <div className="detallesTournament">
				<span className="name">{this.props.name}</span>&nbsp;-&nbsp;
				<span className="game">{this.props.game}</span>
				<div className="matches">
					{this.props.matches}
				</div>
				<div className="competitors">
					{this.props.competitors}
				</div>
				<a href="#" onClick={this.ocultarDetalles}>Ocultar Detalles</a>
			</div>
	}
})