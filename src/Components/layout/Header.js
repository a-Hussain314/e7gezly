import React from 'react'
import {Link} from 'react-router-dom';



function Header()  {
    return (<>
    <header>
        <div className="container">
            <div className="header_wrapper"> 
                <Link  to="/"> <h1>E7gezly</h1> </Link>
                <div>
                    <Link  to="/SignIn"> Sign In </Link>
                    <Link  to="/SignUp"> Sign Up </Link>
                </div>
            </div>
        </div>
    </header>
    </>
    )
}
export default Header;
