import Footer from "./layout/footer/footer.tsx"
import './App.css'
import React, {useEffect, useState} from "react";
import {store} from "./store/store.ts";

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
    const changeHandler = ()=>{
        store.dispatch({type:"change"})
        setTest(store.getState().data)
    }
    const clearData = () =>{
        store.dispatch({type:"clearData"})
        setTest(store.getState().data)
    }

    useEffect(() => {
            checkData()
            console.log('loloo')
        },
        [])

    return (
        <>
            <Footer
                content={test}
                clear={clear}
            />
            <input className={"border-2"} value={test} type="text"/>
            <button className={"border-2 bg-green-700"} onClick={()=>clearData()}>clear Data</button>
            <button className={"border-2"} onClick={()=>changeHandler()}>ololo change text</button>
            <button onClick={() => console.log(data)}>check</button>
            {data.map(({name, _id}) => <p key={_id}> name: {name} id: {_id}</p>)}
        </>
    )
}

export default App