import './App.module.scss';

import MainDecorator from '@components/MainDecorator/MainDecorator';
import CV from '@components/CV_page/CV/CV';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <MainDecorator />
        } />
        <Route path="/cv" element={
          <CV />
        } />
      </Routes>
    </Router>
  )
}

export default App
