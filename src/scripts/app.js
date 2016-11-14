import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListView from './views/listView'
import DoneView from './views/doneView'
import UnfinishedView from './views/unfinishedView'
import STORE from './store'

var app = function() {
	var Controller = Backbone.Router.extend({
		routes: {
			'all': 'handleAll',
			'done': 'handleDone',
			'unfinished': 'handleUnfinished',
			'*default': 'handleDefault'
		},
		handleAll: function(){
			ReactDOM.render(<ListView/>, document.querySelector(".container"))
		},
		handleDone: function(){
			ReactDOM.render(<DoneView/>, document.querySelector(".container"))
			STORE._emitChange()
		},
		handleUnfinished: function(){
			ReactDOM.render(<UnfinishedView/>, document.querySelector(".container"))
		},
		handleDefault: function(){
			location.hash = 'all'
		},
		initialize: function(){
			Backbone.history.start()
		}		
	})
	var controller = new Controller(); // controller.initalize()
}


app()