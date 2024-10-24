/*
- JavaScript (JS) or VanillaJS: The core language
- TypeScript: Variation of JavaScript introducing fetures like strong typing
- ReactJS, VueJS, AngularJS: JS frameworks allowing to write JS-based front-end application (introduce new coding conventions like JSX/TSX which simplify how we mix JS and HTML)
- npm (Node Package Manager), Babel, WebPack, Gulp: Helper applications ("build tools") that optimise human-readable JS for the best browser performance
- Node.js: A tool/runtime environment used to run JS on the server (backend) through npm.
It is used in real-time applications (e.g. Chat application, collaborative tools, streaming services, online gaming) which require handling many connections simultaneously, due to its non-blocking I/O model.
- Vite: A build tool that makes development process faster and more efficient that the 'Create React App' (CRA) tool
*/

/*
let: Variables can be reassigned
const: Variables cannot be reassigned
==> Both types are block-scoped, i.e. they are only accessible within the block (i.e. {}) they are declared
*/

// Function Declaration - can be called before it's defined
function myFunction(param1, param2) {
    return param1 + param2;
}

// Function Expression - cannot be called before it's defined
const myFunction = function(param1, param2) {
    return param1 + param2;
}

// Arrow Function Expression
const myFunction = (param1, param2) => {  // Can omit '{}' and 'return' if there is a single expression
    return param1 + param2;  
}

// Imediately Invoked Function Expression (IIFE) - it is called as soon as it's encountered
(function (param1, param2) {
    return param1 + param2;
})();

// Arrow IFFE
((param1, param2) => {  // Can omit '{}' and 'return' if there is a single expression
    return param1 + param2;
})();


// Array
const numbers = [3, 8, -5, 14, -7]  // An array can hold items of different data types (e.g. 3, "text", false)
const numbersSize = numbers.size()  // Returns the size of the array
numbers[1]  // Returns value at index 1
numbers[2] = false  // Reassigns value at index 2
numbers.unshift(2, 4)  // Appends items at the start of the array
numbers.push(6, 12)  // Appends items at the end of the array
numbers.shift()  // Removes (and returns) the first item of the array
numbers.pop()  // Removes (and returns) the last item of the array
numbers.splice(3, 2, 6, -3)  // Inserts 2 elements (6 and -3), starting from index 3
numbers.splice(3, 2)  // Removes 2 elements starting at index 3
numbers.sort()  // Sorts an array of numbers ascending
numbers.reverse()  // Sorts an array of strings descending
numbers.sort((a, b) => a - b)  // Sorts a NUMERIC array ascending
numbers.sort((a, b) => b - a) // Sorts a NUMERIC array descending
const doubles = numbers.map(num => num*2)  // Creates a new array by applying a function to each element of the original array
const even = numbers.filter(num => num % 2 === 0)  // Creates a new array with the items that satisfy the condition
const sum = numbers.reduce((total, num) => total + num, 0)  // Executes a reducer function on each element of the array, resulting in a single value (e.g. summing up the values)
numbers.forEach(num => console.log(num))  // Executes a function for each array element
const found = numbers.find(num => num > 5)  // Returns the first element in the array that satisfies the condition
const index = numbers.findIndex(num => num < 2);  // Returns the index of the first element that satisfies the condition (or -1 if no element matches)
const hasEven = numbers.some(num => num % 2 === 0);  // Returns true if at least one element in the array passes the test, otherwise it returns false
const allEven = numbers.every(num => num % 2 === 0);  // Returns true if all elements in the array pass the test, otherwise it returns false
const exists = numbers.includes(3)  // Returns true if the element is in the array, otherwise returns false
const someNumbers = numbers.slice(1, 3)  // Returns a portion of the array, from provided start index (inclusive, e.g. 1) to end index (not inclusive, e.g. 3)
const numbersAsString = numbers.join(", ")  // Concatenates the array elements into a string


// Set (do not allow duplicates)
const numbers2 = new Set([1, 2, 3, 4])
const numbers2Size = numbers2.size()  // Returns the number of elements in the set
numbers2.add(5)  // Adds an element to the set
numbers2.has(3)  // Checks if an element exists in the set
numbers2.delete(4)  // Removes an element from the set
numbers2.clear()  // Removes all elements from the set
numbers2.forEach(num => console.log(num))  // Executes a function for each set element
const setToArray = Array.from(numbers2)  // Converts the set to an array (or can use `[...numbers2]`)


