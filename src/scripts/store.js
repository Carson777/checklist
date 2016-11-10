import Backbone from 'backbone'
import _ from 'backbone/node_modules/underscore'
import {ArticleCollection, ArticleModel} from "./models/models"

const STORE = _.extend(Backbone.Events,{
	_data: {
		collection: new ArticleCollection(),
		loaded: false,
		focusArticleId: null
	},
	_getData: function() {
		return this._data
	},
	_get: function(key) {
		return this._data[key]
	},
	_emitChange: function() {
		this.trigger('updateState')
	},
	_set: function(obj) {
		this._data = _.extend(this._data, obj)
		this._emitChange()
	},
	_initialize: function() {
		this._get("collection").on("sync",() => {
			this._set({
				"loaded": true
			})
		})
	}
})
STORE._initialize()
export default STORE