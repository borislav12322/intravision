import React, { ReactElement, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from './pages/testPage/TestPage';
import ApplicationPageContainer from './pages/applicationPage/ApplicationPageContainer';
import InputSearchContainer from './components/inputSearch/InputSearchContainer';

const App = (): ReactElement => (
  <BrowserRouter>
    <div className="App">
      <Sidebar />
      <InputSearchContainer />
      <div className="mainContent">
        <Routes>
          <Route path="/dataBase" element={<TestPage />} />
          <Route path="/applications" element={<ApplicationPageContainer />} />
          <Route path="/employers" element={<TestPage />} />
          <Route path="/clients" element={<TestPage />} />
          <Route path="/actives" element={<TestPage />} />
          <Route path="/settings" element={<TestPage />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
