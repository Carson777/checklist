import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListView from './views/listView'
import DetailView from './views/detailView'


var app = function() {

// MODEL
	var ArticleCollection = Backbone.Collection.extend({
		url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
		_key: "a30a58a6e722476eb77532b42ca43c9b",
		parse: function(rawResponse){
			var parsedResponse = rawResponse.response.docs
			return parsedResponse
		}
	})

	var ArticleModel = Backbone.Model.extend({
		url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
		_key: "a30a58a6e722476eb77532b42ca43c9b",
		parse: function(rawResponse){
			console.log(rawResponse)
			return rawResponse.response.docs[0]
		}
	})

// VIEW


// CONTROLLER
	var Controller = Backbone.Router.extend({
		routes: {
			'home': 'handleHome',
			'search/:term': 'handleSearch',
			'detail/:id': 'handleDetail',
			'*default': 'handleDefault'
		},
		handleHome: function(){
			var articleCollection = new ArticleCollection()
			articleCollection.fetch({
				data:{
					'api-key': articleCollection._key
				}
			})
			
			ReactDOM.render(<ListView collection={articleCollection} />, document.querySelector(".container"))

			// same as
			// var testResponse = function() {
			// 	console.log(articleCollection)
			// }
			// promise.then(testResponse)
		},
		handleSearch: function(term){
			var searchResults = new ArticleCollection()
			searchResults.fetch({
				data:{
					'api-key': searchResults._key,
					'q': term
				}
			})
			ReactDOM.render(<ListView collection={searchResults} />, document.querySelector(".container"))
		},
		handleDetail: function(id){
			var articleModel = new ArticleModel()
			articleModel.fetch({
				data:{
					'api-key': articleModel._key,
					'fq': `_id:${id}`
				}
			})
			ReactDOM.render(<DetailView model={articleModel} />, document.querySelector(".container"))
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