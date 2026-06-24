import './App.module.scss';

import MainDecorator from '@components/MainDecorator/MainDecorator';
import PageLoader from '@components/PageLoader/PageLoader';

import { HashRouter, Routes, Route, useParams, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

function LanguageWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang === 'en' || lang === 'fr') {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (lang !== 'en' && lang !== 'fr') {
    return <Navigate to="/en" replace />;
  }

  const metaDescription = lang === 'fr' 
    ? "Le site portfolio d'Edouard PIGOT, développeur logiciel."
    : "The portfolio website of Edouard PIGOT, software developper.";
  const metaKeywords = lang === 'fr' 
    ? "Edouard, Pigot, portfolio, ingénieur, développeur, site, personnel, projets, web, c++, informatique"
    : "Edouard, Pigot, portfolio, engineer, dvelopper, site, personnal, projects, web, c++, computer science";

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <meta name="description" content={metaDescription}/>
        <meta name="keywords" content={metaKeywords}/>
      </Helmet>
      <Outlet />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainDecoratorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleLoadComplete = () => {
      setIsLoading(false);
    }
    
    // If page is already loaded, set immediately
    if (document.readyState === 'complete') {
      handleLoadComplete();
      return;
    }
    
    // Add both DOMContentLoaded and load listeners for reliability
    window.addEventListener('load', handleLoadComplete);
    window.addEventListener('DOMContentLoaded', handleLoadComplete);
    
    // Fallback timeout after 3 seconds
    const timeout = setTimeout(handleLoadComplete, 3000);
    
    return () => {
      window.removeEventListener('load', handleLoadComplete);
      window.removeEventListener('DOMContentLoaded', handleLoadComplete);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/fr" replace />} />
        <Route path="/:lang" element={<LanguageWrapper />}>
          <Route index element={
            <>
              <PageLoader 
                isLoading={isLoading}
                mainDecoratorRef={mainDecoratorRef}
              />
              <MainDecorator ref={mainDecoratorRef} />
            </>
        } />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
