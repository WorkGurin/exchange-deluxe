import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
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