const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB, getDBStatus } = require('./config/db');
const requirementRoutes = require('./routes/requirementRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (with auto in-memory fallback)
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend development requests from localhost:3000 / Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'GoPratle Requirement Posting API',
    database: getDBStatus()
  });
});

// Mount Routes
app.use('/api/requirements', requirementRoutes);

// Catch-all 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` GoPratle Backend Server listening on port ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/requirements`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

module.exports = { app, server };
