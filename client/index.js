import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

render((
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Greetings}/>
                    <Route path="/signup" component={SignupPage}/>
                </Switch>
            </App>
        </Router>
    </Provider>
), document.getElementById('app'));