import counterReducer from "./counter";

describe('auth reducer', () => {

    it('should return initial state', () => {
        expect(counterReducer(undefined, {})).toEqual({
            counter: 0,
        });
    })
});