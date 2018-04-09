import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ProtectedRoute from '../common/ProtectedRoute'
import AdminPage from '../../components/routes/AdminPage'
import AuthPage from '../../components/routes/AuthPage'
import ArticlesList from '../../components/routes/ArticlesList'
import ArticlesPage from '../../components/routes/ArticlesPage'

class Root extends Component {
	handleAddArticle = ({ title, content, image }) => {
		this.props.addArticle({ title, content, image })
	}

	render() {
		return (
			<div>
				<ProtectedRoute path='/admin' component={ AdminPage } />
				<Route path='/auth' component={ AuthPage } />
				<ProtectedRoute path='/addArticles' component={ ArticlesPage } />
				<Route path='/articles' component={ ArticlesList } />
			</div>
		)
	}
}

export default Root