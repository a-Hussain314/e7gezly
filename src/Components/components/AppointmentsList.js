import React, { useState, useEffect } from 'react';
import Requester from "../../utilities/Requester";

import UserAppointmentCard from './UserAppointmentCard';
import DoctorAppointmentCard from './DoctorAppointmentCard';

const AppointmentsList = () => {
    const[bookings, setBookings] = useState([]) 

    useEffect(()=>{
            if(bookings.length===0)
            {
                fetchUserBookings();
                
            }
            let realTime=0;

            // to ensure the interval gets setted at the first mount only, when the bookins 
            // is still = [] & also checks if the current user is "user" not "doctor"
            if(bookings.length===0 && JSON.parse(window.localStorage.getItem("userData")).type==="user"){  
                console.log("request will be made every 30 seconds");
              realTime= setInterval(fetchUserBookings, 3000)
            }
    
            return ()=>{
                console.log("request interval cleared");
                clearInterval(realTime);
            }
    
            
    }, [])

    const fetchUserBookings = () => {
        if(JSON.parse(window.localStorage.getItem("userData")).type==="user"){
            // create the request urlusing te current userid from the local storage
            let booingsUrl = `/bookings/allBookingByUserId/${JSON.parse(window.localStorage.getItem("userData"))._id}`;
            
            Requester.get(booingsUrl)
            .then((response)=>{
                console.log("all bookings")
                console.table(response.data)
                setBookings(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }else if (JSON.parse(window.localStorage.getItem("userData")).type==="doctor"){
            //  fetch all the appointment and filter the appoinments of the current doctor. 
            Requester.get(`/bookings/allBookingByDoctorId/${JSON.parse(window.localStorage.getItem("userData"))._id}`)
            .then((response)=>{
                console.log("doctor bookings")
                console.table(response.data)
                setBookings(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }

   }

   const next =(dayTimeStamp)=>{
    
    console.log("next")
    Requester.post(`/bookings/nextOneInQeue/${JSON.parse(window.localStorage.getItem("userData"))._id}/${dayTimeStamp}`).then(()=>{
        window.alert("done")
    }).catch((err)=>{
        window.alert("error")
    });

   }

    return (
        <>
        {bookings.length > 0 ?  
           JSON.parse(window.localStorage.getItem("userData")).type==="user" ?

               bookings.map((booking, index)=>{
                   return(
                        <UserAppointmentCard key={index} booking={booking}/>
                    )
               })
               
               :
           
               bookings.map((day, index)=>{
                  return(
                  <div key={index}>
                       <h2 className="Title">{new Date(day.day).toDateString()} Appointments : </h2>
                       
                       {day.appointments.length > 0 ?
                           <>
                               <h2 className="Title">Current in Queue : {day.appointments[0].currentNumberInQeue} / Queue length : {day.appointments.length}</h2> 
                               <button className="btn1" onClick={()=>{next(day.day)}}>Next Appointment</button>
                               <div >
                                   {day.appointments.map((booking,idx)=>{
                                       return(
                                           <DoctorAppointmentCard key={idx} booking={booking}/>
                                       )
                                   })}
                               </div>
                           </>
                       :
                           <p className="no_appointment">You Have No Appointments in this day.</p>
                       }
                  </div>
                  )
               })
           :
           <p className="no_appointment">You Have No Appointments.</p>
       }
       </>
    );
};

export default AppointmentsList;