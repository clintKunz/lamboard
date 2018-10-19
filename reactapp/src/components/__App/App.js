// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import {Auth0Lock} from 'auth0-lock';

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
var lock = new Auth0Lock(
	process.env.REACT_APP_CLIENT_ID, 
	process.env.REACT_APP_DOMAIN_URL
  );

class App extends Component {
	render() {
		console.log(process.env);
		return (
			<AppContainer>
				{/* <Navbar /> */}
				<div onClick={function() {
					lock.show();
				}}>LOG IN</div>
				<div className="placeholder">This is a placeholder.</div>
				{/* <Route exact path="/" component={HomePage} /> */}
				{/* <Route exact path="/:boardName" component={BoardPage} /> */}
				<Route path="/:boardName/:threadId" component={ThreadPage} />
				{/* <Route path="/users/:id" component={ProfilePage} /> */}
				{/* <Route exact path="/register" component={SignupPage} /> */}
				{/* <Route exact path="/login" component={LoginPage} /> */}
			</AppContainer>
		);
	}
}

export default App;
