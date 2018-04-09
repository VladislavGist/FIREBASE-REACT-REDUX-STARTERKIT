import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import auth, { moduleName as authModule } from '../ducks/auth'
import articles, { moduleName as articlesModule } from '../ducks/articles'

export default combineReducers({
	router,
	form,
	[authModule]: auth,
	[articlesModule]: articles
})