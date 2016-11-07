import React from "react"

var Header = React.createClass({
	_search: function(event){
		if(event.keyCode === 13){
			var input = event.target
			location.hash = "search/" + input.value
		}
	},
	render: function(){
		return (
			<header>
				<a href="#home"><h1>New York Times</h1></a>
				<input type="text" onKeyDown={this._search} placeholder="Search Articles"/>
			</header>
			)
	}
})

export default Header