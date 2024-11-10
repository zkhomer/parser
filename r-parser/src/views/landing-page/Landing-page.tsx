import {FC} from 'react';
import HeroSection from "../../sections/Hero-section/Hero-section.tsx";
import AboutSection from "../../sections/About-section/About-section.tsx";

const LandingPage:FC = () =>{
const content:string = "this is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is description"
    return (
      <>
          <HeroSection/>
          <AboutSection
            title= {'About Us'}
            description={content}
          />
      </>
    );
}

export default LandingPage;