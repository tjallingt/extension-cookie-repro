const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');

const app = express();
const server = http.createServer(app);

app.use(
  session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  }),
);
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const time = new Date().getTime();
  console.log('page load!', time, req.session.timestamp);

  if (!req.session.timestamp) {
    req.session.timestamp = time;
  }

  res.render('index', { timestamp: req.session.timestamp });
});

server.listen(3000, () => console.log('server started'));
