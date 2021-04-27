import React, { useState, useEffect } from 'react';
import Requester from "../../../utilities/Requester";

function AddDoctorsForm() {
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        nationalID: "",
        specializationId: "",
        checkUpFees: "",
        followUpFees: "",
        startTime: "",
        endTime: ""
    };
    const [spicializations, setSpicializations] = useState([]);
    const [formInfo, setFromInfo] = useState(initialFormData);

    useEffect(() => {
        // fetch and store all hospital Specilizations in a state.
        Requester.get("/specialization/allSpecilizations")
            .then((response) => {
                setSpicializations(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    useEffect(()=>{
        // console.log(formInfo);
    });

    const updateFormInfo = (e) => {
        const newFormInfo = formInfo;
        newFormInfo[e.target.id] = e.target.value;
        setFromInfo({ ...newFormInfo })
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formInfo);
        Requester.post("/doctor/addDoctor", formInfo).then(()=>{
            window.alert("Doctor Added Successfully");
            setFromInfo(initialFormData);
        }).catch((err)=>{
            console.log(err);
        });
    }


    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <h1>Add Doctor</h1>

                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" required onChange={updateFormInfo} value={formInfo.firstName} placeholder="" />

                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" required onChange={updateFormInfo} value={formInfo.lastName} placeholder="" />

                <label htmlFor="specializationId">specializationId</label>
                <select id="specializationId" onChange={updateFormInfo}>
                    <option defaultValue value=""> -- select an option -- </option>
                    {spicializations.map((record) => {
                        return (
                            <option key={record._id} value={record._id}>{record.specilizationName}</option>
                        )
                    })}
                </select>

                <label htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber" type="number" required onChange={updateFormInfo} value={formInfo.phoneNumber} placeholder="" />

                <label htmlFor="email">Email</label>
                <input id="email" type="email" required onChange={updateFormInfo} value={formInfo.email} placeholder="" />
                
                <label htmlFor="checkUpFees">Check Up Fees</label>
                <input id="checkUpFees" type="number" required onChange={updateFormInfo} value={formInfo.checkUpFees} placeholder="" />

                <label htmlFor="followUpFees">Follow Up Fees</label>
                <input id="followUpFees" type="number" required onChange={updateFormInfo} value={formInfo.followUpFees} placeholder="" />

                <label htmlFor="startTime">Start Time</label>
                <input id="startTime" type="time" required onChange={updateFormInfo} value={formInfo.startTime} placeholder="" />

                <label htmlFor="endTime">End Time</label>
                <input id="endTime" type="time" required onChange={updateFormInfo} value={formInfo.endTime} placeholder="" />

                <label htmlFor="nationalID">National ID</label>
                <input id="nationalID" type="number" required onChange={updateFormInfo} value={formInfo.nationalID} placeholder="" />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" required onChange={updateFormInfo} value={formInfo.password} placeholder="" />

                <button id="submit" type="submit" className="btn1">Add</button>
            </form>
        </div>
    )
}

export default AddDoctorsForm;
