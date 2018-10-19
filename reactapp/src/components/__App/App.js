// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import {Auth0Lock} from 'auth0-lock';
import auth0 from 'auth0-js';

// Components
import { ThreadPage } from '../../components';

// Styling
const AppContainer = styled.div`
	display: flex;
	max-width: 1280px;
	height: 100vh;
	background: #c7e8f1;
	margin: 0 auto;
`;

//auth0 lock
const lock = new Auth0Lock(
	process.env.REACT_APP_CLIENT_ID, 
	process.env.REACT_APP_DOMAIN_URL
  );

//auth0 token passing
const webAuth = new auth0.WebAuth({
	domain: process.env.REACT_APP_DOMAIN_URL,
	clientID: process.env.REACT_APP_CLIENT_ID,
	redirectUri: 'http://localhost:3000/callback'
});

webAuth.parseHash((err, authResult) => {
	if(authResult) {
		//save the tokens from the authResult in local storage
		let expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('expires_at', expiresAt);
	} else if (err) {
		console.log(err);
	};
});

class App extends Component {
	render() {
		console.log(process.env);
		if(this.isAuthenticated()) {
			return (
				<AppContainer>
					{/* <Navbar /> */}
					<div className="placeholder">This is a placeholder.</div>
					<div onClick={this.logout}>LOG OUT</div>
					{/* <Route exact path="/" component={HomePage} /> */}
					{/* <Route exact path="/:boardName" component={BoardPage} /> */}
					<Route path="/:boardName/:threadId" component={ThreadPage} />
					{/* <Route path="/users/:id" component={ProfilePage} /> */}
					{/* <Route exact path="/register" component={SignupPage} /> */}
					{/* <Route exact path="/login" component={LoginPage} /> */}
				</AppContainer>
			);
		} else {
			return (
				<div onClick={() => lock.show()}>
					LOG IN
				</div>
			)
		}
	}

	isAuthenticated() {
		//check whether the current time is past the
		//access token's expiring time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
		//returns a true or false
		return new Date().getTime() < expiresAt;
	}

	logout() {
		//clear access token and expires token from local storage
		//and refresh page
		localStorage.removeItem('access_token');
		localStorage.removeItem('expires_at');
		window.location.reload();
	}
}

export default App;
