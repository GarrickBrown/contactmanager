import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {},
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (dispatch, event) => {
		event.preventDefault();

		// Create contact from state
		const { name, email, phone } = this.state;
		const newContact = {
			id: uuid(),
			name,
			email,
			phone,
		};

		// Check for errors
		if (name === '' || email === '' || phone === '') {
			let errorList = {};

			if (name === '') {
				errorList = { ...errorList, name: 'Name is required' };
			}

			if (email === '') {
				errorList = { ...errorList, email: 'Email is required' };
			}

			if (phone === '') {
				errorList = { ...errorList, phone: 'Phone is required' };
			}

			this.setState({
				errors: errorList,
			});
			return;
		}

		// Add contact to context API
		dispatch({ type: 'ADD_CONTACT', payload: newContact });

		// Clear state to clear form
		this.setState({
			name: '',
			email: '',
			phone: '',
			errors: {},
		});

		// Redirect to home page
		this.props.history.push('/');
	};

	render() {
		const { name, email, phone, errors } = this.state;

		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card mb-3">
							<div className="card-header">Add Contact</div>
							<div className="card-body">
								<form onSubmit={this.handleSubmit.bind(this, dispatch)}>
									<TextInputGroup
										label="Name"
										name="name"
										placeholder="Enter Name..."
										value={name}
										onChange={this.handleChange}
										error={errors.name}
									/>
									<TextInputGroup
										label="Email"
										type="email"
										name="email"
										placeholder="Enter Email..."
										value={email}
										onChange={this.handleChange}
										error={errors.email}
									/>
									<TextInputGroup
										label="Phone"
										name="phone"
										placeholder="Enter Phone..."
										value={phone}
										onChange={this.handleChange}
										error={errors.phone}
									/>
									<input type="submit" value="Add Contact" className="btn btn-light btn-block" />
								</form>
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default AddContact;
