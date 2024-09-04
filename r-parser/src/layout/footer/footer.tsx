import {useEffect, FC, useState, useRef} from "react";

interface testProps {
    content: string
    clear: () => void
}

const Footer: FC<testProps> = (testProps) => {
    return (
        <>
            <h1>
                hello, {testProps.content || "type any text"}
            </h1>
            <button
                onClick={ testProps.clear }
            >
                clear
            </button>
        </>
    )
}

export default Footer