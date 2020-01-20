import {DELETE_RESULT, STORE_RESULT} from "./actionTypes";

export const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        payload: {
            result: result
        }
    };
};

export const storeResult = (result) => {
    //You get dispatch by redux-thunk
    return (dispatch) => {
        setTimeout(() => {
            dispatch(saveResult(result));
        }, 2000);
    }
};

export const deleteResult = (id) => {
    return {
        type: DELETE_RESULT,
        payload: {
            id: id
        }
    };
};