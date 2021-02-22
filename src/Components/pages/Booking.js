import React, { useState, useEffect } from 'react';
import History from "../../utilities/History";
import Requester from "../../utilities/Requester";
import "./Booking.scss";


function Booking(props) {
    const[view, setView] = useState("book");
    const[type, setType] = useState(null);
    const[spicializations, setSpicializations] = useState([]);
    const[spicializationsList, setSpicializationsList] = useState([]);
    const[doctors, setDoctors] = useState([]);
    const[doctorsList, setDoctorsList] = useState([]);
    const[bookingDetails, setBookingDetails]=useState(null);
    const[showBookingButton, setShowBookingButton] = useState(false);
    const[bookings, setBookings] = useState([])

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

            fetchUserBookings();

        }
    },[])


   const weekDays = {
       0 : "Sunday",
       1 : "Monday",
       2 : "Tuesday",
       3 : "Wednesday",
       4 : "Thursday",
       5 : "Friday",
       6 : "Saturday"
   }

   const AppoinmentPageRef = React.createRef();

   const typeSelectHandler = (e)=>{
    console.log(e.target.value);
    setDoctorsList([]);
    if(e.target.value === "rediograpghy and tests"){
        // because the first spec.in list is "lab"
        setSpicializationsList([spicializations[0]])
        setType("rediograpghy and tests")
    }
    else{
        // because the first spec.in list is "lab"
        setSpicializationsList(spicializations.slice(1))
        if(e.target.value === "normal check up"){
            setType("normal check up")
        }
        else if(e.target.value === "follow up"){
            setType("follow up")
        }
    }
   }

   const specialitySelectHandler = (e)=>{
    console.log(e.target.value);
    setDoctorsList(doctors.filter(doctor=>doctor.specializationId === e.target.value))
   }

   const doctorSelectHandler = (e)=>{
    console.log(JSON.parse(e.target.value));
    setBookingDetails(JSON.parse(e.target.value));
    setShowBookingButton(true);
   }

   const formSumbitHandler = (e)=>{
    e.preventDefault();
    console.log(bookingDetails);
    Requester.post("/bookings/bookAppointment", bookingDetails)
    .then((response)=>{
        // console.log(response);
        fetchUserBookings();
        window.alert("Booked Successfully");
        AppoinmentPageRef.current.click();
    })
    .catch((error)=>{
        console.log(error);
        window.alert("Booking Process Failed");
    })
   }


   const fetchUserBookings = () => {
    let booingsUrl = `/bookings/allBookingByUserId/${JSON.parse(window.localStorage.getItem("userData"))._id}`;
    Requester.get(booingsUrl)
    .then((response)=>{
        // console.log(response)
        setBookings(response.data)
    })
    .catch((error)=>{
        console.log(error)
    })
   }

  
    return (
        <>
            <section className="Booking">
                <div className="container">  
                    <div className={"booking_container"}>
                        <div className="leftTable">
                            <ul>
                            <li onClick={()=>{setView("book")}}>Book Appointment</li>
                            <li ref={AppoinmentPageRef} onClick={()=>{setView("list")}}>My Appointments</li>
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
                                    {doctorsList.map(function(doctor, index){
                                        return(
                                        <React.Fragment key={index}>
                                            {doctor.availableDays.map((day, idx)=>{
                                                    if(!!parseInt(day)){
                                                        return(
                                                            <option 
                                                             key={`${index} - ${idx}`} 
                                                             value={JSON.stringify({
                                                                 doctorId:doctor._id,
                                                                 userId: props.appState.userData._id,
                                                                 bookingDay:index,
                                                                 specializationId:doctor.specializationId,
                                                                 bookingType: type,
                                                                })}
                                                            >
                                                                {doctor.name} - {weekDays[idx]} - From {doctor.startTime}:00 To {doctor.endTime}:00 
                                                            </option>
                                                        )
                                                    }
                                                })
                                            }
                                            </React.Fragment>
                                        )
                                    })}
                                </select>
                                
                                {showBookingButton &&<button className="btn1">Book Appointment</button>}

                            </form>
                            }

                            {view==="list" &&
                            <>
                             <h2>Appointments List</h2>
                             {bookings.map((booking, index)=>{
                                 return(
                                    <div key={index} className="appointment">
                                        <ul style={{
                                            color : booking.currentNumberInQeue > 0 ? "green" : "grey" 
                                            }}>
                                            <li>{`Name : ${booking.userData.firstName} ${booking.userData.lastName}`}</li>
                                            <li>{`Dr : ${booking.doctorData.name}`}</li>
                                            <li>{`Specialization : ${booking.doctorData.specilizationName}`}</li>
                                            <li>{`Day and time  : ${weekDays[parseInt(booking.bookingDay)]} - from ${booking.doctorData.startTime}:00 To ${booking.doctorData.endTime}:00`} </li>
                                            <li>{`Queue length : ${booking.totalNumberInQeue}`}</li>
                                            <li>{`Your number in Queue : ${booking.numberInQeue}`}</li>
                                            <li>{`Current in Queue: ${booking.currentNumberInQeue}`}</li>
                                            <li>{`Queue status: ${booking.currentNumberInQeue > 0 ? "The Queue Started" : "The Queue Did not Started Yet"}`}</li>
                                        </ul>
                                            <button className="btn2">Cancel</button>
                                    </div>
                                 )
                             })}
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
