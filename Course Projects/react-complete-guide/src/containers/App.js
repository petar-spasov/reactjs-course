import React, {Component} from 'react';
import classes from './App.css';
import People from "../components/People/People";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import AuthContext from '../context/auth-context';
class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App.js] Constructor');
    }

    state = {
        people: [
            {id: '1', name: "Max", age: 28},
            {id: '2', name: "Manu", age: 21},
            {id: '3', name: "Henu", age: 24}
        ],
        showPeople: false,
        showCockpit: true,
        counter: 0,
        authenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }


    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate');
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.people.findIndex((p) => {
            return p.id === id;
        });
        const person = {
            ...this.state.people[personIndex]
        }

        person.name = event.target.value;

        const people = [...this.state.people];
        people[personIndex] = person;
        this.setState((prevState, props) => {
            return {
                people: people,
                changeCounter: prevState.changeCounter + 1
            };
        });
    };

    deletePerson = (personIndex) => {
        const people = [...this.state.people];
        people.splice(personIndex, 1);
        this.setState({people: people});
    };

    loginHandler = () => {
        this.setState({authenticated: true});
    };

    togglePersonHandler = () => {
        const doesShow = this.state.showPeople;
        this.setState({showPeople: !doesShow});
    };


    render() {
        console.log('[App.js] render');

        // const style = {
        //     backgroundColor: '#c8e6c9',
        //     font: 'inherit',
        //     border: '1px solid transparent',
        //     padding: '8px',
        //     marginTop: '20px',
        //     cursor: 'pointer',
        //     color: '#3e3e3e',
        //     // ':hover': {
        //     //     backgroundColor: '#81c784',
        //     // }
        // };

        let people = null;

        if (this.state.showPeople) {
            people = (
                <People people={this.state.people} clicked={this.deletePerson} changed={this.nameChangedHandler}
                        isAuthenticated={this.state.authenticated}/>
            );
            // style.backgroundColor = 'tomato';
            // style[':hover'] = {
            //     backgroundColor: '#bf360c',
            // };
        }


        return (
            <React.Fragment>
                <button onClick={() => {
                    this.setState({
                            showCockpit: false
                        }
                    )
                }}>Remove Cockpit
                </button>
                <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
                {this.state.showCockpit ? (<Cockpit showPeople={this.state.showPeople}
                                                    peopleLength={this.state.people.length}
                                                    toggle={this.togglePersonHandler}/>) : null}
                {people}
                </AuthContext.Provider>
            </React.Fragment>

        );
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }
}

export default withClass(App, classes.App);