import Footer from "./layout/footer/footer.tsx"
import './App.css'
import React, {useEffect, useState} from "react";

const App: React.FC = () => {
    const [test, setTest] = useState<string>('')
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
            console.log('loloo')
        },
        [])

    return (
        <>
            <Footer
                content={test}
                clear={clear}
            />
            <input className={"border-2"} value={test} type="text" onChange={e => setTest(e.target.value)}/>
            <button onClick={() => console.log(data)}>check</button>
            {data.map(({name, _id}) => <p key={_id}> name: {name} id: {_id}</p>)}
        </>
    )
}

export default App