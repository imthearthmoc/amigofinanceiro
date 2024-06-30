const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint para registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send('User registered!');
  });
});

// Endpoint para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  });
});

// Middleware para proteger rotas
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Endpoint para adicionar despesa
app.post('/expense', (req, res) => {
  const { subcategory_id, amount, date } = req.body;
  if (!subcategory_id || !amount || !date) {
    return res.status(400).send('Missing required fields');
  }
  db.run("INSERT INTO expenses (subcategory_id, amount, date) VALUES (?, ?, ?)", [subcategory_id, amount, date], function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send('Expense added!');
  });
});

// Endpoint para adicionar categoria
app.post('/category', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  db.run("INSERT INTO categories (name) VALUES (?)", [name], function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send('Category added!');
  });
});

// Endpoint para adicionar subcategoria
app.post('/subcategory', (req, res) => {
  const { name, category_id } = req.body;
  if (!name || !category_id) {
    return res.status(400).send('Name and category_id are required');
  }
  db.run("INSERT INTO subcategories (name, category_id) VALUES (?, ?)", [name, category_id], function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send('Subcategory added!');
  });
});

// Endpoint para buscar despesas
app.get('/expenses', (req, res) => {
  const query = `
    SELECT expenses.*, subcategories.name as subcategory_name, categories.name as category_name
    FROM expenses
    LEFT JOIN subcategories ON expenses.subcategory_id = subcategories.id
    LEFT JOIN categories ON subcategories.category_id = categories.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json(rows);
  });
});

// Endpoint para buscar categorias
app.get('/categories', (req, res) => {
  db.all("SELECT * FROM categories", [], (err, rows) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json(rows);
  });
});

// Endpoint para buscar subcategorias
app.get('/subcategories', (req, res) => {
  db.all("SELECT * FROM subcategories", [], (err, rows) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json(rows);
  });
});

// Endpoint para obter total de despesas
app.get('/totalExpenses', (req, res) => {
  db.get("SELECT SUM(amount) AS totalExpenses FROM expenses WHERE amount < 0", (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ totalExpenses: row.totalExpenses || 0 });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});