/*
- JSX (JavaScript XML): A syntax extension of JavaScript that looks like HTML, but allows you to write elements in a more declarative way inside JavaScript
- Functional Component: This is a JavaScript function that returns JS. This should be a single element, so we usually return a 'div'.
- Props (Properties): Allow you to pass data from a parent component to a child component
- State: Data that needs to be tracked in an application
- Hook: A special function that allows to use different React features inside components. They must be called inside function components, at top level and cannot be conditional. 
    • useState: Allows to track state in a component
    When a state is updated, the component (and any other child components) rerender(s)
    ==> const [state, updateState] = useState("initialValue")
    (`updateState` is a function that updates the state)

    • useEffect: Allows to perform side effects in a component
    This gives more control on when to eprform specific operations
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
    ==> const ExampleContext = createContext()

        function ParentComponent() {
            const [exampleState, setExampleState] = useState("example")
            /// Can also be a variable: const exampleVariable = "example"

            return (
                <ExampleContext.Provider value={exampleState}>
                    <h1>Parent Component</h1>
                    <ChildComponent />
                <ExampleContext/>
            );
        }

        function ChildComponent() {
            const context = ExampleContext()

            return (
                <>
                    <h2>Child Component</h2>
                    <p>This is an {context}</p>
                </>
            );
        }
    
    
    
    

*/

import React from "react";
import { useState, useEffect } from "react";


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

    function updateValues() {
        setCount(count + 1);
        setCar((car) => ({...car, year: 1980}))  // Updates the `year` property
    }

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
            <p>Count: {count}</p>
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
