import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'

import ErrorField from './ErrorField'

class SignUpForm extends Component {
	render() {
		const { handleSubmit } = this.props

		return (
			<div>
				<h2>SignUpForm</h2>
				<form onSubmit={ handleSubmit }>
					<label>Email</label>
					<Field name='email' component={ ErrorField } />

					<label>Password</label>
					<Field name='password' component={ ErrorField } type='password' />

					<input type='submit' value='Login' />
				</form>
			</div>
		)
	}
}

const validate = ({ email, password }) => {
	const errors = {}

	if (!email) errors.email = 'Email is required'
	else if (!emailValidator.validate(email)) errors.email = 'Invalid email'

	if (!password) errors.password = 'Password is required'
	else if (password.length < 8) errors.password = 'Password must be > 8 symbols'

	return errors
}

export default reduxForm({
	form: 'auth',
	validate
})(SignUpForm)