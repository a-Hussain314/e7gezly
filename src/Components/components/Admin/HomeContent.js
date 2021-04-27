import React, { useState, useEffect } from 'react'
import Requester from '../../../utilities/Requester';

function HomeContent() {
    const initialFormData = {
        title: "",
        content: ""
    };
    const [news, setNews] = useState([]);
    const [advices, setAdvices] = useState([]);
    const [newInfo, setNewInfo] = useState(initialFormData);
    const [adviceInfo, setAdviceInfo] = useState(initialFormData);

    useEffect(() => {
        fetchNews();
        fetchAdvices();
    }, [])

    const fetchNews = () => {
        Requester.get("/home/allNews")
            .then((response) => {
                // console.log(response)
                setNews(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchAdvices = () => {
        Requester.get("/home/allAdvices")
            .then((response) => {
                // console.log(response)
                setAdvices(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const updateAdviceInfo = (e) => {
        const newFormInfo = adviceInfo;
        newFormInfo[e.target.id] = e.target.value;
        setAdviceInfo({ ...newFormInfo })
    };

    const updateNewInfo = (e) => {
        const newFormInfo = newInfo;
        newFormInfo[e.target.id] = e.target.value;
        setNewInfo({ ...newFormInfo })
    };

    const newSubmitHandler = (e) => {
        e.preventDefault();
        Requester.post("/home/addNew", newInfo).then(() => {
            window.alert("New Added Successfully");
            fetchNews();
            setNewInfo(initialFormData)
        })
    }

    const adviceSubmitHandler = (e) => {
        e.preventDefault();
        Requester.post("/home/addAdvice", adviceInfo).then(() => {
            window.alert("Advice Added Successfully");
            fetchAdvices();
            setAdviceInfo(initialFormData)
        })
    }

    const deleteNew = (e) => {
        Requester.delete(`/home/deleteNew/${e.target.id}`).then(() => {
            window.alert("New Deleted Successfully");
            fetchNews();

        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteAdvice = (e) => {
        Requester.delete(`/home/deleteAdvice/${e.target.id}`).then(() => {
            window.alert("New Deleted Successfully");
            fetchAdvices();

        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <form onSubmit={newSubmitHandler}>
                <h1>Add News</h1>

                <label htmlFor="title">title</label>
                <input id="title" type="text" required onChange={updateAdviceInfo} value={newInfo.title} placeholder="" />

                <label htmlFor="content">content</label>
                <input id="content" type="text" required onChange={updateAdviceInfo} value={newInfo.content} placeholder="" />

                <button id="submit" type="submit" className="btn1">Add</button>
            </form>
            {!!news.length && <section className="news">
                <h3>Latest News</h3>
                {news.map((topic, index) => {
                    return (
                        <div className={"newBox"} key={topic._id}>
                            <h4>{topic.title}</h4>
                            <p className={"spaceBetween_Row"}>
                                <span>{topic.content}</span>
                                <span><button id={topic._id} onClick={deleteNew} className="btn2">Delete</button></span>
                            </p>
                        </div>)
                })}
            </section>}

            <form onSubmit={adviceSubmitHandler}>
                <h1>Add Advice</h1>

                <label htmlFor="title">title</label>
                <input id="title" type="text" required onChange={updateAdviceInfo} value={adviceInfo.title} placeholder="" />

                <label htmlFor="content">content</label>
                <input id="content" type="text" required onChange={updateAdviceInfo} value={adviceInfo.content} placeholder="" />

                <button id="submit" type="submit" className="btn1">Add</button>
            </form>

            {!!advices.length && <section className="covid">
                <h3>Covid-19 advices</h3>
                {advices.map((topic) => {
                    return (
                        <div className={"tipBox"} key={topic._id}>
                            <h4>{topic.title}</h4>
                            <p className={"spaceBetween_Row"}>
                                <span>{topic.content}</span>
                                <span><button id={topic._id} onClick={deleteAdvice} className="btn2">Delete</button></span>
                            </p>
                        </div>)
                })}
            </section>}
        </>
    )
}

export default HomeContent
