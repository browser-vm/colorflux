const express = require('express');
const app = express();
const imageRoutes = require('./routes/imageRoutes');

// Middleware and configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', imageRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;