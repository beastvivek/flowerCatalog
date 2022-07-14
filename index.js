const { createApp } = require('./src/app.js');

const config = {
  commentsFile: './data/comments.json',
  logger: console.log,
};

const userSessions = {};
const users = {
  vivek: { username: 'vivek', password: 'ek' },
  gayatri: { username: 'gayatri', password: 'three' },
};

const app = createApp(config, userSessions, users);

app.listen(8800);
