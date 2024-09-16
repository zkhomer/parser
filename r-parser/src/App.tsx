import Footer from "./layout/footer/Footer.tsx"
import Header from "./layout/header/Header.tsx"
import './App.scss'
import React, {} from "react";
import Title from "./components/title/Title.tsx";
// import { store } from "./store/store.ts";

const App: React.FC = () => {
    return (
        <div className="app-wrapper min-h-screen flex flex-col">
            <Header/>
            <Title titleContent={"ololo"}/>
            <Footer content="adsad"/>
        </div>
    )
}

export default App