import STORE from "./store"
//below is the import syntax when importing something by name from a file,
//and that thing is not the default export
import {ArticleCollection,ArticleModel} from "./models/models"

var ACTIONS = {
	addTask: function(newObj){
		console.log("adding task")
		STORE._set({
			tasks: STORE._get('tasks').concat([newObj])
		})

	},
	_objConverter: function(taskName){
		var newObj = {'task': taskName,
						'done': 'false'}
		this.addTask(newObj)
	},
	_setStatus: function(e){
		var currentTask = e.target.id
		STORE._update({'task': currentTask,
				'done': 'true'}, currentTask)
	},
	_changeHash: function(e){
		location.hash = e.target.id
	}
}
export default ACTIONS