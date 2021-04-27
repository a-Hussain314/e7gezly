import React, { useEffect, useState } from 'react'
import Requester from '../../../utilities/Requester';
import "./Admin.scss";

function AllDoctors() {
    // list of all hospital doctors
    const [doctors, setDoctors] = useState([]);
    useEffect(()=>{
       fetchDoctors()
    }, [])

    const fetchDoctors = () => {
        Requester.get("/doctor/allDoctors")
        .then((response) => {
            setDoctors(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const deleteDoctor = (e) => {
        Requester.delete(`/doctor/deleteDoctor/${e.target.id}`).then(()=>{
            window.alert("Doctor Deleted Successfully");
            fetchDoctors();
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div>
            <div className={"allDoctorsList"}>
                <h1>All Doctors</h1>
                {doctors.map((dr)=>{
                    return(
                        <React.Fragment key={dr._id}>
                            <p className={"spaceBetween_Row shadow"}>
                                <span>Dr. {dr.name} - {dr.specilizationName} </span>
                                <span><button id={dr._id} onClick={deleteDoctor} className="btn2">Delete</button></span>
                            </p>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default AllDoctors
