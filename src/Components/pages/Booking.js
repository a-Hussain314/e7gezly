import React, { useState, useEffect } from 'react';
import History from "../../utilities/History";
import Requester from "../../utilities/Requester";
import "./Booking.scss";


function Booking(props) {

    // "book" or "list" : to switch view between to sub-pages. [Default = "book"]
    const[view, setView] = useState("list"); 
    
    // type of appointment "normal checkup & follow up" or "rediograpghy and tests"
    const[type, setType] = useState(null);  
    
    // list of all hospital spicializations
    const[spicializations, setSpicializations] = useState([]); 
    
    // list of the currently viewd spicializations
    const[spicializationsList, setSpicializationsList] = useState([]); 
    
    // list of all hospital doctors
    const[doctors, setDoctors] = useState([]); 
    
    // list of the currently viewd available doctors
    const[availableDoctorsList, setAvailableDoctorsList] = useState([]); 
    
    // boking details : contains data about user & doctor 
    const[bookingDetails, setBookingDetails]=useState(null); 
    
    // bollean flag to contro the visiability of te booking button
    const[showBookingButton, setShowBookingButton] = useState(false); 
    
    // list of the booking for the current user
    const[bookings, setBookings] = useState([]) 
    
    useEffect(()=>{

        // to make sure that users with accounts only can see this page
        if(!window.localStorage.getItem("userData")){
            History.push("/")
        }
        else{
            // fetch and store all hospital Specilizations in a state.
            Requester.get("/specialization/allSpecilizations")
            .then((response)=>{
                console.log("all specializations", response.data)
                setSpicializations(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })

            // fetch and store all hospital Doctors in a state.
             Requester.get("/doctor/allDoctors")
            .then((response)=>{
                console.log("all doctors", response.data)
                setDoctors(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })

            fetchUserBookings();

        }
    },[])

    // an array of week days to convert numberd weekDays from Api to actual days names.
   const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   

   const typeSelectHandler = (e)=>{
        console.log(e.target.value);

        // to clear the previous doctor list, in case any prevous doctor list existed.
        setAvailableDoctorsList([]);

        setType(e.target.value);
        if(e.target.value === "rediograpghy and tests"){
            // because the first spec. in list is "lab", and we only want it. 
            setSpicializationsList([spicializations[0]])
        }
        else{
            // because the first spec. in list is "lab", and we want to execlude it.
            setSpicializationsList(spicializations.slice(1))
        }
   }

   const specialitySelectHandler = (e)=>{
        console.log(e.target.value);

        // declaring an emty arrray to fill it with the doctors available dates, to use it later in "doctor and date" select input
        let datesList = [];

        // filter the hospital doctors, to get only the doctors with the selected speciality.
        let specialityDoctors =  doctors.filter(doctor=>doctor.specializationId === e.target.value);
        
        // loop on the filterd specialityDoctors list to extract available dates DATA, and put it in the "datesList" array.
        specialityDoctors.forEach((doctor)=>{
            doctor.availableDays.forEach((availableDay, idx)=>{
                if(!!parseInt(availableDay)){
                    let single_date_data = {
                        value : {
                            doctorId:doctor._id,
                            userId: props.appState.userData._id,
                            bookingDay:idx,
                            specializationId:doctor.specializationId,
                            bookingType: type
                        },
                        text : `${doctor.name} - ${weekDays[idx]} - From ${doctor.startTime}:00 To ${doctor.endTime}:00`
                    }
                    datesList.push(single_date_data)
                }
            })
        })

        console.log(datesList) 

        // now the available dates list is ready , lets store it in a state
        //  to be able to print it in UI as an options to user to select from
        setAvailableDoctorsList(datesList)

   }

   const doctorSelectHandler = (e)=>{
        console.log(JSON.parse(e.target.value));

        // set the selected date Data to "BookingDetails" state ,
        // to use it later in make the booking request when the user clicks on the Book Appointment
        setBookingDetails(JSON.parse(e.target.value));
        
        // make the Book Appointment visiable.
        setShowBookingButton(true);
   }

   const formSumbitHandler = (e)=>{
    e.preventDefault();

    // make the booking request, using the Data in "bookingDetails" state.
    Requester.post("/bookings/bookAppointment", bookingDetails)
    .then((response)=>{
        console.log(response);

        // re-fetch the user bokkings list, to update the bokings list in Ui with this new booking.
        fetchUserBookings();

        window.alert("Booked Successfully");
        
        // set the page view to "list" , to view the appointments list 
        setView("list");
    })
    .catch((error)=>{
        console.log(error);
        window.alert("Booking Process Failed");
    })
   }


   const fetchUserBookings = () => {
        if(JSON.parse(window.localStorage.getItem("userData")).type==="user"){
            // create the request urlusing te current userid from the local storage
            let booingsUrl = `/bookings/allBookingByUserId/${JSON.parse(window.localStorage.getItem("userData"))._id}`;
            
            Requester.get(booingsUrl)
            .then((response)=>{
                console.log("all bookings", response.data)
                setBookings(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }else if (JSON.parse(window.localStorage.getItem("userData")).type==="doctor"){
            //  fetch all the appointment and filter the appoinments of the current doctor. 
            Requester.get("/bookings/allBooking")
            .then((response)=>{
                let doctorBookings = response.data.filter(booking=>booking.doctorData.email === JSON.parse(window.localStorage.getItem("userData")).email );
                console.log("doctor bookings", doctorBookings )
                setBookings(doctorBookings)
            })
            .catch((error)=>{
                console.log(error)
            })
        }

   }

  
    return (
        
        <>
            <section className="Booking">
                <div className="container">
                {JSON.parse(window.localStorage.getItem("userData")).type==="doctor" && <h2 className="Title">Dr {JSON.parse(window.localStorage.getItem("userData")).firstName} Appointments Page </h2> }
                    <div className={"booking_container"}>
                        <div className="leftTable">
                            <ul>
                            {JSON.parse(window.localStorage.getItem("userData")).type==="user" && 
                            <li onClick={()=>{setView("book")}}>Book Appointment</li>
                            }
                            <li onClick={()=>{setView("list")}}>My Appointments</li>
                            </ul>
                        </div>
                        <div className="rightTable">

                            {view==="book" && JSON.parse(window.localStorage.getItem("userData")).type==="user" && 
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
                                    {availableDoctorsList.map((doctor, index)=>{
                                        return(
                                            <option key={index} value={JSON.stringify(doctor.value)}>{doctor.text}</option>
                                        )
                            
                                    })}
                                </select>
                                
                                {showBookingButton &&<button className="btn1">Book Appointment</button>}

                            </form>
                            }

                            {view==="list" &&
                            <>
                             <h2 className="Title">Appointments List</h2>
                             {bookings.length > 0 ?  
                              bookings.reverse().map((booking, index)=>{
                                 return(
                                    <div key={index} className="appointment">
                                        <ul style={{
                                            color : booking.currentNumberInQeue > 0 ? "#47b70d" : "#bbbbbb" 
                                            }}>
                                            <li>{`Name : ${booking.userData.firstName} ${booking.userData.lastName}`}</li>
                                            <li>{`Dr : ${booking.doctorData.name}`}</li>
                                            <li>{`Dr Email : ${booking.doctorData.email}`}</li>
                                            <li>{`Specialization : ${booking.doctorData.specilizationName}`}</li>
                                            <li>{`Day and time  : ${weekDays[parseInt(booking.bookingDay)]} - from ${booking.doctorData.startTime}:00 To ${booking.doctorData.endTime}:00`} </li>
                                            <li>{`Queue length : ${booking.totalNumberInQeue}`}</li>
                                            <li>{`Your number in Queue : ${booking.numberInQeue}`}</li>
                                            <li>{`Current in Queue : ${booking.currentNumberInQeue}`}</li>
                                            <li 
                                              style={{
                                                color : "white",
                                                textAlign:"center",
                                                fontWeight:"bold",
                                                padding:"10px",
                                                backgroundColor : booking.currentNumberInQeue > 0 ? "#47b70d" : "#bbbbbb" 
                                              }}
                                            >
                                                {`Queue status : ${booking.currentNumberInQeue > 0 ? "The Queue Started" : "The Queue Did not Start Yet"}`}
                                            </li>
                                        </ul>
                                            <button className="btn2">Cancel</button>
                                    </div>
                                 )
                             })
                            :
                            <p className="no_appointment">You Have No Appointments.</p>
                            }
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
