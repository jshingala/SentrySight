import React from "react";
import Hero from "./Hero";
import VideoSection from "./VideoSection";
import NewsSlider from "./NewsSlider";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <VideoSection />
      <NewsSlider />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
