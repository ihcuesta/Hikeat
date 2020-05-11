import React, { useState, useEffect } from "react";
import { FooterAlt } from "../UI/Footer";
import { HeroAboutUs, WeAre, Erasable, ImgBg } from "../styled/AboutUsStyled";
import Typist from "react-typist";

export const AboutUs = () => {
  return (
    <>
      <HeroAboutUs>
        <ImgBg>
          <img src="https://res.cloudinary.com/dnmktvry5/image/upload/v1589133226/hikeat/static/mountains_crl7e5.jpg" />
        </ImgBg>
        <WeAre>
          <Typist cursor={{ show: false }}>We are&nbsp;</Typist>

          <Erasable>
            <Typist startDelay={1000} cursor={{ show: false }}>
              <span>gastronomy</span>
              <Typist.Backspace count={12} delay={1000} />
              <span>sport</span>
              <Typist.Backspace count={7} delay={1000} />
              <span>nature</span>
              <Typist.Backspace count={8} delay={1000} />
              <span>community</span>
              <Typist.Backspace count={11} delay={1000} />
              <span>Hikeat!</span>
            </Typist>
          </Erasable>
        </WeAre>
      </HeroAboutUs>
      <FooterAlt></FooterAlt>
    </>
  );
};
