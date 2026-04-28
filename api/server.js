const express = require('express');

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());

const {logger} = require('./middleware/middleware');
server.use(logger);

const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);


// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
