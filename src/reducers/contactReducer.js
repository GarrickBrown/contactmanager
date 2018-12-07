import { GET_CONTACTS, DELETE_CONTACT, ADD_CONTACT, UPDATE_CONTACT } from '../actions/types';

const initialState = {
	contacts: [
		{
			id: 1,
			name: 'John Doe',
			email: 'jdoe@gmail.com',
			phone: '555-555-5555',
		},
		{
			id: 2,
			name: 'Jane Doe',
			email: 'janed@gmail.com',
			phone: '444-444-4444',
		},
		{
			id: 3,
			name: 'Garrick Brown',
			email: 'g.r.brown@gmail.com',
			phone: '333-333-3333',
		},
	],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload),
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact.id === action.payload.id ? (contact = action.payload) : contact,
				),
			};
		default:
			return state;
	}
};
