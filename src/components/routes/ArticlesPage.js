import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moduleName } from '../../ducks/auth'

import { actions as articlesActions } from '../../ducks/articles'

import ArticlesForm from '../../components/articles/ArticlesForm'

class ArticlesPage extends Component {
	handleAddArticle = ({ title, content, image }) => {
		const { uid } = this.props

		this.props.addArticle(uid, { title, content, image })
	}

	render() {
		return <ArticlesForm onSubmit={ this.handleAddArticle } />
	}
}

const mapStateToProps = state => ({
	uid: state[moduleName].user.uid
})

export default connect(mapStateToProps, { ...articlesActions })(ArticlesPage)