import React, { useState, useEffect } from 'react';
import Requester from "../../utilities/Requester";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Home.scss";


function Home(props) {
    const [news, setNews] = useState([]);
    const [advices, setAdvices] = useState([]);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        Requester.get("/home/allAdvices")
            .then((response) => {
                // console.log(response)
                setAdvices(response.data)
            })
            .catch((error) => {
                console.log(error)
            })


        Requester.get("/home/allNews")
            .then((response) => {
                // console.log(response)
                setNews(response.data)
            })
            .catch((error) => {
                console.log(error)
            })


    }, [])
    return (
        <>
            <section className="home_hero">
                <Carousel
                    swipeable
                    draggable
                    showDots
                    responsive={responsive}
                    // means to render carousel on server-side.
                    infinite={true}
                    autoPlay
                    autoPlaySpeed={500000}
                    keyBoardControl={true}
                    containerClass="carousel__container"
                    renderDotsOutside
                    arrows={true}
                    // containerClass={styles.containerClass}
                    // sliderClass={styles.sliderClass}
                    // itemClass={styles.itemClass}
                    // dotListClass={styles.dotListClass}
                >
                    <div className="container">
                        <div className="hero_container">
                            <h3>{"E7gezly is new-technology that helps patients to queue their visit to X hospital without having to wait inside the hospital for a long time due to covid-19 pandemic all that through e7gezly website."}</h3>
                            <img draggable={false} src={require("../images/doctor.png")} alt={"doctor"} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="hero_container">
                            <h3>{"E7gezly is new-technology that helps patients to queue their visit to X hospital without having to wait inside the hospital for a long time due to covid-19 pandemic all that through e7gezly website."}</h3>
                            <img draggable={false} src={require("../images/doctor2.jpg")} alt={"doctor"} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="hero_container">
                            <h3>{"E7gezly is new-technology that helps patients to queue their visit to X hospital without having to wait inside the hospital for a long time due to covid-19 pandemic all that through e7gezly website."}</h3>
                            <img draggable={false} src={require("../images/doctor3.jpg")} alt={"doctor"} />
                        </div>
                    </div>
                </Carousel>
            </section>

            {!!news.length && <section className="news">
                <div className="container">
                    <h3>Latest News</h3>
                    {news.map((topic, index) => {
                        return (
                            <div className={"newBox"} key={index}>
                                <h4>{topic.title}</h4>
                                <p>{topic.content}</p>
                            </div>)
                    })}
                </div>
            </section>}

            {!!advices.length && <section className="covid">
                <div className="container">
                    <h3>Covid-19 advices</h3>
                    {advices.map((advice, index) => {
                        return (
                            <div key={index} className="tipBox">
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
