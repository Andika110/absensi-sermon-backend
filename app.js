require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
// BENAR (app.js dan folder routes sama‑sama di dalam backend)
const attendanceRoutes = require('./routes/attendance');
const sermonRoutes = require('./routes/sermon');
const sintuaRoutes = require('./routes/sintua');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Gunakan routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/sermon', sermonRoutes);
app.use('/api/sintua', sintuaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const db = require('./models');
db.sequelize.sync().then(() => {
  console.log('Database synced');
});
