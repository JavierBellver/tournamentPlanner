var React = require('react')
var ReactDOM = require('react-dom')
var jwt = require('jwt-simple');
var $ = require('jquery')

var LoginComponent = require('./LoginComponent')
ReactDOM.render(<LoginComponent/>, document.getElementById('loginComponent'))
