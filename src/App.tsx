import React, { ReactElement } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationPageContainer from './pages/applicationPage/ApplicationPageContainer';
import InputSearchContainer from './components/inputSearch/InputSearchContainer';
import DataBase from './pages/dataBase/DataBase';
import Employers from './pages/employers/Employers';
import Clients from './pages/clients/Clients';
import Actives from './pages/actives/Actives';
import Settings from './pages/settings/Settings';

const App = (): ReactElement => (
  <BrowserRouter>
    <div className="App">
      <Sidebar />
      <InputSearchContainer />
      <div className="mainContent">
        <Routes>
          <Route path="/dataBase" element={<DataBase />} />
          <Route path="/applications" element={<ApplicationPageContainer />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/actives" element={<Actives />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
