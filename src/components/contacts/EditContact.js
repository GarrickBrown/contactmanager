import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
/* import axios from 'axios';
 */
import { connect } from 'react-redux';
import { updateContact } from '../../actions/contactActions';
import PropTypes from 'prop-types';

class EditContacts extends Component {
	state = {
		id: '',
		name: '',
		email: '',
		phone: '',
		errors: {},
	};

	componentDidMount = async () => {
		/* 		const { id } = this.props.match.params;
		const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
		const { name, email, phone } = res.data;
		this.setState({
			name,
			email,
			phone,
		});
 */
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		// Create contact from state
		const { name, email, phone } = this.state;
		const { id } = this.props.match.params;
		const updatedContact = {
			id,
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

		// Update contact in context API
		try {
			this.props.updateContact(updatedContact);
		} catch (error) {
			console.log(error);
		}

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
			<div className="card mb-3">
				<div className="card-header">Edit Contact</div>
				<div className="card-body">
					<form onSubmit={this.handleSubmit}>
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
						<input type="submit" value="Update Contact" className="btn btn-light btn-block" />
					</form>
				</div>
			</div>
		);
	}
}

EditContacts.propTypes = {
	updateContact: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ updateContact },
)(EditContacts);
