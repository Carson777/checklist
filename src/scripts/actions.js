import STORE from "./store"
//below is the import syntax when importing something by name from a file,
//and that thing is not the default export
import {ArticleCollection,ArticleModel} from "./models/models"

var ACTIONS = {
	fetchArticles: function() {
		var coll = STORE._get("collection")
		coll.fetch({
			data: {
				"api-key": coll._key
			}
		})
	},

	setFocusId: function(articleId) {
		STORE._set({
			focusArticleId: articleId
		})
	}
}
export default ACTIONS