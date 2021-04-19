import React from 'react';

const UserAppointmentCard = ({booking}) => {

    return (
             <div className="appointment">
                <ul style={{
                    color : booking.currentNumberInQeue > 0 ? "#47b70d" : "#bbbbbb" 
                    }}>
                    <li>{`Name : ${booking.userData.firstName} ${booking.userData.lastName}`}</li>
                    <li>{`Dr : ${booking.doctorData.name}`}</li>
                    <li>{`Dr Email : ${booking.doctorData.email}`}</li>
                    <li>{`Specialization : ${booking.doctorData.specilizationName}`}</li>
                    <li>{`Day and time  : ${new Date(booking.bookingDay).toDateString()} - from ${booking.doctorData.startTime}:00 To ${booking.doctorData.endTime}:00`} </li>
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
                    {/* <button className="btn2">Cancel</button> */}
            </div>
    );
};

export default UserAppointmentCard;