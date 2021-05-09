import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../utilities/History';

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AboutUs from "./pages/AboutUs";
import NotFound from './pages/NotFound';

import "./styles/global.scss";
import "./layout/layout.scss";


function App() {
    const [appState, setAppState] = useState({
        userData: null
    })

    const AppStatehandler = (newState) => {
        setAppState({
            ...appState,
            ...newState
        })
    }
    return (
        <>
            <Router history={createBrowserHistory}>
                <Header appState={appState} AppStatehandler={AppStatehandler} />
                <main className="appMain">
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => <Home appState={appState}
                                AppStatehandler={AppStatehandler} />}
                        />

                        <Route
                            path="/SignIn"
                            exact
                            render={() => !window.localStorage.getItem("userData") ?
                                <SignIn appState={appState} AppStatehandler={AppStatehandler} />
                                :
                                <Home appState={appState} AppStatehandler={AppStatehandler} />
                            }
                        />

                        <Route
                            path="/SignUp"
                            exact
                            render={() => !window.localStorage.getItem("userData") ?
                                <SignUp appState={appState} AppStatehandler={AppStatehandler} />
                                :
                                <Home appState={appState} AppStatehandler={AppStatehandler} />
                            }
                        />

                        <Route
                            path="/Booking"
                            exact
                            render={() => window.localStorage.getItem("userData") ?
                                <Booking appState={appState} AppStatehandler={AppStatehandler} />
                                :
                                <Home appState={appState} AppStatehandler={AppStatehandler} />
                            }
                        />

                        <Route
                            path="/aboutus"
                            exact
                            render={() => <AboutUs appState={appState} AppStatehandler={AppStatehandler} /> }
                        />

                        <Route render={() => <NotFound />} />
                    </Switch>

                </main>
                <Footer appState={appState} AppStatehandler={AppStatehandler} />
            </Router>
        </>
    );
}



export default App;
