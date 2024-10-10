// JSX (JavaScript XML): A syntax extension of JavaScript that looks like HTML, but allows you to write elements in a more declarative way inside JavaScript
// Functional Component: This is a JavaScript function that returns JS. This should be a single element, so we usually return a 'div'.
// Props (Properties): Allow you to pass data from a parent component to a child component
// State: Data that needs to be tracked in an application
// Hook: A special function that allows to use different React features inside components. They must be called inside function components, at top level and cannot be conditional. 
    // useState: Allows to track state in a function component ==> const [state, updateState] = useState("initialValue")
    // useEffect:

import React from "react";
import { useState } from "react";


// Creating component using function notation
function MyComponentRegular(props) {  // Props
    const [count, setCount] = useState(0);
    const [car, setCar] = useState({  // A state can also hold an object 
        brand: "Ford",
        model: "Mustang",
        year: "1964",
        color: "red"
      });

    return (
        <h1>My name is {props.name} and I am {props.age} years old!</h1>
    )
}

// Creating component using arrow notation
const MyComponentArrow = ({ name, age }) => {  // Destructuring Props
    return <h1>My name is {name} and I am {age} years old!</h1>;
}

export {MyComponentRegular, MyComponentArrow};  // If exporting a single component can use "export default <Component>"
