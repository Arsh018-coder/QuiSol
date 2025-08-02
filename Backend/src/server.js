require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 QuiSol Backend Server running on port ${PORT}`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
});
