import {FC} from 'react';
import HeroSection from "../../sections/Hero-section/Hero-section.tsx";
import AboutSection from "../../sections/About-section/About-section.tsx";

const LandingPage:FC = () =>{

    return (
      <>
          <HeroSection/>
          <AboutSection
            title= {'this is title'}
            description= {'this is description'}
          />
      </>
    );
}

export default LandingPage;