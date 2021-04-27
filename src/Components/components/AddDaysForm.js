import React, { useCallback, useEffect, useState } from 'react';
import Requester from '../../utilities/Requester';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function AddDaysForm() {
    const [doctor, setDoctor] = useState(null);
    const[selectedDay, setSelectedDay]=useState(null);

    useEffect(()=>{
        fetchDoctors();
    }, [])

    const fetchDoctors = () => {
        Requester.get("/doctor/allDoctors")
        .then((response) => {
            const doctors = response.data.filter((dr)=>{
                return dr._id === JSON.parse(window.localStorage.getItem("userData"))._id
            })
            setDoctor(doctors[0]);
        })
        .catch((error) => {
            console.log(error)
        })

    }

    const addAvailableDays = useCallback(()=>{
        const found = [...doctor.availableDays].find(day => day === selectedDay);
        if(found){
            window.alert("This Day Already Added");
        }
        else{
            const payload = {
                doctorId : doctor._id,
                availableDays : [...doctor.availableDays, selectedDay]
            };
    
            console.log(payload);
    
            Requester.put("/doctor/updateAvailableDays", payload).then(()=>{
                setSelectedDay(null);
                fetchDoctors();
                window.alert("Day Added Successfully");
            }).catch((err)=>{
                console.log(err)
            });
        }
    }, [selectedDay])

    return (
        <>
           <p>Select and add new available days : </p>
           
           {<SingleDatePicker
                date={null} // momentPropTypes.momentObj or null
                onDateChange={date => {
                    // console.log(new Date(date).getTime())
                    setSelectedDay(new Date(date).getTime())
                }}
                focused={true} // PropTypes.bool
                onFocusChange={({ focused }) => {}} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
            />}
            <p>
                <b>{selectedDay && new Date(selectedDay).toDateString()}</b>    
            </p>
            {selectedDay && <button onClick={addAvailableDays} className="btn1">Add</button>}
        </>
    )
}

export default AddDaysForm
