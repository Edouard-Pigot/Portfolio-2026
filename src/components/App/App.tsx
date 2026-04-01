import './App.module.scss';

import MainDecorator from '@components/MainDecorator/MainDecorator';
import PageLoader from '@components/PageLoader/PageLoader';
import CV from '@components/CV_page/CV/CV';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [canShowContent, setCanShowContent] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.onload = () => setIsLoaded(true);
    }
  }, []);

  return (
    <BrowserRouter basename="/Portfolio-2026">
      <Routes>
        <Route path="/" element={
            <>
              <PageLoader 
                isReady={isLoaded}
                onFinished={() => setCanShowContent(true)}
              />
              <MainDecorator startAnimation={canShowContent}/>
            </>
        } />
        <Route path="/cv" element={
          <CV />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
