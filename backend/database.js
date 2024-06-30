const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
  db.run("CREATE TABLE subcategories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category_id INTEGER, FOREIGN KEY(category_id) REFERENCES categories(id))");
  db.run("CREATE TABLE expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, subcategory_id INTEGER, amount REAL, date TEXT, FOREIGN KEY(subcategory_id) REFERENCES subcategories(id))");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");
});


module.exports = db;