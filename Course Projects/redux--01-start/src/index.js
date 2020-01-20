import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";
import {Provider} from 'react-redux';

const store = createStore(combineReducers({
    counterReducer: counterReducer,
    resultReducer: resultReducer,
}));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
