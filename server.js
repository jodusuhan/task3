const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = books.find(b => b.id === parseInt(id));

  if (!book) return res.status(404).json({ error: 'Book not found.' });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(b => b.id === parseInt(id));
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found.' });

  const removedBook = books.splice(bookIndex, 1);
  res.json(removedBook[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
