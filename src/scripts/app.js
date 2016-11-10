import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListView from './views/listView'
import DetailView from './views/detailView'

var app = function() {
	var Controller = Backbone.Router.extend({
		routes: {
			'home': 'handleHome',
			'search/:term': 'handleSearch',
			'detail/:id': 'handleDetail',
			'*default': 'handleDefault'
		},
		handleHome: function(){
			ReactDOM.render(<ListView />, document.querySelector(".container"))
		},
		handleSearch: function(){
			ReactDOM.render(<ListView />, document.querySelector(".container"))
		},
		handleDetail: function(){
			ReactDOM.render(<DetailView />, document.querySelector(".container"))
		},
		handleDefault: function(){
			location.hash = 'home'
		},
		initialize: function(){
			Backbone.history.start()
		}		
	})
	var controller = new Controller(); // controller.initalize()
}


app()