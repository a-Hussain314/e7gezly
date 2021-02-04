import React  from 'react';
import Layout from '../layout/Layout';
import "./SignIn.scss"
function SignIn() {
    
    return (
        <Layout>
            <div className="container">
                <div className="SignIn_page">
                    <form>
                        <input id="phone" type="phone" placeholder="Phone Number"/>
                        <input id="pw" type="password" placeholder="Password"/>
                        <input id="submit" type="submit" value="Sign In"/>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default SignIn;
