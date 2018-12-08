import { GET_CONTACTS, GET_CONTACT, DELETE_CONTACT, ADD_CONTACT, UPDATE_CONTACT } from './types';
import axios from 'axios';

export const getContacts = () => async dispatch => {
	try {
		const res = await axios.get('http://jsonplaceholder.typicode.com/users');
		dispatch({
			type: GET_CONTACTS,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getContact = id => async dispatch => {
	try {
		const res = await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`);
		dispatch({
			type: GET_CONTACT,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteContact = id => async dispatch => {
	try {
		await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);
		dispatch({
			type: DELETE_CONTACT,
			payload: id,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: DELETE_CONTACT,
			payload: id,
		});
	}
};

export const addContact = newContact => async dispatch => {
	try {
		const res = await axios.post('http://jsonplaceholder.typicode.com/users', newContact);
		dispatch({
			type: ADD_CONTACT,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateContact = updatedContact => async dispatch => {
	try {
		const res = await axios.put(
			`http://jsonplaceholder.typicode.com/users/${updatedContact.id}`,
			updatedContact,
		);
		dispatch({
			type: UPDATE_CONTACT,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};
