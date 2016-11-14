import Backbone from 'backbone'
import _ from 'underscore'
const STORE = _.extend(Backbone.Events,{
	_data: {
		tasks: []
	},
	_getData: function() {
		return this._data
	},
	_get: function(key) {
		return this._data[key]
	},
	_emitChange: function() {
		console.log("state updating")
		this.trigger('updateState')
		
	},
	_set: function(obj) {
		this._data = _.extend(this._data, obj)
		this._emitChange()
	},
	_update: function(obj,task) {
		for(var i = 0; i < this._data.tasks.length; i++){
			if(this._data.tasks[i].task === task){
				this._data.tasks[i].done = 'true'
			}
		}
		this._emitChange()

		// this._data = _.extend(this._data, obj)
		// this._emitChange()
	},
	_initialize: function() {
		
	}



})

export default STORE