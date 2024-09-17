import Footer from "./layout/footer/Footer.tsx"
import Header from "./layout/header/Header.tsx"
import './App.scss'
import React, {} from "react";
import LandingPage from "./views/landing-page/Landing-page.tsx";
// import { store } from "./store/store.ts";

const App: React.FC = () => {
    return (
        <div className="app-wrapper min-h-screen flex flex-col">
            <Header/>
            <LandingPage/>
            <Footer content="FOOTER"/>
        </div>
    )
}

export default App