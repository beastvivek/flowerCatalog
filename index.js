const { app } = require('./src/app.js');
const { httpServer } = require('httpserver');
const fs = require('fs');

const config = {
  commentsFile: './data/comments.json',
  logger: console.log,
};

const sessions = {};
const users = {
  vivek: { username: 'vivek', password: 'ek' },
  gayatri: { username: 'gayatri', password: 'three' },
};

httpServer(8800, app(config, sessions, users));
