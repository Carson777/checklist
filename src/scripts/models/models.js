import Backbone from "backbone"


//use this when you are exporting more than one thing out of your file
//instead of using export default "name"
export var ArticleCollection = Backbone.Collection.extend({
	url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
	_key: "a30a58a6e722476eb77532b42ca43c9b",
	parse: function(rawResponse){
		var parsedResponse = rawResponse.response.docs
		return parsedResponse
	}
})

export var ArticleModel = Backbone.Model.extend({
	url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
	_key: "a30a58a6e722476eb77532b42ca43c9b",
	parse: function(rawResponse){
		console.log(rawResponse)
		return rawResponse.response.docs[0]
	}
})