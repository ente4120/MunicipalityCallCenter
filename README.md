# Call Center Management System

A modern call center management system built with Next.js, featuring real-time call tracking, task management, and tag-based organization.

## Features

- 📞 Real-time call tracking and management
- 🏷️ Tag-based call organization
- ✅ Task management for each call
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time updates
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: React Hooks
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
MONGODB_URI=your_mongodb_uri
API_URL=http://localhost:3001/api
SERVER_PORT=3001
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Run the production:
```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
call-center/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── components/   # React components
│   │   ├── types/       # TypeScript types
│   │   └── services/    # API services
│   └── server/          # Backend server
│       ├── models/      # MongoDB models
│       └── services/    # Business logic
├── public/              # Static files
└── package.json
```

## API Endpoints

- `GET /api/calls` - Get all calls
- `GET /api/calls/:id` - Get a specific call
- `POST /api/calls` - Create a new call
- `PUT /api/calls/:id` - Update a call
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create a new tag
- `PUT /api/tags/:id` - Update a tag

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
