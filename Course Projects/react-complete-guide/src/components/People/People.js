import React, {Component} from 'react';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person/Person";

class People extends Component {

    // static getDerivedStateFromProps(props, state){
    //     console.log('[People.js] getDerivedStateFromProps');
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[People.js] shouldComponentUpdate');
    //     if (nextProps.people !== this.props.people) {
    //         return true;
    //     }
    //     return false;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[People.js] getSnapshotBeforeUpdate');
        return {message: "wassup snapshot"};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[People.js] componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('[People.js] componentWillUnmount');
    }

    render() {
        console.log('[People.js] rendering');
        return this.props.people.map((person, index) => {
            return (
                <ErrorBoundary
                    key={person.id}>
                    <Person name={person.name}
                            age={person.age}
                            click={() => this.props.clicked(index)}
                            changed={(event) => this.props.changed(event, person.id)}
                            isAuth={this.props.isAuthenticated}/>
                </ErrorBoundary>
            );
        });
    }
}

export default People;