// Class
const Shoe = class {  // Alternative syntax: class Shoe {...}
    // Built-in function used to construct an object of the class
    constructor(brand, size, colour, isClean) {  // Define parameters  
        // Define properties (based on input parameters)
        this.brand = brand;
        this.size = size;
        this.colour = colour;
        this.isClean = isClean;
    }
    clean(cleanStatus) {  // Method: Used to change the properties of the object (can also use function expression: clean = function(cleanStatus), though this is unconventional for methods)
        this.isClean = cleanStatus;  // 'this' refers to the current object
    }
};

// Creating an object from a class
const nike = new Shoe(this.brand='Nike', this.size=35, this.colour='white', this.isClean=false);
console.log(`The shoe is of size ${nike.size}EU`);  // `...${}...` is called a 'template literal' ('$' is the placeholder) and is equivalent to Python f-strings
console.log("The shoe is of size " + nike.size + "EU");// Could also traditional string output using concatenation

// Creating an object (on its own)
const adidas = {
    brand: "adidas",
    size: 38,
    colour: "black",
    isClean: false,
    clean: function(cleanStatus) {
        this.isClean = cleanStatus;
    }
}
// Note: When using nested functions inside methods, use arrow functions instead of regular functions to maintain correct context of "this"

const shoePropertiesObject = {...adidas };  // Unpacking the object's properties into a new object using the 'spread operator' (...)
const shoeKeys = Object.keys(adidas )  // Unpack the object's keys into an array
const shoeValues = Object.values(adidas )  // Unpack the object's values into an array


// Extending a class: The new class (Trainer) will have all attributes of existing class (Shoe) but can also add additional ones
class Trainer extends Shoe {
    constructor(
        brand,
        size,
        colour,
        isClean,
        weight
    ) {
        super(brand, size, colour, isClean)  // The 'super' method is used to call the constructor of the parent class and pass in the properties common to both classes
        this.weight = weight;
    }
    // Extend with a new method
    checkWeight(weight) {
        if (this.weight > 2) {
            console.log("Heavy");
        } else {
            console.log("Light");
        }
    };
    // Overwrite existing method
    clean(cleanStatus) {
        super.clean(cleanStatus);  // Call the parent method
        if (cleanStatus) {
            console.log("Clean");
        } else {
            console.log("Dirty");
        }
    }
};


/*
Browser scopes:
• window: Represents the browser window 
• document: Represents the entire HTML document (web page)
• element: Represents an individual HTML element on a web page
*/

// Selecting an HTML element
document.querySelector("main");  // Returns the first HTML element based on type (e.g. main)
document.querySelector("#id");  // Returns the first first HTML element based on id  (can also use `getElementById`)
document.querySelector(".className");  // Returns the first first HTML element based on class name
document.querySelectorAll(".className");  // Returns all HTML elements based on class name  (can also use `getElementsByClassName`)

document.querySelector(".className").style;  // Returns the styles of an element

//  Modifying class
document.querySelector("#id").classList;  // Returns the classes of an element
document.querySelector("#id").classList.add("newClass");  // Adds a new class
document.querySelector("#id").classList.remove("existingClass");  // Removes a class
document.querySelector("#id").classList.replace("existingClass", "newClass");  // Replaces a class
document.querySelector("#id").classList.toggle("newClass");  // Toggle a class on and off

// Modifying ID
document.querySelector(".className").getAttribute("id");  // Returns the specific attribute of an element
document.querySelector(".className").hasAttribute("id");  // Checks if an element contains a specific attribute
document.querySelector(".className").setAttribute("id", "idName")  // Sets/Replaces an attribute to/of an element (depending if it exists)
document.querySelector(".className").removeAttribute("id");  // Removes an attribute of an element

// Creating a new DOM element
const newElement = document.createElement("p");
newElement.innerText = "This is a new paragraph";
newElement.classList.add("newElementClass");
newElement.setAttribute("id", "newElementID");

const existingParent = document.querySelector('.parentElement');  // Returns the parent (div, ul, ...) that you want to add the new element into

const item1 = document.createElement("li");
item1.innerText = "Item 1";
const item2 = document.createElement("li");
item2.innerText = "Item 2";
const item3 = document.createElement("li");
item3.innerText = "Item 3";
// Inserting (multiple) elements (e.g. li) at the end/start of the parent element (e.g. ul)
existingParent.append(item1, item2, item3)
existingParent.prepend(item1, item2, item3)

const existingElement = parent.firstChild;  // Let's say this is a header

// Replacing an existing child (of the parent element) with a new element
existingParent.replaceChild(newElement, existingElement);

