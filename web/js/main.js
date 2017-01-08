var React = require('react')
var ReactDOM = require('react-dom')
var jwt = require('jwt-simple');
var $ = require('jquery')

var MainComponent = require('./MainComponent')
ReactDOM.render(<MainComponent/>, document.getElementById('mainPageContainer'));
