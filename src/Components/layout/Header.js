import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';



function Header(props)  {
    useEffect(()=>{
        if(window.localStorage.getItem("userData") && props.appState.userData === null){
            props.AppStatehandler({userData :JSON.parse(window.localStorage.getItem("userData"))})
        }
    })

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
                        <img className="userAvatar" src={`https://dummyimage.com/100x100/fff/343996.png&text=+${props.appState.userData.firstName.trim()[0].toUpperCase()}+${props.appState.userData.lastName.trim()[0].toUpperCase()}+`} alt="username letters"/>
                        <Link to="/">{props.appState.userData.firstName} {props.appState.userData.lastName}</Link>
                        <Link to="/Booking">{props.appState.userData.type !== "admin" ? "Appoinments" : "dashboard"}</Link>
                        <Link  to="/aboutus"> About Us </Link>
                        <span className="signOut" onClick={signOut}>Sign out</span>
                    </div>
                :
                    <div>
                        <Link  to="/aboutus"> About Us </Link>
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
