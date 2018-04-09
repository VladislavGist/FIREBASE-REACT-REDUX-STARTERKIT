import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moduleName } from '../../ducks/articles'
import { actions as articlesActions } from '../../ducks/articles'

import Loader from '../common/Loader'
import ArticleItem from '../articles/ArticleItem'

class ArticlesList extends Component {
	componentDidMount() {
		this.props.loadArticles()
	}

	render() {
		const { loadingFetch, articlesList, errorFetch } = this.props

		return (
			<div>
				Articles page
				{
					articlesList && articlesList.map(article => {
						return <ArticleItem data={ article } key={ article.key } />
					})
				}
				{
					loadingFetch && !errorFetch && <Loader />
				}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	loadingFetch: state[moduleName].loadingFetch,
	articlesList: state[moduleName].articlesList,
	errorFetch: state[moduleName].errorFetch
})

export default connect(mapStateToProps, { ...articlesActions })(ArticlesList)