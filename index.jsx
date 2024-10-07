import React from "react";
import ReactDOM from "react-dom/client";

import { MyComponentRegular, MyComponentArrow } from "learning";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Fragment: Used to group multiple elements together
    // Strict Mode: A feature that helps future-proof the application by identifying potential risks and bad practices 
    <React.StrictMode> 
        <MyComponentRegular name="Rod" age={25} />
        <MyComponentArrow name="Nikolina" age={23} />
    </React.StrictMode>
);