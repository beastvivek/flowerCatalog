const { app } = require('./src/app.js');
const { httpServer } = require('httpserver');

const config = {
  commentsFile: './data/comments.json',
  sessions: {},
  users: {
    vivek: { username: 'vivek', password: 'ek' },
    gayatri: { username: 'gayatri', password: 'three' },
  },
};

httpServer(8800, app(config));
