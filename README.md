# NFL AI News & Fantasy Tracker

An AI-powered website for auto-generating NFL news, fantasy scores, and game tracking.

## Features

- **AI-Generated News**: Automatic summaries and analysis of NFL news using OpenAI
- **Live Game Tracking**: Real-time score updates and game status
- **Player Fantasy Stats**: Detailed fantasy scoring (PPR and standard)
- **Team Information**: Complete team rosters, schedules, and injury reports
- **Game Recaps**: AI-generated game summaries with key plays
- **Fantasy Leaderboards**: Top performers by position and week
- **Player Analysis**: AI-powered performance insights

## Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB
- **AI**: OpenAI API (GPT-3.5-turbo)
- **NFL Data**: NFL Data API

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS / Bootstrap
- **State Management**: Redux or Context API
- **HTTP Client**: Axios

## Installation

### Prerequisites
- Node.js 16.x or higher
- MongoDB
- OpenAI API Key
- NFL API Key

### Setup

1. Clone the repository
```bash
git clone https://github.com/314Jaguar/nfl-ai-news-fantasy.git
cd nfl-ai-news-fantasy
```

2. Create `.env` file
```bash
cp .env.example .env
```

3. Add your API keys to `.env`:
```
OPENAI_API_KEY=your_openai_key
NFL_API_KEY=your_nfl_key
MONGODB_URI=your_mongodb_uri
PORT=5000
```

4. Install dependencies
```bash
npm install
cd client && npm install
cd ..
```

5. Start the server
```bash
npm run dev
```

6. Start the client (in another terminal)
```bash
npm run client
```

## API Endpoints

### News
- `GET /api/news` - Get all news with pagination
- `GET /api/news/:id` - Get specific news article
- `POST /api/news` - Create news with AI summary

### Games
- `GET /api/games` - Get all games (filter by week, season, status)
- `GET /api/games/:id` - Get specific game
- `POST /api/games` - Create game
- `PATCH /api/games/:id` - Update game score and status

### Players
- `GET /api/players/:playerId` - Get player stats
- `GET /api/players/top/performers` - Get top performers
- `POST /api/players` - Create/update player stats

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:teamId` - Get specific team
- `POST /api/teams` - Create team
- `PATCH /api/teams/:teamId` - Update team record

### Scores
- `GET /api/scores/live` - Get live game scores
- `GET /api/scores/week/:week` - Get scores for specific week
- `GET /api/scores/team/:team` - Get scores for specific team

### Fantasy
- `GET /api/fantasy/leaderboard` - Get fantasy leaderboard
- `POST /api/fantasy/calculate` - Calculate fantasy points

## Future Enhancements

- [ ] User authentication and favorite teams
- [ ] Custom fantasy league creation
- [ ] Real-time WebSocket updates
- [ ] Mobile app
- [ ] Advanced analytics and projections
- [ ] Push notifications for games and news
- [ ] Social features (comments, discussions)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
