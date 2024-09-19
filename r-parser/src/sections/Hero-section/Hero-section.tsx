import {FC} from "react";
import Title from "../../components/Title/Title.tsx";
import NavBar from "../../components/NavBar/NavBar.tsx";

const HeroSection:FC = () => {
    return (
        <header className="hero text-white">
            <img className="hero_bg-image" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt='hero background image'/>
            <div className="hero-wrapper container items-center my-5 mx-auto px-5 ">
                <Title
                    titleContent={'HERO TITLE'}
                    modificationClass='mb-3'
                />
                <div className="hero_description-content-wrapper">
                    <p className="hero_description-content-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi atque dolores ipsa ipsum pariatur perspiciatis quae sunt totam veniam. → → →
                    </p>
                </div>
                <NavBar menuItems={['hello→', 'item1→', "item 3→"]}/>
                <div className="hero_grid-wrapper">
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-gray-300">Offices worldwide</dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">12</dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-gray-300">Full-time colleagues</dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">300+</dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-gray-300">Hours per week</dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">40</dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-gray-300">Paid time off</dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">Unlimited</dd>
                        </div>

                    </dl>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;