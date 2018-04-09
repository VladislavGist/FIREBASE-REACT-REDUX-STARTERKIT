import React, { Component } from 'react'

class ArticleItem extends Component {
	render() {
		const { data: { title, content, image } } = this.props

		return (
			<div>
				<hr />
				<img height='250' src={ image } alt='img' />
				<p>Title: { title }</p>
				<p>Content: { content }</p>
			</div>
		)
	}
}

export default ArticleItem