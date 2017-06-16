import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import './index.css';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
  document.getElementById('root')
);
