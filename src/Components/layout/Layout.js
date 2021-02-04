import React from 'react'
import {Helmet} from "react-helmet";

import "./layout.scss";

import Header from "./Header";
import Footer from "./Footer";


function Layout({
    children,
    title = 'E7gezly',
    description = `E7gezly is new-technology that helps patients
     to queue their visit to X hospital without having to wait
     inside the hospital for a long time due to covid-19 pandemic
     all that through e7gezly website.`,

  })  {
    return (<>
        <Helmet>
            <title>{title}</title>
            <meta  name="description" content={description}></meta>
        </Helmet>
        <Header/>
        <main className="appMain">
            {children}
        </main>
        <Footer/>
        </>
    )
}
export default Layout;
