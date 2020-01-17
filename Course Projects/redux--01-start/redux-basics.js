const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
};

//Reducer is the only thing that updates the state in the end
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        }
   }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;

};

//Store
const store = createStore(rootReducer);

// console.log(store.getState());

// Subscription, make sure you don't have to call getState everytime to get a snapshot, yet they inform you when something changes
// The function in the subscribe method is executed when an action is dispatched
store.subscribe(()=>{
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});

