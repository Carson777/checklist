import React from "react"
import Header from "./header"

var DetailView = React.createClass({
	getInitialState: function(){
		return{
			model: this.props.model
		}
	},
	componentWillMount: function(){
		//Here we will set up a sync eventListener for the model
		//when the model "syncs" (when it gets data) we should update state
		//which will re-render the component(ie DetailView) and its children
		var currentMeaningOfThis = this
		var updateState = function(){
			currentMeaningOfThis.setState({
					//triggers re-render
				model: currentMeaningOfThis.props.model
			})
		}
		this.props.model.on("sync", updateState)

	},
	render: function(){
		return (
			<div className="detail-view">
				<Header />
				<FullArticle model={this.state.model} />
			</div>

		)
	}
})

var FullArticle = React.createClass({
	render: function(){
		console.log("Data for Fullarticle component", this.props.model)
		return (
			<div className="full-article">
				<p>{this.props.model.get("snippet")}</p>
			</div>
		)
	}
})

export default DetailView