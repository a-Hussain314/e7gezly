import React, { Component } from 'react';
import { Router , Route} from 'react-router-dom';
import createBrowserHistory from '../History';

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from  "./pages/Home";

class App extends Component {
    render() {
        return (
            <>
                <Router history={createBrowserHistory}>
                    <>
                        <Route path="/"       exact   component={Home}   ></Route>
                        <Route path="/SignIn" exact   component={SignIn} ></Route>
                        <Route path="/SignUp" exact   component={SignUp} ></Route>
                    </>
                </Router>
            </>
        );
    }
}



export default App;
