// JSX (JavaScript XML): A syntax extension of JavaScript that looks like HTML, but allows you to write elements in a more declarative way inside JavaScript
// Functional Component: This is a JavaScript function that returns JS. This should be a single element, so we usually return a 'div'.
// Props (Properties): Allow you to pass data from a parent component to a child component
// State: Used to store dynamic data in a component
// Hook: A special function that allows you to manage state
    // useState: 
    // useEffect:

import React from "react";
    

const [count, setCount] = useState(0);


// Creating component using function notation
function MyComponentRegular(props) {  // Props
    return (
        <h1>My name is {props.name} and I am {props.age} years old!</h1>
    )
}

// Creating component using arrow notation
const MyComponentArrow = ({ name, age }) => {  // Destructuring Props
    return <h1>My name is {name} and I am {age} years old!</h1>;
}

export {MyComponentRegular, MyComponentArrow};  // If exporting a single component can use "export default <Component>"
