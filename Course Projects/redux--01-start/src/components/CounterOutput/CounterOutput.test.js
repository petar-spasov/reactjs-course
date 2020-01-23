import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CounterOutput from './CounterOutput';

configure({adapter: new Adapter()});

describe('<CounterOutput`>', () => {
    it('should have a button', () => {
        const wrapper = shallow(<CounterOutput/>);
        expect(wrapper.find('p')).toHaveLength(1);
    });
});