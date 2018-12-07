import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class Contact extends Component {
	state = {
		showContactInfo: false,
	};

	onShowToggle = () => {
		this.setState({
			showContactInfo: !this.state.showContactInfo,
		});
	};

	onDeleteClick = async (id, dispatch) => {
		try {
			await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

			dispatch({ type: 'DELETE_CONTACT', payload: id });
		} catch (error) {
			console.log(error);
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		}
	};

	render() {
		const { id, name, email, phone } = this.props.contact;
		const { showContactInfo } = this.state;

		return (
			<div className="card card-body mb-3">
				<h4>
					{name}{' '}
					<i
						className={showContactInfo ? 'fas fa-sort-up' : 'fas fa-sort-down'}
						onClick={this.onShowToggle}
						style={{ cursor: 'pointer' }}
					/>
					<i
						className="fas fa-times"
						style={{ cursor: 'pointer', float: 'right', color: 'red' }}
						onClick={this.onDeleteClick.bind(this, id, dispatch)}
					/>
					<Link to={`/contact/edit/${id}`}>
						<i
							className="fas fa-pencil-alt"
							style={{
								cursor: 'pointer',
								float: 'right',
								color: 'black',
								marginRight: '1rem',
							}}
						/>
					</Link>
				</h4>
				{showContactInfo ? (
					<ul className="list-group">
						<li className="list-group-item">Email: {email}</li>
						<li className="list-group-item">Phone: {phone}</li>
					</ul>
				) : null}
			</div>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
