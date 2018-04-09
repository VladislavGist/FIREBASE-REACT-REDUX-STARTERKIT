import firebase from 'firebase'
import { Record } from 'immutable'
import { push } from 'react-router-redux'

import { appName } from '../config'

export const moduleName = 'auth'

const ReducerSchema = Record({
	user: null,
	userError: null,
	userLoading: false,

	cards: null,
	cardsLoading: false,
	cardsError: false
})

export const types = {
	SIGN_UP_REQUEST: `${ appName }/${ moduleName }/SIGN_UP_REQUEST`,
	SIGN_UP_SUCCESS: `${ appName }/${ moduleName }/SIGN_UP_SUCCESS`,
	SIGN_UP_ERROR: `${ appName }/${ moduleName }/SIGN_UP_ERROR`,

	SIGN_IN_REQUEST: `${ appName }/${ moduleName }/SIGN_IN_REQUEST`,
	SIGN_IN_SUCCESS: `${ appName }/${ moduleName }/SIGN_IN_SUCCESS`,
	SIGN_IN_ERROR: `${ appName }/${ moduleName }/SIGN_IN_ERROR`,

	SIGN_OUT_REQUEST: `${ appName }/${ moduleName }/SIGN_OUT_REQUEST`,
	SIGN_OUT_SUCCESS: `${ appName }/${ moduleName }/SIGN_OUT_SUCCESS`,
	SIGN_OUT_ERROR: `${ appName }/${ moduleName }/SIGN_OUT_ERROR`,

	FETCH_USER_CARDS_REQUEST: `${ appName }/${ moduleName }/FETCH_USER_CARDS_REQUEST`,
	FETCH_USER_CARDS_SUCCESS: `${ appName }/${ moduleName }/FETCH_USER_CARDS_SUCCESS`,
	FETCH_USER_CARDS_ERROR: `${ appName }/${ moduleName }/FETCH_USER_CARDS_ERROR`
}

export default (state = new ReducerSchema(), action) => {
	const { type, payload, error } = action

	switch (type) {
	case types.SIGN_UP_REQUEST: return state.set('userLoading', true).set('userError', false).set('user', null)
	case types.SIGN_UP_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload.user)
	case types.SIGN_UP_ERROR: return state.set('userError', error)

	case types.SIGN_IN_REQUEST: return state.set('userLoading', true).set('userError', false)
	case types.SIGN_IN_SUCCESS: return state.set('userLoading', false).set('userError', false).set('user', payload.user)
	case types.SIGN_IN_ERROR: return state.set('userError', error)

	case types.SIGN_OUT_REQUEST: return state.set('userLoading', true)
	case types.SIGN_OUT_SUCCESS: return state
	case types.SIGN_OUT_ERROR: return state.set('userError', error)

	case types.FETCH_USER_CARDS_REQUEST: return state.set('cardsLoading', true).set('cardsError', false)
	case types.FETCH_USER_CARDS_SUCCESS: return state.set('cardsLoading', false).set('cardsError', false).set('cards', payload)
	case types.FETCH_USER_CARDS_ERROR: return state.set('cardsLoading', false).set('cardsError', true)		

	default: return state
	}
}

export const actions = {
	signUp: (email, password) => dispatch => {
		dispatch({ type: types.SIGN_UP_REQUEST })

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				// create user and add user to db
				firebase.database().ref(`users/${ user.uid }`).set({
					articles: '',
					name: 'Имя пользователя',
					email: 'такой то емейл',
					role: 'user'
				})

				dispatch({ type: types.SIGN_UP_SUCCESS, payload: { user } })
			})
			.then(() => dispatch(push('/admin')))
			.catch(error => dispatch({ type: types.SIGN_UP_ERROR, error }))
	},
	signIn: (email, password) => dispatch => {
		dispatch({ type: types.SIGN_IN_REQUEST })

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => dispatch({ type: types.SIGN_IN_SUCCESS, payload: { user } }))
			.then(() => dispatch(push('/admin')))
			.catch(error => dispatch({ type: types.SIGN_IN_ERROR, error }))
	},
	signOut: () => dispatch => {
		dispatch({ type: types.SIGN_OUT_REQUEST })

		firebase.auth().signOut()
			.then(() => dispatch({ type: types.SIGN_OUT_SUCCESS }))
			.then(() => dispatch(push('/auth')))
			.catch(err => dispatch({ type: types.SIGN_OUT_ERROR, payload: err }))
	},
	fetchUserCards: uid => dispatch => {
		dispatch({ type: types.FETCH_USER_CARDS_REQUEST })

		firebase.database().ref(`users/${ uid }/articles`).on('value',
			datas => dispatch({ type: types.FETCH_USER_CARDS_SUCCESS, payload: datas.val() }),
			() => dispatch({ type: types.FETCH_USER_CARDS_ERROR })
		)
	}
}

firebase.auth().onAuthStateChanged(user => {
	const store = require('../redux/store').default

	user && store.dispatch({ type: types.SIGN_IN_SUCCESS, payload: { user }})
})
