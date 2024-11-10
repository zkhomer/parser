import {FC} from "react";
import {aboutSectionProps} from "../../../type /interfaces.ts";
import Title from "../../components/Title/Title.tsx";

const AboutSection:FC<aboutSectionProps> = ({title, description}) => {
    return (
        <>
            <Title
                titleContent={title}
                modificationClass='mb-3'
            />
            <p>{description}</p>
        </>
)
    };

export default AboutSection;