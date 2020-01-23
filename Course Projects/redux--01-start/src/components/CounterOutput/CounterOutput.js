import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter: {props.value}
        <p>well</p>
    </div>
);

export default counterOutput;