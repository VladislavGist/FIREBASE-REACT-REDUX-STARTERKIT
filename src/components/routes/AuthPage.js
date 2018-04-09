import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { actions as authActions, moduleName } from '../../ducks/auth'

import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'
import Loader from '../common/Loader'

class AuthPage extends Component {
	handleSignIn = ({ email, password }) => {
		this.props.signIn(email, password)
	}

	handleSignUp = ({ email, password }) => {
		this.props.signUp(email, password)
	}

	render() {
		const { loading, error } = this.props

		return (
			<div>
				AuthPage
				<NavLink to='/auth/signin' activeStyle={ { color: 'red' } }>signin</NavLink>
				<NavLink to='/auth/signup' activeStyle={ { color: 'red' } }>signup</NavLink>
				<Route path='/auth/signin' render={ () => <SignInForm onSubmit={ this.handleSignIn } /> } />
				<Route path='/auth/signup' render={ () => <SignUpForm onSubmit={ this.handleSignUp } /> } />

				{ loading && !error && <Loader /> }
			</div>
		)
	}
}

export default connect(state => ({
	loading: state[moduleName].loading,
	error: state[moduleName].error
}), { ...authActions })(AuthPage)