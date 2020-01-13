import React, {useEffect, useRef} from 'react';
import classes from "./Cockpit.css";

const cockpit = (props) => {

        const btnRef = useRef();

    useEffect(() => {
        //**************Executed only when mounted
        btnRef.current.click();
        console.log("[Cockpit.js] useEffect");
        //Http request...
        // const timer = setTimeout(() => {
        //     alert("Saved bitch")
        // }, 1000);
        //************End
        //************Executed only before unmounted
        return () => {
            // clearTimeout(timer);
            console.log("[Cockpit.js] cleanup work in useEffect");
        };
        //***********End
    }, []);

    useEffect(()=> {
        //Runs for every update
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    let btnClass = '';
    if (props.showPeople) {
        btnClass = classes.Red;
    }
    let assignedClasses = [];
    if (props.peopleLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.peopleLength <= 1) {
        assignedClasses.push(classes.bold);
    }


    return (<div className={classes.Cockpit}>
            <h1 className={assignedClasses.join(' ')}>Hello World</h1>
            <button className={btnClass}
                    onClick={props.toggle} ref={btnRef}>Switch Name
            </button>
            <button onClick={props.login}>Hello</button>
            {/*{1 > 2 ? <p>hey hey</p> : <p>nono</p>}*/}
        </div>
    );
};

export default React.memo(cockpit);