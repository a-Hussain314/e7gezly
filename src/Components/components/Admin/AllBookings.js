import React, { useEffect, useState } from 'react'
import Requester from '../../../utilities/Requester';

function AllBookings() {

    const [allBookings, setAllBookings] = useState([]);
    useEffect(() => {
        Requester.get("/bookings/allBooking").then((res) => {
            setAllBookings(res.data);
        })
    }, [])
    return (
        <>
            <h1>All Users Bookings</h1>
            {allBookings.map((booking) => {
                return (
                    <div className="appointment">
                        <ul>
                            <li>{`Name : ${booking.userData.firstName} ${booking.userData.lastName}`}</li>
                            <li>{`Dr : ${booking.doctorData.name}`}</li>
                            <li>{`Dr Email : ${booking.doctorData.email}`}</li>
                            <li>{`Specialization : ${booking.doctorData.specilizationName}`}</li>
                            <li>{`Day and time  : ${new Date(+booking.bookingDay).toDateString()} - from ${booking.doctorData.startTime} To ${booking.doctorData.endTime}`} </li>
                            
                        </ul>
                        {/* <button className="btn2">Cancel</button> */}
                    </div>
                )
            })}
        </>
    )
}

export default AllBookings;
