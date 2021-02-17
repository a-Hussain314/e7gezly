import React, { useState, useEffect } from 'react';
import History from "../../utilities/History";
import Requester from "../../utilities/Requester";
import "./Booking.scss";


function Booking(props) {
    const[view, setView] = useState("book");
    const[spicializations, setSpicializations] = useState([]);
    const[spicializationsList, setSpicializationsList] = useState([]);
    const[doctors, setDoctors] = useState([]);
    const[doctorsList, setDoctorsList] = useState([]);
    const[showCalender, setShowCalender] = useState(false);

    useEffect(()=>{
        if(!window.localStorage.getItem("userData")){
            // console.log(props.appState.userData)
            History.push("/")
        }
        else{

            Requester.get("/specialization/allSpecilizations")
            .then((response)=>{
                // console.log(response)
                setSpicializations(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })

             Requester.get("/doctor/allDoctors")
            .then((response)=>{
                // console.log(response)
                setDoctors(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })

        }
    },[])


   

   const typeSelectHandler = (e)=>{
    console.log(e.target.value);
    setDoctorsList([]);
    if(e.target.value === "rediograpghy and tests"){
        // because the first spec.in list is "lab"
        setSpicializationsList([spicializations[0]])
    }
    else{
        // because the first spec.in list is "lab"
        setSpicializationsList(spicializations.slice(1))
    }
   }

   const specialitySelectHandler = (e)=>{
    console.log(e.target.value);
    setDoctorsList(doctors.filter(doctor=>doctor.specializationId === e.target.value))
   }

   const doctorSelectHandler = (e)=>{
    console.log(e.target.value);
    setShowCalender(true)
   }

   const formSumbitHandler = (e)=>{
    e.preventDefault();
   }

  
    return (
        <>
            <section className="Booking">
                <div className="container">  
                    <div className={"booking_container"}>
                        <div className="leftTable">
                            <ul>
                            <li onClick={()=>{setView("book")}}>Book Appointment</li>
                            <li onClick={()=>{setView("list")}}>My Appointments</li>
                            </ul>
                        </div>
                        <div className="rightTable">

                            {view==="book" && 
                            <form onSubmit={formSumbitHandler}>

                                <label htmlFor="type" >select appointment type</label>
                                <select id="type" onChange={typeSelectHandler}>
                                    <option  defaultValue value=""> -- select an option -- </option>
                                    <option>normal check up</option>
                                    <option>follow up</option>
                                    <option>rediograpghy and tests</option>
                                </select>

                                <label htmlFor="spicialization" >select spicialization</label>
                                <select id="spicialization" onChange={specialitySelectHandler}>
                                <option  defaultValue value=""> -- select an option -- </option>
                                    {spicializationsList.map((speciality, index)=>{
                                        return (
                                            <option key={index} value={speciality._id}>{speciality.specilizationName}</option>
                                        )
                                    })}
                                </select>

                                <label htmlFor="doctor" >select doctor</label>
                                <select id="doctor" onChange={doctorSelectHandler}>
                                <option  defaultValue value=""> -- select an option -- </option>
                                    {doctorsList.map((doctor, index)=>{
                                        return(
                                            <option key={index} value={doctor._id}>{doctor.name} - {doctor.specilizationName}</option>
                                        )
                                    })}
                                </select>
                                
                                {showCalender && <>
                                <input 
                                  type="date" 
                                  id="start" 
                                  name="trip-start"
                                  min="2021-02-17" 
                                  max="2021-02-24"
                                />
                                <button className="btn1">Book Appointment</button>
                                </>
                                }

                            </form>
                            }

                            {view==="list" &&
                            <>
                             <h2>Appointments List</h2>
                             <div className="appointment">
                                <ul>
                                    <li>{"name : Zell Liew"}</li>
                                    <li>{"dr : john doe"}</li>
                                    <li>{"specialization : Cardiologists"}</li>
                                    <li>{"date and time  : Feb 17 2021 14:30"} </li>
                                </ul>
                                    <button className="btn2">Cancel</button>
                             </div>
                             <div className="appointment">
                                <ul>
                                    <li>{"name : Zell Liew"}</li>
                                    <li>{"dr : john doe"}</li>
                                    <li>{"specialization : Cardiologists"}</li>
                                    <li>{"date and time  : Feb 17 2021 14:30"} </li>
                                </ul>
                                    <button className="btn2">Cancel</button>
                             </div>
                             <div className="appointment">
                                <ul>
                                    <li>{"name : Zell Liew"}</li>
                                    <li>{"dr : john doe"}</li>
                                    <li>{"specialization : Cardiologists"}</li>
                                    <li>{"date and time : Feb 17 2021 14:30"} </li>
                                </ul>
                                    <button className="btn2">Cancel</button>
                             </div>
                               
                             
                            
                            </>
                            }
                            
                        </div>
                    </div> 
                </div>
            </section> 
        </>
    )
}
export default Booking;
