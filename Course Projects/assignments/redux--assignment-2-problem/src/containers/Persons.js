import React, {Component} from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    // personAddedHandler = () => {
    //     const newPerson = {
    //         id: Math.random(), // not really unique but good enough here!
    //         name: 'Max',
    //         age: Math.floor(Math.random() * 40)
    //     };
    //     this.setState((prevState) => {
    //         return {persons: prevState.persons.concat(newPerson)}
    //     });
    // };
    //
    // personDeletedHandler = (personId) => {
    //     this.setState((prevState) => {
    //         return {persons: prevState.persons.filter(person => person.id !== personId)}
    //     });
    // }

    render() {
        return (
            <div>
                <AddPerson/>
                {this.props.people.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        people: state.people
    }
};

const mapDispatchToProps = dispatch => {
    return {
        personDeletedHandler: (personId) => dispatch({
            type: 'DELETE_PERSON',
            payload:{
                id: personId
            }
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);