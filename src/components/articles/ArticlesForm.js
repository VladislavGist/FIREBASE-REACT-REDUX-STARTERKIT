import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { moduleName } from '../../ducks/articles'
import { actions as articlesActions } from '../../ducks/articles'

import ErrorField from '../auth/ErrorField'
import Loader from '../common/Loader'

class ArticlesForm extends Component {
	render() {
		const { handleSubmit, loadingAdd } = this.props

		return (
			<div>
				<h2>Add article</h2>
				<form onSubmit={ handleSubmit }>
					<label>Title</label>
					<Field name='title' component={ ErrorField } />

					<label>Content</label>
					<Field name='content' component={ ErrorField } />

					<label>Image</label>
					<Field name='image' component={ ErrorField } type='file' value='ew' accept='image/jpeg,image/png' />

					<button>Add article</button>

					{
						loadingAdd && <Loader />
					}
				</form>	
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loadingAdd: state[moduleName].loadingAdd
})

export default connect(mapStateToProps, { ...articlesActions })(reduxForm({ form: 'articles' })(ArticlesForm))