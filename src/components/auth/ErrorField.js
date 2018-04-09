import React, { Component } from 'react'

class ErrorField extends Component {
	render() {
		const { input, type, meta: { error, touched } } = this.props

		const errorText =  touched && error && <div style={ { color: 'red' } }>{ error }</div>

		return (
			<div>
				<label>{ input.name }</label>
				<input { ...input } type={ type } />
				{ errorText }
			</div>
		)
	}
}

export default ErrorField