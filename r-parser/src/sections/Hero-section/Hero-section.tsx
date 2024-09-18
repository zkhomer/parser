import {FC} from "react";
import Title from "../../components/Title/Title.tsx";

const HeroSection:FC = () => {
    return (
        <header className="hero">
            <img className="hero_bg-image" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt='hero background image'/>
            <div className="hero-wrapper flex justify-between container items-center my-5 mx-auto px-5 ">
                <Title
                    titleContent={'HERO TITLE'}
                    modificationClass = "text-white"
                />
            </div>
        </header>
    );
};

export default HeroSection;