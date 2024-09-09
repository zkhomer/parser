import { FC } from "react";

interface testProps {
    content: string
    clear: () => void
}

const Footer: FC<testProps> = ({content, clear}) => {
    return (
        <>
            <h1>
                hello, {content || "type any text" }
            </h1>
            <button
                className={ 'bg-amber-200 border-blue-800 border-2' }
                onClick={ clear }
            >
                clear
            </button>
        </>
    )
}

export default Footer