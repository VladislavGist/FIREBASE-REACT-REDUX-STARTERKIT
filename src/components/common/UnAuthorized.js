import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UnAuthorized extends Component {
	render() {
		return (
			<div>
				UnAuthorized, please <Link to='/auth/signin'>Sign In</Link>
			</div>
		)
	}
}

export default UnAuthorized