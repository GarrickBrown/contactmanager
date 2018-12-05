import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload),
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
			};
		default:
			return state;
	}
};

export class Provider extends Component {
	state = {
		contacts: [],
		dispatch: action => this.setState(state => reducer(state, action)),
	};

	getContacts = async () => {
		try {
			const res = await axios.get('https://jsonplaceholder.typicode.com/users');
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount() {
		this.getContacts().then(data => this.setState({ contacts: data }));
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;
