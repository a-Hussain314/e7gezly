import React, { useEffect, useState } from 'react'
import Requester from '../../../utilities/Requester';

export default function Specializations() {
    // list of all hospital Specializations
    const [Specializations, setSpecializations] = useState([]);
    const [formInfo, setFromInfo] = useState("");

    useEffect(() => {
        fetchSpecializations()
    }, [])

    const fetchSpecializations = () => {
        Requester.get("/specialization/allSpecilizations")
            .then((response) => {
                setSpecializations(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteSpecialization = (e) => {
        Requester.delete(`/specialization/deleteSpecilization/${e.target.id}`).then(() => {
            window.alert("Specialization Deleted Successfully");
            fetchSpecializations();
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateFormInfo = (e) => {
        setFromInfo(e.target.value)
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        Requester.post("/specialization/addSpecilization", {
            specilizationName: formInfo
        }).then(() => {
            window.alert("specialization Added Successfully");
            setFromInfo("");
            fetchSpecializations()
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>

            <div>
                <form onSubmit={formSubmitHandler}>
                    <h1>Add Specialization</h1>
                    <label htmlFor="firstName">Specialization Name</label>
                    <input type="text" required onChange={updateFormInfo} value={formInfo.firstName} placeholder="" />
                    <button id="submit" type="submit" className="btn1">Add</button>
                </form>
            </div>

            <div className={"allDoctorsList"}>
                <h1>All Doctors</h1>
                {Specializations.map((item) => {
                    return (
                        <React.Fragment key={item._id}>
                            <p className={"spaceBetween_Row shadow"}>
                                <span>{item.specilizationName} </span>
                                <span><button id={item._id} onClick={deleteSpecialization} className="btn2">Delete</button></span>
                            </p>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
