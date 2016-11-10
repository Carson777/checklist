import React from "react"
import Header from "./header"

var ListView = React.createClass({

	componentWillMount: function() {
		this._listenToCollection(this.props.collection)
	},

	componentWillReceiveProps: function(newProps) {
		this._listenToCollection(newProps.collection)
	},

	getInitialState: function(){
		return {
			collection: this.props.collection,
			isLoaded: false
		}
	},
	_listenToCollection: function(coll){
		// gotta create an "addeventlistener" (or, ".on()") that will 1) set a state on the view once the collection has synced
		// 2) setting a state will cause the view to re-render with the search term/results
		this.setState({
			isLoaded: false
		})
		var currentMeaningOfThis = this
		var updateState = function(){
			console.log('updating state')
			currentMeaningOfThis.setState({
				collection: currentMeaningOfThis.props.collection,
				isLoaded: true
			})
		}
		coll.on("sync", updateState)
	},
	_filterForNews: function() {
		var decider = function(model) {
			if (model.get('type_of_material') === 'News') {
				return true
			}
			else false
		}
		var newsOnly = this.props.collection.filter(decider)
		this.setState({
			collection: newsOnly
		})
	},
	_filterForAll: function() {
		this.setState({
			collection: this.props.collection
		})
	},
	render: function(){
		return (
			<div className="list-view">
				<Header />
				<div className="butts">
					<button onClick={this._filterForNews}>news only</button>
					<button onClick={this._filterForAll}>all</button>
				</div>
				<ArticleContainer 
					collection={this.state.collection} 
					loaded={this.state.isLoaded}
					/>
			</div>
		)
	}
})

var ArticleContainer = React.createClass({
	_makeArticles: function(){
		var jsxArray = []
		for(var i = 0; i < this.props.collection.models.length; i++){
			var articleModel = this.props.collection.models[i]
			jsxArray.push(<Article model={articleModel} />)
		}
		return jsxArray
	},
	// _makeArticle: function() {

	// },
	render: function(){
		var styleObject = {
			display: this.props.loaded? 'none' : 'inline'
		}
		return(
			<div className="article-container">
				<img src="loading.gif" style={styleObject} />
				{this._makeArticles()}
			</div>
		)
	}
})

var Article = React.createClass({

	getInitialState: function(){
		return {
			snippetHeight: 0,
			buttSymbol: "+"
		}
	},

	_toggleSnippet: function(){
		this.setState({
			snippetHeight:this.state.buttSymbol === '+' ? 'auto' : 0,
			buttSymbol: this.state.buttSymbol === '+' ? '-' : '+'
		})



		// if(this.state.buttSymbol === '+'){
		// 	this.setState({
		// 		snippetHeight: 'auto',
		// 		buttSymbol: "-"
		// 	})
		// }
		// else{
		// 	this.setState({
		// 		snippetHeight: 0,
		// 		buttSymbol: "+"
		// 	})
		// }
	},

	render: function(){
		var model = this.props.model
		var snippetStyle = {
			height: this.state.snippetHeight
		}
		return (
			<div className="article">
				<a href={"#detail/" + model.get("_id")}><h5>{model.get('headline').main}</h5></a>
				<button onClick={this._toggleSnippet}>{this.state.buttSymbol}</button>
				<p style={snippetStyle}>{model.get('snippet')}</p>
			</div>
			)
	}
})
export default ListView