// Inserting a new/Move an existing element relative to an existing (non-container) element
existingElement.insertAdjacentElement('afterend', newElement); // Insert after the existing element
existingElement.insertAdjacentElement('beforebegin', newElement); // Insert before the existing element

// Inserting a new/Move an existing element relative to an existing container element
existingParent.insertAdjacentElement('afterbegin', newElement); // Insert at the beginning of the existing element (first child) - this is the same as the `prepend` function
existingParent.insertAdjacentElement('beforeend', newElement); // Insert at the end of the existing element (last child) - this is the same as the `append` function

// Can also use insertAdjacentHTML() to insert a raw HTML string instead of a node (e.g. insert multiple li elements at once)
content = `
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
`
existingParent.insertAdjacentHTML("afterbegin", content);
// Note: Use `insertAdjacentHTML` when you want to insert new elements without replacing the existing content
// Note: Use `innerHTML` when you want to replace the exisiting content (or itif content doesn't already exist)


/* Event Listeners
Most common DOM events (https://www.w3schools.com/jsref/dom_obj_event.asp):
• click: When an element is clicked
• dbclick: When an element is double-clicked
• mouseover: When the mouse pointer enters a child element
• mouseout: When the mouse pointer leaves a child element
• mouseenter: When the mouse pointer enters a parent element
• mouseleave: When the mouse pointer leaves a parent element
• keydown: When a key is pressed down
• keyup: When a key is released
• submit: When a form is submitted
• input: When the value of an input element changes
• focus: When an element gets focus/selected
(the difference with click that the element can be selected programatically (i.e. focus()) or using the keyboard (e.g. 'tab')
• blur: When an element loses focus/is unselected
• scroll: When the user scrolls an element or the page
• resize: When the window is resized
*/

existingElement.addEventListener("click", () => console.log("Clicked"));  // When the element is clicked
existingElement.addEventListener("mouseover", () => console.log("Mouse is over child"));  // When you hover over the child element
existingElement.addEventListener("mouseout", () => console.log("Mouse has left child"));  // When you leave the child element
existingParent.addEventListener("mouseenter", () => console.log("Mouse is over parent"));  // When you hover over the parent element
existingParent.addEventListener("mouseleave", () => console.log("Mouse has left parent"));  // When you leave the parent element

window.addEventListener("scroll", () => console.log("Scroll"));  // When the page is scrolled
window.addEventListener("resize", () => console.log("Resized"));  // When the page is resized

/* Note: To pass arguments to a callback function, wrap it inside an anonymous function or an arrow function, i.e. 
addEventListener("..."), function() => { myFunction(arg) };
addEventListener("...", () => myFunction(arg));  */


// Custom events - used when we want to simulate events programmatically (e.g. for testing)
const clickEvent = new Event("customClick");
existingElement.dispatchEvent(clickEvent);  // Manually trigger

const customClickEvent = new CustomEvent("click", {  // Creating custom click event, in order to pass extra data (e.g. custom message)
    detail: {message: "This is a custom click!"}
});
existingElement.dispatchEvent(customClickEvent);




// GET HTTP request
// Asynchronous Functions: Handle operations that might take some time to complete (e.g. fetching data from a server) without blocking the execution of the rest of the code 
async function getData(url) {
    try {
        // This pauses the function execution until the promise (what is returned from `fetch`) is resolved
        const response = await fetch(url, {  
            method: "GET",  // Default - can also use POST, PUT, DELETE, PATCH, OPTIONS
            headers: {  // HTTP headers
                'Content-Type': 'application/json',  // Specify content type (e.g. application/json)
                'Authorization': 'Bearer <token>',  // Specify authorization type (e.g. Bearer token)
            },
            body: null,  // Default - The data sent with the request
            mode: "cors",  // Default - To allow cross-origin requests

        });  

        if (!response.ok) {  // Status code not 200-299
            throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();  // Parses the response as JSON
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

getData("https://example.com/getExample").then(data => {  // We use `then()` to access the promise
    console.log(`Result: ${data}`)
})

// POST HTTP request
async function sendData(url, payload) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
            },
            body: JSON.stringify(payload),  // Need to convert payload to JSON string (i.e. serialize)
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

examplePayload = {"key1": "value1", "key2": "value2", "key3": "value3"};  // The data to send in key-value pairs
sendData("https://example.com/postExample", examplePayload)

const mouseEvent = new Event("MouseEvent")
element.dispatchEvent(mouseEvent)
