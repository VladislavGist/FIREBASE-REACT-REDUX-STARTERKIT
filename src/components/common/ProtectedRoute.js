import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { moduleName } from '../../ducks/auth'

import UnAuthorized from '../../components/common/UnAuthorized'

class ProtectedRoute extends Component {
	renderProtected = routedProps => {
		const { component: ProtectedComponent, authorized } = this.props
		return authorized ? <ProtectedComponent { ...routedProps } /> : <UnAuthorized />
	}

	render() {
		const { component, ...rest } = this.props

		return <Route { ...rest } render={ this.renderProtected } />
	}
}

export default connect(state => ({
	authorized: !!state[moduleName].user
}), null, null, { pure: false })(ProtectedRoute)