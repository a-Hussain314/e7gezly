import React, { useState } from 'react';
import { Router , Route} from 'react-router-dom';
import createBrowserHistory from '../utilities/History';

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from  "./pages/Home";

function App() {
   const [appState, setAppState]= useState({
    userData : null
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
                    <>

                        <Route
                         path="/"       
                         exact 
                         render={()=><Home   appState={appState} 
                         AppStatehandler={AppStatehandler}/>}
                        />

                        <Route
                         path="/SignIn" 
                         exact 
                         render={()=><SignIn appState={appState} 
                         AppStatehandler={AppStatehandler}/>}
                        />

                        <Route
                         path="/SignUp" 
                         exact 
                         render={()=><SignUp appState={appState} 
                         AppStatehandler={AppStatehandler}/>}
                        />

                    </>
                </Router>
            </>
        );
    
}



export default App;
