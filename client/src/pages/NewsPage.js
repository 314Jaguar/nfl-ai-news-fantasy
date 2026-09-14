import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Form } from 'react-bootstrap';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [team, setTeam] = useState('');
  const [player, setPlayer] = useState('');

  useEffect(() => {
    fetchNews();
  }, [page, team, player]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      let url = `/api/news?page=${page}&limit=10`;
      if (team) url += `&team=${team}`;
      if (player) url += `&player=${player}`;

      const response = await axios.get(url);
      setNews(response.data.news || []);
      setError(null);
    } catch (err) {
      setError('Failed to load news');
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
      <h1 className="mb-4">NFL News</h1>

      {error && <div className="error-message">{error}</div>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Team</Form.Label>
            <Form.Control
              type="text"
              placeholder="Team name"
              value={team}
              onChange={(e) => {
                setTeam(e.target.value);
                setPage(1);
              }}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Player</Form.Label>
            <Form.Control
              type="text"
              placeholder="Player name"
              value={player}
              onChange={(e) => {
                setPlayer(e.target.value);
                setPage(1);
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {news.length > 0 ? (
            <div className="news-list">
              {news.map((article) => (
                <Card key={article._id} className="news-card mb-3">
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>
                      <strong>AI Summary:</strong> {article.aiSummary || article.content}
                    </Card.Text>
                    <div className="news-meta">
                      {article.source && <span className="badge bg-info">{article.source}</span>}
                      {article.aiGenerated && <span className="badge bg-success ms-2">AI Generated</span>}
                      {article.sentiment && <span className={`badge bg-${article.sentiment}`}>{article.sentiment}</span>}
                    </div>
                    {article.relatedTeams && article.relatedTeams.length > 0 && (
                      <div className="mt-2">
                        <small>
                          <strong>Teams:</strong> {article.relatedTeams.join(', ')}
                        </small>
                      </div>
                    )}
                    {article.relatedPlayers && article.relatedPlayers.length > 0 && (
                      <div className="mt-2">
                        <small>
                          <strong>Players:</strong> {article.relatedPlayers.join(', ')}
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No news found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsPage;
