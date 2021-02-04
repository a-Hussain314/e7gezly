import React from 'react';
import Layout from '../layout/Layout';
import "./SignUp.scss"

function SignUp() {

    return (
        <Layout>
            <div className="container">
                <div className="SignUp_page">
                    <form>
                        <input id="name1" type="text" placeholder="First Name"/>
                        <input id="name2" type="text" placeholder="Last Name"/>
                        <input id="phone" type="phone" placeholder="Phone Number"/>
                        <input id="pw" type="password" placeholder="Password"/>
                        <input id="natID" type="id" placeholder="National Id"/>
                        <input id="email" type="email" placeholder="Email Address"/>
                        <input id="submit" type="submit" value="Sign Up"/>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp;
