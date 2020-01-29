import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Main from "./components/Main";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" 
                       exact
                       component={Main}
               />
            </BrowserRouter>
        </div>
    )
};

export default App;