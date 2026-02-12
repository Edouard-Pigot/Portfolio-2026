import './App.module.scss';

import MainDecorator from '../MainDecorator/MainDecorator';
import CV from '../CV_page/CV/CV';

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
