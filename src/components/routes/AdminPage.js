import React, { Component } from 'react'
import { connect } from 'react-redux'

import { normalizeFirebaseDatas } from '../../ducks/utils'

import { actions as authActions, moduleName } from '../../ducks/auth'

import Loader from '../common/Loader'

class AdminPage extends Component {
	componentWillMount() {
		const { uid, fetchUserCards } = this.props

		fetchUserCards(uid)
	}

	handleSignOut = () => {
		this.props.signOut()
	}

	render() {
		const { cards, cardsLoading, cardsError } = this.props

		return (
			<div>
				AdminPage
				<button onClick={ this.handleSignOut }>SignOut</button>

				<div>
					Cards
					{
						cardsLoading && !cardsError && <Loader />
					}
					{
						cards && normalizeFirebaseDatas(cards).map(card => {
							return (
								<div key={ card.key }>
									<hr />
									<div>
										<img src={ card.image } alt='img' height='250' />
										<p>Title { card.title }</p>
										<p>Content { card.content }</p>
									</div>
								</div>
							)
						})
					}
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => ({
	uid: state[moduleName].user.uid,
	cards: state[moduleName].cards,
	cardsLoading: state[moduleName].cardsLoading,
	cardsError: state[moduleName].cardsError
})

export default connect(mapStateToProps, { ...authActions })(AdminPage)