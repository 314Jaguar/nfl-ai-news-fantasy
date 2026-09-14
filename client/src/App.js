import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import NewsPage from './pages/NewsPage';
import GamesPage from './pages/GamesPage';
import PlayersPage from './pages/PlayersPage';
import TeamsPage from './pages/TeamsPage';
import FantasyPage from './pages/FantasyPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await axios.get('/api/health');
      if (response.data.status === 'API is running') {
        setApiStatus('connected');
      }
    } catch (error) {
      setApiStatus('disconnected');
      console.error('API connection failed:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar apiStatus={apiStatus} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/fantasy" element={<FantasyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
