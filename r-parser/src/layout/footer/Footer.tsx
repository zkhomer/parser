import { FC } from "react";

interface testProps {
    content: string
}

const Footer: FC<testProps> = ({content}) => {
    return (
        <footer className="footer bg-gray-200 p-4 text-center mt-auto">
            <h1>
                hello, {content || "type any text" }
            </h1>
        </footer>
    )
}

export default Footer