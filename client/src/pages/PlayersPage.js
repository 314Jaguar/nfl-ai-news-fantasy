import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Form } from 'react-bootstrap';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState('');
  const [week, setWeek] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, [position, week]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      let url = '/api/players/top/performers?limit=50';
      if (position) url += `&position=${position}`;
      if (week) url += `&week=${week}`;

      const response = await axios.get(url);
      setPlayers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load player stats');
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
      <h1 className="mb-4">NFL Players</h1>

      {error && <div className="error-message">{error}</div>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Select value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="">All Positions</option>
              <option value="QB">QB</option>
              <option value="RB">RB</option>
              <option value="WR">WR</option>
              <option value="TE">TE</option>
              <option value="DEF">DEF</option>
              <option value="K">K</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Week</Form.Label>
            <Form.Control
              type="number"
              placeholder="Week"
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
          {players.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Week</th>
                    <th>Fantasy Points (PPR)</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player._id}>
                      <td>
                        <strong>#{index + 1}</strong>
                      </td>
                      <td>{player.playerName}</td>
                      <td>{player.team}</td>
                      <td>
                        <span className="badge bg-primary">{player.position}</span>
                      </td>
                      <td>{player.week || '-'}</td>
                      <td>
                        <strong className="text-success">
                          {player.fantasyPointsPPR?.toFixed(2) || 0}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No players found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PlayersPage;
