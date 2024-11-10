import {FC} from "react";
import Title from "../../components/Title/Title.tsx";

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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet animi architecto aspernatur assumenda commodi consequuntur corporis cum dolorem doloremque ducimus eaque enim excepturi explicabo fuga illo illum magni maxime natus nesciunt nostrum nulla obcaecati officiis perferendis provident quae, quaerat saepe sed sequi similique sit suscipit tempora totam ullam ut voluptates, voluptatum? Accusamus adipisci animi atque aut consequatur dignissimos dolores, est maiores molestiae odio odit pariatur possimus saepe. Aspernatur deserunt ea esse minima voluptatum. Amet animi culpa dignissimos distinctio doloribus enim excepturi expedita id iste, modi nesciunt officiis perspiciatis porro quas quibusdam quidem quo reprehenderit sint, unde voluptate. A accusamus aliquam amet distinctio eius error exercitationem facilis harum illo ipsam laborum laudantium magni minus natus nemo, officia provident quisquam quo ratione reiciendis rerum sit temporibus vel velit voluptatibus! Accusamus asperiores at blanditiis est eveniet laboriosam modi molestiae necessitatibus obcaecati, officiis optio reprehenderit repudiandae rerum sapiente sit soluta, tempora, vel voluptates voluptatibus voluptatum? Adipisci aperiam autem cupiditate deleniti ducimus eius enim explicabo inventore ipsum iure iusto laboriosam laudantium nulla numquam, odit perferendis quis suscipit velit voluptas voluptate! Adipisci consectetur, cum deserunt est eum expedita incidunt ipsa iusto modi, nulla quo unde ut velit veritatis voluptate. Accusantium consequatur delectus excepturi facilis ipsum!
                    </p>
                </div>
                <div className="hero_grid-wrapper">
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 ">
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