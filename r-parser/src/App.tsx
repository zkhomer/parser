import Footer from "./layout/footer/Footer.tsx"
import Header from "./layout/header/Header.tsx"
import './App.scss'
import React, {useEffect, useState} from "react";
import { store } from "./store/store.ts";

const App: React.FC = () => {
    const [test, setTest] = useState<string>(store.getState().data)
    const [data, setData] = useState([])
    const clear = () => setTest('')

    const checkData = async (): Promise<void> => {
        const dataUrl = "http://localhost:3000/allUsers";
        const response = await fetch(dataUrl, {
            method: "GET",
        });

        const result = await response.json();
        setData(result)

    };

    useEffect(() => {
            checkData()
            console.log('lolo')
        },
        [])

    return (
        <>
            <Header/>
            <Footer
                content={test}
                clear={clear}
            />
            <button onClick={() => console.log(data)}>check</button>
            {data.map(({name, _id}) => <p key={_id}> name: {name} id: {_id}</p>)}
        </>
    )
}

export default App