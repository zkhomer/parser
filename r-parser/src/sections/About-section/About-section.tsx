import {FC} from "react";
import {aboutSectionProps} from "../../../type /interfaces.ts";
import Title from "../../components/Title/Title.tsx";

const AboutSection:FC<aboutSectionProps> = ({title, description}) => {
    return (
        <section className={'about-section'}>
            <div className="about-section__wrapper container items-center my-20 mx-auto px-5">
            <Title
                titleContent={title}
                modificationClass='mb-3'
            />
            <p>{description}</p>
            </div>
        </section>
)
    };

export default AboutSection;