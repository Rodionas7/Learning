/*
- JSX (JavaScript XML): A syntax extension of JavaScript that looks like HTML, but allows you to write elements in a more declarative way inside JavaScript
- Functional Component: This is a JavaScript function that returns JS. This should be a single element, so we usually return a 'div'.
- Props (Properties): Allow you to pass data from a parent component to a child component
- State: Data that needs to be tracked in an application
- Hook: A special function that allows to use different React features inside components. They must be called inside function components, at top level and cannot be conditional. 
    • useState: Allows to track state in a component
    When a state is updated, the component (and any other child components) re-render(s)
    ==> const [state, updateState] = useState("initialValue")
    (`updateState` is a function that updates the state)

    • useEffect: Allows to perform side effects in a component. This gives more control over when to perform specific operations. This runs AFTER the component is rendered (i.e. after `return` is executed)
    1. Only on initial render
    useEffect(() => {
        ...
        /// "Cleanup" function: Timeouts, subscriptions, event listeners, and other effects that are
        /// no longer needed should be disposed to avoid memory leaks
        return () => {
            ...  
        };
    }, []);  // Note the empty brackets

    2. On initial render and any time dependencies (states/props) change
    useEffect(() => {
        ...
        return () => {
            ..
        };
    }, [prop, state]);  // We input the dependencies in the brackets
    

    • useContext: Allows child components to access a state/prop without passing it from the parent component (aka "prop drilling")
    ==> const ExampleContext = createContext("default")  // This is the value that will be accessed by the child components if a `Provider` is not used

        function ParentComponent() {
            const [exampleState, setExampleState] = useState("example")

            return (
                <ExampleContext.Provider value={exampleState}>
                    <h1>Parent Component</h1>
                    <ChildComponent />
                <ExampleContext/>
            );
        }

        function ChildComponent() {
            const context = useContext(ExampleContext)

            return (
                <>
                    <h2>Child Component</h2>
                    <p>This is an {context}</p>
                </>
            );
        }
    

    • useRef: Allows to store mutable data without causing a re-render
    ==> const [count, setCount] = useState(0);
        const prevCountRef = useRef();
        const prevCount = prevCountRef.current;  // We use `current` to get the previous value
    
        useEffect(() => {
            prevCountRef.current = count;
        }, [count]);
        

    • useCallback: Allows to memoize (cache) function references, i.e. created only when necessary
    1. Only on initial render (usually when the content is static)
    ==> const exampleFunction = useCallback(() => {
            ...
        }, []);  // Note the empty brackets

    2. On initial render and any time dependencies (states/props) change - this ensures that the function uses the most recent state value (e.g. exampleState)
    ==> const exampleFunction = useCallback(() => {
            console.log(`Current state: ${exampleState}`)
            ...
        }, [exampleState]);  // We input the dependencies in the brackets


    • useMemo: Allows to memoize (cache) function results, i.e. called only when necessary
    ==> const exampleFunction = useMemo((x) => {
            ...  // Expensive calulcation involving `x`
        }, [x]);
*/

import React, { useMemo } from "react";
import { useState, useEffect, useContext, useRef, useCallback } from "react";


// Creating component using function notation
function MyComponentRegular(props) {  // Props
    const [count, setCount] = useState(0);
    const [car, setCar] = useState({  // A state can also hold an object 
        brand: "Ford",
        model: "Mustang",
        year: 1964,
        color: "red",
        new: false
    });

    const updateValues = useCallback(() => {
        setCount(prevCount => prevCount + 1);
        setCar((car) => ({...car, year: 1980}));  // Updates the `year` property
        return count;
    }, [count, car]);

    const memoizedCount = useMemo(() => updateValues(), [count])

    useEffect(() => {
        const userClick = () => console.log(`The count is ${count}`);
        window.addEventListener("click", userClick);

        return () => {
            window.removeEventListener("click", onClick); // Cleanup
        };
    }, [count]);

    return (
        <>
            <p>My name is {props.name} and I am {props.age} years old!</p>
            <p>Count: {memoizedCount}</p>
            <p>Car: {car.brand} {car.model} {car.year} {car.color} {car.new ? "New" : "Old"}</p>
            <button type="button" onClick={updateValues}>Update</button>
        </>
    )
}

// Creating component using arrow notation
const MyComponentArrow = ({ name, age }) => {  // Destructuring Props
    return <h1>My name is {name} and I am {age} years old!</h1>;
}

export {MyComponentRegular, MyComponentArrow};  // If exporting a single component can use "export default <Component>"
