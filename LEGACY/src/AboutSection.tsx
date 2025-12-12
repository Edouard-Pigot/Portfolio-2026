import './AboutSection.css'

import GridSection from './GridSection';
import ScrollingBanner from './ScrollingBanner';

import { useTranslation } from "react-i18next";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from "gsap/SplitText";
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

function AboutSection() {
  const { t } = useTranslation();

  const descriptionContainer = useRef<HTMLDivElement | null>(null);
  const description = useRef<HTMLParagraphElement | null>(null);
  const descriptionJP = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      let splitDescription = SplitText.create(description.current, { type: "words", smartWrap: true });
      gsap.from(splitDescription.words, {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => { splitDescription.revert() }
      });
      let splitDescriptionJP = SplitText.create(descriptionJP.current, { type: "words", smartWrap: true });
      gsap.from(splitDescriptionJP.words, {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.5
        },
        onComplete: () => { splitDescriptionJP.revert() }
      });
    },
    { scope: descriptionContainer }
  ); // <-- scope for selector text (optional)

  return (
    <>
      <GridSection className='about-section'>
        <div className='border-left'></div>
        <ScrollingBanner text={t(`about-banner`)} textJP={"私について"} direction={-1} />
          <div ref={descriptionContainer} id="about-description">
            <p ref={description}><span className="slash-decorator">///</span>&nbsp;{t(`about-description`)}</p>
          </div>
        <div className='border-right'></div>
      </GridSection>
    </>
  )
}

export default AboutSection;
