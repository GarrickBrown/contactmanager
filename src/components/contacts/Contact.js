import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/* import axios from 'axios';
 */
import { connect } from 'react-redux';
import { deleteContact } from '../../actions/contactActions';

class Contact extends Component {
	state = {
		showContactInfo: false,
	};

	onShowToggle = () => {
		this.setState({
			showContactInfo: !this.state.showContactInfo,
		});
	};

	onDeleteClick = id => {
		this.props.deleteContact(id);
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
						onClick={this.onDeleteClick.bind(this, id)}
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
	deleteContact: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ deleteContact },
)(Contact);
