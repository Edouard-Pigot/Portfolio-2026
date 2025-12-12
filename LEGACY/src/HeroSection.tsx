import './HeroSection.css'

import GridSection from './GridSection';
import SplitText from "gsap/SplitText";

import { useTranslation } from "react-i18next";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

function HeroSection() {
  const { t } = useTranslation();

  const nameContainer = useRef<HTMLDivElement | null>(null);
  const name = useRef<HTMLHeadingElement | null>(null);
  const nameJP = useRef<HTMLHeadingElement | null>(null);
  const descriptionContainer = useRef<HTMLDivElement | null>(null);
  const description = useRef<HTMLParagraphElement | null>(null);
  const descriptionJP = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      let splitName = SplitText.create(name.current, { type: "chars, words, lines", smartWrap: true });
      gsap.from(splitName.chars, {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => { splitName.revert() }
      });
      let splitNameJP = SplitText.create(nameJP.current, { type: "chars, words, lines", smartWrap: true });
      gsap.from(splitNameJP.chars, {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => { splitNameJP.revert() }
      });
      let splitDescription = SplitText.create(description.current, { type: "chars, words, lines", smartWrap: true });
      gsap.from(splitDescription.chars, {
        y: 50,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => { splitDescription.revert() }
      });
      let splitDescriptionJP = SplitText.create(descriptionJP.current, { type: "chars, words", smartWrap: true });
      gsap.from(splitDescriptionJP.chars, {
        y: 50,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => { splitDescriptionJP.revert() }
      });
    },
    { scope: nameContainer }
  ); // <-- scope for selector text (optional)

  return (
    <>
      <GridSection className='hero-section'>
          <div ref={nameContainer} id="hero-title">
            <h1 ref={name}><span className="slash-decorator">/</span>&nbsp;EDOUARD&nbsp;PIGOT</h1>
          </div>
          <div ref={descriptionContainer} id="hero-description">
            <p ref={description}><span className="slash-decorator">//</span>&nbsp;{t(`hero-description`)}</p>
          </div>
          <div id="hero-image"></div>
      </GridSection>
    </>
  )
}

export default HeroSection;
