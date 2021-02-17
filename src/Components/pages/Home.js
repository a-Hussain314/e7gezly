import React, { useState, useEffect } from 'react';
import Requester from "../../utilities/Requester";
import "./Home.scss";


function Home(props) {
    const [news, setNews] = useState([]);
    const [advices, setAdvices] = useState([]);


    useEffect(()=>{
        Requester.get("/home/allAdvices")
        .then((response)=>{
            // console.log(response)
            setAdvices(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })


        Requester.get("/home/allNews")
        .then((response)=>{
            // console.log(response)
            setNews(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })


    },[])
    return (
        <>
                <section className="home_hero">
                    <div className="container">   
                        <div className="hero_container">
                            <h3>{"E7gezly is new-technology that helps patients to queue their visit to X hospital without having to wait inside the hospital for a long time due to covid-19 pandemic all that through e7gezly website."}</h3>
                            <img src={require("../images/doctor.png")} alt={"doctor"}/>
                        </div> 
                    </div>
                </section>
                
                {!!news.length && <section className="news">
                    <div className="container">    
                        <h3>Latest News</h3>
                        {news.map((topic, index)=>{
                            return(
                            <div key={index}>
                                <h4>{topic.title}</h4>
                                <p>{topic.content}</p>    
                            </div>)
                        })}
                    </div>
                </section>}

                {!!advices.length && <section className="covid">
                    <div className="container">    
                        <h3>Covid-19 advices : </h3>
                        {advices.map((advice, index)=>{
                            return(
                            <div key={index}>
                                <h4>{advice.title}</h4>
                                <p>{advice.content}</p>    
                            </div>)
                        })}
                    </div>
                </section>}
        </>
    )
}
export default Home;
