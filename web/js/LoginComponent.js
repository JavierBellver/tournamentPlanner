var React = require('react')
var $ = require('jquery')

var Login = React.createClass({
    getInitialState: function () {
      return {mensaje: ''}
    },
    enviarDatosLogin: function () {
      fetch('http://' + window.location.host + '/login', {
        method: "POST", 
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ login: $("#inputLogin").val(), password: $("#inputPassword").val(), })
      })
          .then(function(respuesta){
              return respuesta.json()
          })
          .then(function(resultado){
              //el API también nos envía la hora, pero la ignoramos
              this.setState({mensaje:resultado.mensaje})
          }.bind(this))
    },
    render: function () {
        return <div>
              <h1>El API dice: {this.state.mensaje}</h1>
              <input id="inputLogin" type="text"></input>
              <input id="inputPassword" type="password"></input>
              <button onClick={this.enviarDatosLogin}>Obtener mensaje del API</button>
            </div>
    }
})

module.exports = Login