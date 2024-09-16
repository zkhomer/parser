import Footer from "./layout/footer/Footer.tsx"
import Header from "./layout/header/Header.tsx"
import './App.scss'
import React, {} from "react";
// import { store } from "./store/store.ts";

const App: React.FC = () => {
    return (
        <div className="app-wrapper container m-auto px-5 min-h-screen flex flex-col">
            <Header/>
            <Footer content="adsad"/>
        </div>
    )
}

export default App