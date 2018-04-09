import { appName } from '../config'
import firebase from 'firebase'
import { Record } from 'immutable'

import { generateId, normalizeFirebaseDatas } from '../ducks/utils'

export const moduleName = 'articles'

export const types = {
	ADD_ARTICLE_REQUEST: `${ appName }/${ moduleName }/ADD_ARTICLE_REQUEST`,
	ADD_ARTICLE_SUCCESS: `${ appName }/${ moduleName }/ADD_ARTICLE_SUCCESS`,
	ADD_ARTICLE_ERROR: `${ appName }/${ moduleName }/ADD_ARTICLE_ERROR`,

	FETCH_ARTICLES_REQUEST: `${ appName }/${ moduleName }/FETCH_ARTICLES_REQUEST`,
	FETCH_ARTICLES_SUCCESS: `${ appName }/${ moduleName }/FETCH_ARTICLES_SUCCESS`,
	FETCH_ARTICLES_ERROR: `${ appName }/${ moduleName }/FETCH_ARTICLES_ERROR`
}

const initialState = Record ({
	errorAdd: false,
	loadingAdd: false,

	errorFetch: false,
	loadingFetch: false,
	articlesList: null
})

export default (state = new initialState(), action) => {
	const { type, payload } = action

	switch (type) {
	case types.ADD_ARTICLE_REQUEST: return state.set('errorAdd', false).set('loadingAdd', true)
	case types.ADD_ARTICLE_SUCCESS: return state.set('errorAdd', false).set('loadingAdd', false)
	case types.ADD_ARTICLE_ERROR: return state.set('errorAdd', true).set('loadingAdd', false)
	case types.FETCH_ARTICLES_REQUEST: return state.set('errorFetch', false).set('loadingFetch', true).set('articlesList', null)
	case types.FETCH_ARTICLES_SUCCESS: return state.set('errorFetch', false).set('loadingFetch', false).set('articlesList', payload)
	case types.FETCH_ARTICLES_ERROR: return state.set('errorFetch', true).set('loadingFetch', false).set('articlesList', null)
	default: return state	
	}
}

export const actions = {
	addArticle: (uid, { title, content, image }) => dispatch => {
		dispatch({ type: types.ADD_ARTICLE_REQUEST })

		let imageFile = image[0]
		let imageName = generateId()

		let uploadTask = firebase.storage().ref(`images/${ imageName }`).put(imageFile)

		uploadTask.on('state_changed',
			snapshot => {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log('Upload is ' + progress + '% done')
			},
			error => dispatch({ type: types.ADD_ARTICLE_ERROR }),
			() => {
				const downloadURL = uploadTask.snapshot.downloadURL

				firebase.database().ref(`users/${ uid }/articles/`)
					.push({ title, content, image: downloadURL, moderate: false }, error => {
						error && dispatch({ type: types.ADD_ARTICLE_ERROR })

						dispatch({ type: types.ADD_ARTICLE_SUCCESS })
					})
			}
		)
	},
	loadArticles: () => dispatch => {
		dispatch({ type: types.FETCH_ARTICLES_REQUEST })

		firebase.database().ref('users').on('value',
			datas => {
				let articlesList = []

				normalizeFirebaseDatas(datas.val()).forEach(item => {
					normalizeFirebaseDatas(item.articles).forEach(card => card.moderate && articlesList.push(card))
				})
				
				dispatch({ type: types.FETCH_ARTICLES_SUCCESS, payload: articlesList })
			},
			() => dispatch({ type: types.ADD_ARTICLE_ERROR })
		)
	}
}