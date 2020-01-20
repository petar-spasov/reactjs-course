import React from 'react';
import {connect} from 'react-redux';


import './AddPerson.css';

const addPerson = (props) => (
    <div className="AddPerson">
        <input type="text" placeholder="name"/>
        <input type="number" placeholder="age"/>
        <button onClick={props.personAddedHandler}>Add Person</button>
    </div>
);

const mapStateToProps = state => {
    return {
        people: state.people
    }
};

const mapDispatchToProps = dispatch => {
    return {
        personAddedHandler: () => dispatch({
            type:'ADD_PERSON',
            payload: {
                person: {
                    id: Math.random(), // not really unique but good enough here!
                    name: 'Max',
                    age: Math.floor(Math.random() * 40)
                }
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(addPerson);