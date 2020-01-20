const initialState = {
    people: []
};

const reducer = (state = initialState, action) => {
    if (action.type === 'ADD_PERSON') {
        console.log('ADD ACTION TRIGERED: ...ADDING');
        return {
            people: state.people.concat(action.payload.person)
        };
    }
    if (action.type === 'DELETE_PERSON'){
        console.log('DELETE ACTION TRIGERED: ...DELETING');
        const updatedArray = state.people.filter((person) => {
            if (person.id !== action.payload.id) {
                return true;
            }
            return false;
        });
        return {
            people: updatedArray
        }
    }
    return state;
};

export default reducer;