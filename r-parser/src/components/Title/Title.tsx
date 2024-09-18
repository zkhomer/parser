import {FC} from "react";
import {titleComponentProps} from "../../../type /interfaces.ts";



const Title:FC<titleComponentProps> = ({titleContent, modificationClass}) => {
    return(
        <h1 className={`main-Title text-6xl ${modificationClass}`}>
            { titleContent }
        </h1>
    );
}

export default Title;