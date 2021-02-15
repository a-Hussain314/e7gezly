import React, { useState , useEffect} from 'react';
import Layout from '../layout/Layout';
import axios from "axios";
import qs from "qs";
import History from "../../utilities/History";
import "./SignUp.scss";

function SignUp(props) {
    useEffect(()=>{
        if(!!props.appState.userData){
            console.log(props.appState.userData)
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
    
        var data = qs.stringify({
        'firstName': formInfo.firstName,
        'lastName': formInfo.lastName,
        'phoneNumber': formInfo.phoneNumber,
        'password': formInfo.password,
        'nationalID': formInfo.nationalID,
        'email': formInfo.email 
        });

        var config = {
          method: 'post',
          url: 'https://e7gzly.herokuapp.com/auth/register',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        
        axios(config)
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
        <Layout title="Sign up | E7gezly" {...props}>
            <div className="container">
                <div className="SignUp_page">
                    <form onSubmit={formSubmitHandler}>
                        <input id="firstName"   type="text"     required onChange={updateFormInfo} value={formInfo.firstName} placeholder="First Name"/>
                        <input id="lastName"    type="text"     required onChange={updateFormInfo} value={formInfo.lastName} placeholder="Last Name"/>
                        <input id="phoneNumber" type="phone"    required onChange={updateFormInfo} value={formInfo.phoneNumber} placeholder="Phone Number"/>
                        <input id="password"    type="password" required onChange={updateFormInfo} value={formInfo.password}    placeholder="Password"/>
                        <input id="nationalID"  type="id"       required onChange={updateFormInfo} value={formInfo.nationalID} placeholder="National Id"/>
                        <input id="email"       type="email"    required onChange={updateFormInfo} value={formInfo.email} placeholder="Email Address"/>
                        <input id="submit"      type="submit"   value="Sign Up"/>
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

export default SignUp;
