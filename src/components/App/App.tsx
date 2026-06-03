import './App.module.scss';

import MainDecorator from '@components/MainDecorator/MainDecorator';
import PageLoader from '@components/PageLoader/PageLoader';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainDecoratorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.onload = () => setIsLoading(false);
    }
  }, []);

  return (
    <BrowserRouter basename="/Portfolio-2026">
      <Routes>
        <Route path="/" element={
            <>
              <PageLoader 
                isLoading={isLoading}
                mainDecoratorRef={mainDecoratorRef}
              />
              <MainDecorator ref={mainDecoratorRef} />
            </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
