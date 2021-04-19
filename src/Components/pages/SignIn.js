import React, { useEffect, useState } from 'react';
import Requester from "../../utilities/Requester";
import History from "../../utilities/History";
import "./SignUp.scss";

function SignIn(props) {
    useEffect(()=>{
        if(window.localStorage.getItem("userData") || !!props.appState.userData ){
            // console.log(props.appState.userData)
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
        console.log(formInfo);
        Requester.post("/auth/login", formInfo)
        .then(function(response) {
          setErrors([])
          console.log(response);
          props.AppStatehandler({userData :response.data.userData});
          window.localStorage.setItem("userData", JSON.stringify(response.data.userData))
          History.push("/")
        })
        .catch(function(error) {
            window.alert("incorrect Data")
            console.log(error)
            setFromInfo({
                phoneNumber : "",
                password : "",
            })
        });
    }

    
    return (
        <>
            <div className="container">
                <div className="SignUp_page">
                    <form onSubmit={formSubmitHandler}>
                        <h1>Login</h1>
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" type="phone" required onChange={updateFormInfo} value={formInfo.phoneNumber} placeholder=""/>
                        <label htmlFor="password">Password</label>
                        <input id="password"    type="password" required onChange={updateFormInfo} value={formInfo.password}    placeholder=""/>
                        <button id="submit"      type="submit"   className="btn1">Sign in</button>
                    </form>
                    <div>
                        {errors.map((err, index)=>{
                            return <span key={index} className="error">{err.message}</span>
                        })}
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default SignIn;
