import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const {onLoadFoundIngredient} = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const refInput = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === refInput.current.value) {
                const queries = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                fetch('https://hooks-01-starting-projec-c0387.firebaseio.com/ingredients.json' + queries)
                    .then(response => response.json())
                    .then(responseData => {
                        const loadedIngredients = [];
                        for (const key in responseData) {
                            loadedIngredients.push({
                                id: key,
                                title: responseData[key].title,
                                amount: responseData[key].amount
                            });
                        }
                        onLoadFoundIngredient(loadedIngredients);
                    })
            }
        }, 500);
        //this return runs for the previous effect before the new one is applied
        return () => {
            clearTimeout(timer)
        };
    }, [enteredFilter, onLoadFoundIngredient, refInput]);

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input ref={refInput}
                           type="text" value={enteredFilter} onChange={event => {
                        setEnteredFilter(event.target.value);
                    }}/>
                </div>
            </Card>
        </section>
    );
});

export default Search;
