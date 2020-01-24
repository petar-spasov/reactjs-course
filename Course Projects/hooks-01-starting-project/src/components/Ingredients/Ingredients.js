import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {

    const [ingredients, setIngredients] = useState([]);

    const addIngredientHandler = ingredient => {
        fetch('https://hooks-01-starting-projec-c0387.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(reponseData => {
            setIngredients(updatedIngredients => [...updatedIngredients, {id: reponseData.name, ...ingredient}]
            );
        });
    };

    const filteredIngredientsHandler = useCallback((filter) => {
        setIngredients(filter);
    }, []);

    const removeIngredientHandler = ingredientId => {
        fetch(`https://hooks-01-starting-projec-c0387.firebaseio.com/ingredients/${ingredientId}.json`, {
            method: 'DELETE'
        }).then((response) => {
            setIngredients(updatedIngredients => updatedIngredients.filter(ingredient => ingredient.id !== ingredientId));
        });
    }

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search onLoadFoundIngredient={filteredIngredientsHandler}/>
                <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
            </section>
        </div>
    );
};

export default Ingredients;
