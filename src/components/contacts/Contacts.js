import React, { Component, Fragment } from 'react';
import Contact from './Contact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContacts } from '../../actions/contactActions';

class Contacts extends Component {
	componentDidMount = () => {
		if (!this.props.contacts[0]) {
			this.props.getContacts();
		}
	};

	render() {
		const { contacts } = this.props;
		return (
			<Fragment>
				<h1 className="display-4 mb-2">
					<span className="text-danger">Contact</span> List
				</h1>
				{contacts.map(contact => (
					<Contact key={contact.id} contact={contact} />
				))}
			</Fragment>
		);
	}
}

Contacts.propTypes = {
	contacts: PropTypes.array.isRequired,
	getContacts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	contacts: state.contact.contacts,
});

export default connect(
	mapStateToProps,
	{ getContacts },
)(Contacts);
