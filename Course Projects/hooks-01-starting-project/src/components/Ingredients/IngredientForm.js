import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

    /** Always return array with 2 elements
     1st el -> current state snapshot, when component rerenders state dones't get intialized again because react internaly saves that the state has been reconfigured
     2nd el -> function that allows you to update the state
     */
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        props.onAddIngredient({title: title, amount: amount});
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text" id="title" value={title}
                               onChange={event => {
                                   setTitle(event.target.value)
                               }}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" value={amount}
                               onChange={event => {
                                   setAmount(event.target.value);
                               }}/>
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
