import React, {Component} from 'react';
import classes from './Person.css';
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElRef.current.focus();
        console.log(this.context.authenticated)
    }

    render() {
        console.log('[Person.js] rendering');
        const style = {
            // '@media (min-width:500px)' :{
            //     width:'450px'
            // }
        };
        console.log(this.props.isAuth);
        return (
            <Aux>
                {this.context.authenticated ? <p>Authed</p> : <p>pls login bruh</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input type="text" value={this.props.name} onChange={this.props.changed} ref={this.inputElRef}/>

            </Aux>
        );
    };
}

Person.propTypes = {
    isAuth: PropTypes.bool,
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);