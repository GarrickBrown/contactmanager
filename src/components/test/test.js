import React, { Component } from 'react';

export default class Test extends Component {
	state = {
		title: '',
		body: '',
	};

	/* 	componentWillMount() {
		console.log('componentWillMount');
	}
 */
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/posts/1')
			.then(response => response.json())
			.then(json =>
				this.setState({
					title: json.title,
					body: json.body,
				}),
			);
	}

	/* 	componentWillUpdate() {
		console.log('componentWillUpdate');
	}

	componentDidUpdate() {
		console.log('componentDidUpadate');
	}

	componentWillReceiveProps(nextProps, nextState) {
		console.log('componentWillReceiveProps');
	}

	static getDerivedStateFromProps(nextProps, nextState) {
		console.log('getDerivedStateFromProps');
		return null;
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('getSnapshotBeforeUpdate');
	}
 */
	render() {
		const { title, body } = this.state;
		return (
			<div>
				<h1>Test Component</h1>
				<p>Title - {title}</p>
				<p>Body - {body}</p>
			</div>
		);
	}
}
