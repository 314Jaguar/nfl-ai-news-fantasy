import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Form } from 'react-bootstrap';

function FantasyPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scoring, setScoring] = useState('ppr');
  const [week, setWeek] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [scoring, week]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let url = '/api/fantasy/leaderboard?limit=100';
      url += `&ppr=${scoring === 'ppr'}`;
      if (week) url += `&week=${week}`;

      const response = await axios.get(url);
      setLeaderboard(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load fantasy leaderboard');
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

  const pointsField = scoring === 'ppr' ? 'fantasyPointsPPR' : 'fantasyPoints';

  return (
    <Container className="py-4">
      <h1 className="mb-4">Fantasy Leaderboard</h1>

      {error && <div className="error-message">{error}</div>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Scoring Format</Form.Label>
            <Form.Select value={scoring} onChange={(e) => setScoring(e.target.value)}>
              <option value="ppr">PPR (Points Per Reception)</option>
              <option value="standard">Standard</option>
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
          {leaderboard.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Week</th>
                    <th>{scoring === 'ppr' ? 'Fantasy Points (PPR)' : 'Fantasy Points'}</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr key={player._id} className={index < 3 ? 'table-success' : ''}>
                      <td>
                        <strong className="fs-5">#{index + 1}</strong>
                      </td>
                      <td className="fw-bold">{player.playerName}</td>
                      <td>{player.team}</td>
                      <td>
                        <span className="badge bg-primary">{player.position}</span>
                      </td>
                      <td>{player.week || '-'}</td>
                      <td>
                        <strong className="text-success fs-5">
                          {player[pointsField]?.toFixed(2) || 0}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No fantasy data available</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FantasyPage;
