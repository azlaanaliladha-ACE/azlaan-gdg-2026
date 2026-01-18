const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');  // ← ADDED THIS

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], 
    function(err) {
      if (err) return res.status(400).json({ error: 'User exists' });
      res.json({ message: 'User created' });
    });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'Backend ready!' }));
app.get('/api/users', (req, res) => res.json({ users: ['user1', 'user2'] }));  // ← Added for testing

// 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/build', 'index.html'));
  });
}

// Render uses PORT env var, fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
'));
