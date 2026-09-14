import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import './Dashboard.css';

function Dashboard() {
  const [liveGames, setLiveGames] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [gamesRes, newsRes, playersRes] = await Promise.all([
        axios.get('/api/scores/live'),
        axios.get('/api/news?limit=5'),
        axios.get('/api/players/top/performers?limit=5'),
      ]);

      setLiveGames(gamesRes.data);
      setTopNews(newsRes.data.news || []);
      setTopPlayers(playersRes.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="dashboard-container">
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">NFL Fantasy Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Live Games Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h2 className="section-title">Live Games</h2>
          {liveGames.length > 0 ? (
            <div className="games-grid">
              {liveGames.map((game) => (
                <Card key={game._id} className="game-card">
                  <Card.Body>
                    <div className="game-matchup">
                      <div className="team-info">
                        <h5>{game.homeTeam}</h5>
                        <div className="score-display">{game.homeScore}</div>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team-info">
                        <h5>{game.awayTeam}</h5>
                        <div className="score-display">{game.awayScore}</div>
                      </div>
                    </div>
                    <div className="game-status">{game.status}</div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No live games at the moment</p>
          )}
        </Col>
      </Row>

      {/* Top News Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h2 className="section-title">Latest AI-Generated News</h2>
          {topNews.length > 0 ? (
            <div className="news-list">
              {topNews.map((news) => (
                <Card key={news._id} className="news-card mb-3">
                  <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <Card.Text className="ai-summary">{news.aiSummary || news.content.substring(0, 200)}...</Card.Text>
                    <small className="text-muted">
                      {news.source && `Source: ${news.source}`}
                      {news.aiGenerated && ' • AI Generated'}
                    </small>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No news available</p>
          )}
        </Col>
      </Row>

      {/* Top Players Section */}
      <Row>
        <Col md={12}>
          <h2 className="section-title">Top Performers</h2>
          {topPlayers.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Fantasy Points (PPR)</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player) => (
                    <tr key={player._id}>
                      <td>{player.playerName}</td>
                      <td>{player.team}</td>
                      <td>{player.position}</td>
                      <td>
                        <strong>{player.fantasyPointsPPR?.toFixed(2) || 0}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No player data available</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
