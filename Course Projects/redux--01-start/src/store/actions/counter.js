import {ADD_NUMBER, DECREMENT, INCREMENT, SUBTRACT_NUMBER} from "./actionTypes";

export const increment = () => {
    return {
        type: INCREMENT,
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
        ,
    };
};

export const addNumber = (number) => {
    return {
        type: ADD_NUMBER,
        payload: {
            number: number
        }
    };
};

export const subtractNumber = (number) => {
    return {
        type: SUBTRACT_NUMBER,
        payload: {
            number: number
        }
    };
};