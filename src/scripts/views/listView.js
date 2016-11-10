import React from "react"
import Header from "./header"
import STORE from "../store"
import ACTIONS from "../actions"

var ListView = React.createClass({	
	componentWillMount: function() {
		STORE.on("updateState", () => {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchArticles()
	},
	componentWillUnmount: function() {
		STORE.off("updateState")
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function(){
		return (
			<div className="list-view">
				<Header />
				<div className="buttons">
					<button>news only</button>
					<button>all</button>
				</div>
				<ArticleContainer 
					collection={this.state.collection}
					loaded={this.state.loaded}
					focusArticleId={this.state.focusArticleId}
					/>
			</div>
		)
	}
})

var ArticleContainer = React.createClass({
	render: function(){
		var styleObject = {
			display: this.props.loaded ? 'none' : 'inline'
		}
	/* DEMO OF NEW SYNTAX VS OLD SYNTAX FOR FUNCTIONS
		var modelMap = function(mod) {
			return <Article model={mod} />
		}
		var modelMap = mod => <Article model={mod} />

		var jsxArr = this.props.collection.map(modelMap) */
		return(
			<div className="article-container">
				<img src="loading.gif" style={styleObject} />
				{this.props.collection.map(mod => <Article focusArticleId={this.props.focusArticleId} model={mod} />)}
			</div>
		)
	}
})

var Article = React.createClass({

	_toggleSnippet: function() {
		ACTIONS.setFocusId(this.props.model.get('_id'))
	},

	render: function(){
		var model = this.props.model
		var snippetStyle = {
			height: this.props.model.get('_id') === this.props.focusArticleId ? 'auto' : '0'
		}
		return (
			<div className="article">
				<a href={"#detail/" + model.get("_id")}><h5>{model.get('headline').main}</h5></a>
				<button onClick={this._toggleSnippet}>+</button>
				<p style={snippetStyle}>{model.get('snippet')}</p>
			</div>
			)
	}
})
export default ListView