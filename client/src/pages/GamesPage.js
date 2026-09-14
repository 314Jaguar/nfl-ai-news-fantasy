import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Form } from 'react-bootstrap';

function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('all');
  const [week, setWeek] = useState('');

  useEffect(() => {
    fetchGames();
  }, [status, week]);

  const fetchGames = async () => {
    setLoading(true);
    try {
      let url = '/api/games';
      const params = [];
      if (status !== 'all') params.push(`status=${status}`);
      if (week) params.push(`week=${week}`);
      if (params.length > 0) url += '?' + params.join('&');

      const response = await axios.get(url);
      setGames(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load games');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">NFL Games</h1>

      {error && <div className="error-message">{error}</div>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Week</Form.Label>
            <Form.Control
              type="number"
              placeholder="Week number"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              min="1"
              max="18"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {games.length > 0 ? (
            <div className="games-list">
              {games.map((game) => (
                <Card key={game._id} className="game-card mb-3">
                  <Card.Body>
                    <Row>
                      <Col md={4} className="text-center">
                        <h5>{game.homeTeam}</h5>
                        <div className="score-display">{game.homeScore || '-'}</div>
                      </Col>
                      <Col md={4} className="text-center">
                        <div className="vs">VS</div>
                        <div className="game-status">{game.status}</div>
                        <small>{new Date(game.startTime).toLocaleDateString()}</small>
                      </Col>
                      <Col md={4} className="text-center">
                        <h5>{game.awayTeam}</h5>
                        <div className="score-display">{game.awayScore || '-'}</div>
                      </Col>
                    </Row>
                    {game.venue && (
                      <div className="mt-3">
                        <small className="text-muted">📍 {game.venue}</small>
                      </div>
                    )}
                    {game.aiRecap && (
                      <div className="mt-3">
                        <small>
                          <strong>AI Recap:</strong> {game.aiRecap.substring(0, 200)}...
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No games found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default GamesPage;
