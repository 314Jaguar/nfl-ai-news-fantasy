import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load teams');
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
      <h1 className="mb-4">NFL Teams</h1>

      {error && <div className="error-message">{error}</div>}

      <Row>
        {teams.length > 0 ? (
          teams.map((team) => (
            <Col md={6} lg={4} key={team._id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{team.teamName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {team.abbreviation} - {team.division}
                  </Card.Subtitle>
                  <div className="team-record">
                    <strong>Record:</strong> {team.wins}W - {team.losses}L
                    {team.ties > 0 && ` - ${team.ties}T`}
                  </div>
                  <div className="team-stats mt-3">
                    <small>
                      <div>
                        <strong>Points For:</strong> {team.pointsFor || '-'}
                      </div>
                      <div>
                        <strong>Points Against:</strong> {team.pointsAgainst || '-'}
                      </div>
                      <div>
                        <strong>Coach:</strong> {team.coach || '-'}
                      </div>
                      <div>
                        <strong>Stadium:</strong> {team.stadium || '-'}
                      </div>
                    </small>
                  </div>

                  {team.injuryReport && team.injuryReport.length > 0 && (
                    <div className="mt-3 pt-3 border-top">
                      <strong className="text-danger">Injury Report:</strong>
                      {team.injuryReport.map((injury, idx) => (
                        <div key={idx} className="small mt-2">
                          <div>{injury.playerName}</div>
                          <span className="badge bg-warning">{injury.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No teams found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default TeamsPage;
