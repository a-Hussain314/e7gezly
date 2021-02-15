import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from "axios";
import qs from "qs";
import History from "../../utilities/History";
import "./SignUp.scss";

function SignIn(props) {
    useEffect(()=>{
        if(!!props.appState.userData){
            console.log(props.appState.userData)
            History.push("/")
        }
    },[props.appState.userData])

    const[formInfo, setFromInfo] = useState({
        phoneNumber : "",
        password : "",
    }) 

    const[errors, setErrors] = useState([]);

    const updateFormInfo =(e)=>{
        const newFormInfo = formInfo;
        newFormInfo[e.target.id]=e.target.value;
        setFromInfo({...newFormInfo})
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        // console.log(formInfo);
    
        var data = qs.stringify({
        'phoneNumber': formInfo.phoneNumber,
        'password': formInfo.password,
        });

        var config = {
          method: 'post',
          url: 'https://e7gzly.herokuapp.com/auth/login',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        
        axios(config)
        .then(function(response) {
          setErrors([])
          console.log(response);
          props.AppStatehandler({userData :response.data.userData});
          window.localStorage.setItem("userData", JSON.stringify(response.data.userData))
          History.push("/")
        })
        .catch(function(error) {
           console.log(...error)
        });
    }

    
    return (
        <Layout title="Sign up | E7gezly" {...props}>
            <div className="container">
                <div className="SignUp_page">
                    <form onSubmit={formSubmitHandler}>
                        <input id="phoneNumber" type="phone"    required onChange={updateFormInfo} value={formInfo.phoneNumber} placeholder="Phone Number"/>
                        <input id="password"    type="password" required onChange={updateFormInfo} value={formInfo.password}    placeholder="Password"/>
                        <input id="submit"      type="submit"   value="Sign in"/>
                    </form>
                    <div>
                        {errors.map((err, index)=>{
                            return <span key={index} className="error">{err.message}</span>
                        })}
                    </div>
                   
                </div>
            </div>
        </Layout>
    )
}

export default SignIn;
