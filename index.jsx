import React from "react";
import ReactDOM from "react-dom";

import { MyComponentRegular, MyComponentArrow } from "learning";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Fragment: Used to group multiple elements together
    <> 
        <MyComponentRegular name="Rod" age={25} />
        <MyComponentArrow name="Nikolina" age={23} />
    </>
);