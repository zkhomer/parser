import Footer from "./layout/footer/footer.tsx"
import './App.css'
import React, {useState} from "react";

const App: React.FC = () => {
    const [test, setTest] = useState<string>('')
    const clear = () => setTest('')

    return (
        <>
            <Footer
                content = { test }
                clear={clear}
            />
            <input className={"border-2"} value={test} type="text" onChange = { e => setTest(e.target.value) }/>
        </>
    )
}

export default App