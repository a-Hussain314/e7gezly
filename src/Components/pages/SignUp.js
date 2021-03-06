import React, { useState , useEffect} from 'react';
import Requester from "../../utilities/Requester";
import History from "../../utilities/History";
import "./SignUp.scss";

function SignUp(props) {
    useEffect(()=>{
        if(window.localStorage.getItem("userData") || !!props.appState.userData ){
            // console.log(props.appState.userData)
            History.push("/")
        }
    },[props.appState.userData])

    const[formInfo, setFromInfo] = useState({
        firstName : "",
        lastName : "",
        phoneNumber : "",
        password : "",
        nationalID : "",
        email : "",
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

        Requester.post("/auth/register", formInfo)
        .then(function(response) {
            setErrors([])
        //   console.log(response.data);
            props.AppStatehandler({userData :response.data.userData});
            window.localStorage.setItem("userData", JSON.stringify(response.data.userData))
            History.push("/")
        })
        .catch(function(error) {
            if(error.response){
                // console.log(error.response);
                if(error.response.data.message.message){
                    setErrors([{
                        message : error.response.data.message.message
                    }])
                }
                if(error.response.data.message.keyValue){
                    let err = error.response.data.message.keyValue;
                    for (let key in err) {
                        setErrors([{
                            key : key,
                            value : err[key],
                            message : `${key} : ${err[key]} - is not Valid or used before `
                        }])
                    }
                }
            }
        });
    }

    
    return (
        <>
            <div className="container">
                <div className="SignUp_page">
                    <form onSubmit={formSubmitHandler}>
                        <h1>Sign Up</h1>

                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName"   type="text"     required onChange={updateFormInfo} value={formInfo.firstName} placeholder=""/>
                        
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName"    type="text"     required onChange={updateFormInfo} value={formInfo.lastName} placeholder=""/>
                        
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input id="phoneNumber" type="phone"    required onChange={updateFormInfo} value={formInfo.phoneNumber} placeholder=""/>
                        
                        <label htmlFor="password">Password</label>
                        <input id="password"    type="password" required onChange={updateFormInfo} value={formInfo.password}    placeholder=""/>
                        
                        <label htmlFor="nationalID">National ID</label>
                        <input id="nationalID"  type="id"       required onChange={updateFormInfo} value={formInfo.nationalID} placeholder=""/>
                        
                        <label htmlFor="email">Email</label>
                        <input id="email"       type="email"    required onChange={updateFormInfo} value={formInfo.email} placeholder=""/>
                        
                        <button id="submit"      type="submit"   className="btn1">Sign Up</button>
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

export default SignUp;
