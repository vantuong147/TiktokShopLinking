import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TTSPage from './tts/index';
import LinkShop from './tts/view/linkshop';
import Connector from './tts/view/connector';
import APItiktok from './tts/view/api';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tts" element={<TTSPage />} />
        <Route path="/tts/connector" element={<Connector />} />
        <Route path="/tts/linkshop" element={<LinkShop />} />
        <Route path="/tts/api" element={<APItiktok />} />
      </Routes>
    </Router>
  );
}

export default App;
