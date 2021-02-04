import React from 'react'
import Layout from "../layout/Layout"
import "./Home.scss";


function Home() {
    return (
        <Layout>
                <section className="home_hero">
                    <div className="container">    
                        <h3>Hero Section</h3>
                    </div>
                </section>
                <section className="news">
                    <div className="container">    
                        <h3>Latest News</h3>
                    </div>
                </section>
                <section className="covid">
                    <div className="container">    
                        <h3>Covid-19 advices</h3>
                    </div>
                </section>
        </Layout>
    )
}
export default Home;
