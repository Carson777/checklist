import React from "react"
import STORE from "../store"
import ACTIONS from "../actions"

var UnfinishedView = React.createClass({	
	componentWillMount: function() {
		STORE.on("updateState", () => {
			this.setState(STORE._getData())
		})
	},
	getInitialState: function() {
		return STORE._getData()
	},
	_readInput: function(e) {
		if(e.keyCode === 13){
			var taskName = e.target.value
			e.target.value = ""
			ACTIONS._objConverter(taskName)
		}
	},
	render: function(){
		console.log(this.state)
		return (
			<div className="list-view">
				<p>Uncompleted Tasks</p>
				<input onKeyDown = {this._readInput}/>
				<button id='All' onClick={ACTIONS._changeHash}>All</button>
				<button id='done' onClick={ACTIONS._changeHash}>Done</button>
				<button id='unfinished' onClick={ACTIONS._changeHash}>Unfinished</button>
				<ListContainer data = {this.state} />
			</div>
		)
	}
})
var ListContainer = React.createClass({
	render: function(){
		return (
			<div className="listContainer">
				{this.props.data.tasks.map(mod => <Task data={mod} />)}
			</div>
		)
	}

})
var Task = React.createClass({
	render: function(){
		var self = this
		if(this.props.data.done === 'false'){
			return (
				<div className="taskContainer">
					<p className="task">{this.props.data.task}</p>
					<button className="taskButton" id={self.props.data.task} onClick={ACTIONS._setStatus}/>
					
				</div>
			)
		} else {
			return (
				null
			)
		}
	}
})







export default UnfinishedView