import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class SignInForm extends Component {
	render() {
		const { handleSubmit } = this.props

		return (
			<div>
				<h2>SignInForm</h2>
				<form onSubmit={ handleSubmit }>
					<label>Email</label>
					<Field name='email' component='input' />
				
					<label>Password</label>
					<Field name='password' component='input' type='password' />

					<input type='submit' value='Login' />
				</form>
			</div>
		)
	}
}

export default reduxForm({
	form: 'auth'
})(SignInForm)