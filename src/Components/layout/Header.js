import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';



function Header(props)  {
    useEffect(()=>{
        if(window.localStorage.getItem("userData")){
            props.AppStatehandler({userData :JSON.parse(window.localStorage.getItem("userData"))})
        }
    },[])

    const signOut = ()=>{
        window.localStorage.removeItem("userData");
        props.AppStatehandler({userData : null})
    }

    return (<>
    <header>
        <div className="container">
            <div className="header_wrapper"> 
                <Link  to="/"> <h1>E7gezly</h1> </Link>
                {props.appState.userData ? 
                    <div className="userBox">
                        <img className="userAvatar" src={`https://dummyimage.com/100x100/fff/343996.png&text=+${props.appState.userData.firstName[0].toUpperCase()}+${props.appState.userData.lastName[0].toUpperCase()}+`} alt="username letters"/>
                        <p>{props.appState.userData.firstName} {props.appState.userData.lastName}</p>
                        <span className="signOut" onClick={signOut}>Sign out</span>
                    </div>
                :
                    <div>
                        <Link  to="/SignIn"> Sign In </Link>
                        <Link  to="/SignUp"> Sign Up </Link>
                    </div>
                }
            </div>
        </div>
    </header>
    </>
    )
}
export default Header;
