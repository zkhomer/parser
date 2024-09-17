import {FC} from "react";

interface titleContentProps{
    titleContent: string
}

const Title:FC<titleContentProps> = ({titleContent}) => {
    return(
        <h1 className={"main-Title text-6xl"}>
            { titleContent }
        </h1>
    );
}

export default Title;