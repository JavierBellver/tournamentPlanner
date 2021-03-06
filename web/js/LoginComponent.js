var React = require('react')
var ReactDOM = require('react-dom')
var EventBus = require('./servicios/EventBus')
var $ = require('jquery')

var Login = React.createClass({
    getInitialState: function () {
      return {mensaje: 'Log In'}
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
              if(resultado.mensaje == "Autorizado") {
                localStorage.setItem('token',resultado.token)
                EventBus.eventEmitter.emit('loggedIn')
              }
          }.bind(this))
    },
    render: function () {
        return  <form className="login-form">
                  <h2>{this.state.mensaje}</h2>
                  <div className='form-group'>
                      <label htmlFor="email">Login</label>
                      <input
                          type="text"
                          id="inputLogin"
                          onKeyPress={this.onKeyPress}
                          onChange={this.onChange}
                          onBlur={this.onBlur} />
                      <span className="error-message error-email"></span>
                  </div>
                  <div className='form-group'>
                      <label htmlFor="password">Password</label>
                      <input
                          type="password"
                          id="inputPassword"
                          onKeyPress={this.onKeyPress}
                          onChange={this.onChange}
                          onBlur={this.onBlur} />
                  </div>
                  <button type="button" name="login-submit" onClick={ this.enviarDatosLogin }>Login</button>
                </form>
    }
})
module.exports = Login