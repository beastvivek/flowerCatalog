const { app } = require('../src/app');
const request = require('supertest');

const config = {
  commentsFile: './test/data/comments.json',
  logger: (x) => x
};

describe('GET /', () => {
  it('Should give status 200 for GET /', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/')
      .expect('content-type', 'text/html')
      .expect('content-length', '1075')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });
});

describe('GET /index.html', () => {
  it('Should give status 200 for GET /index.html', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/index.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1075')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });
});

describe('GET /abeliophyllum.html', () => {
  it('Should give status 200 for GET /abeliophyllum.html', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/abeliophyllum.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1419')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });
});

describe('GET /ageratum.html', () => {
  it('Should give status 200 for GET /ageratum.html', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/ageratum.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1149')
      .expect(/Ageratum/)
      .expect(200, done)
  });
});

describe('GET /guestbook', () => {
  const sessions = {};
  it('Should give status 302 for GET /guestbook', (done) => {
    request(app(config, sessions))
      .get('/guestbook')
      .expect('location', '/login')
      .expect(302, done)
  });

  it('Should give status 200 for GET /guestbook', (done) => {
    const sessions = { '101': { username: 'john', sessionId: '101' } };
    request(app(config, sessions))
      .get('/guestbook')
      .set('Cookie', 'id=101')
      .expect(200, done)
  });
});

describe('POST /guestbook', () => {
  it('Should give status 200 for POST /guestbook', (done) => {
    const sessions = { '101': { username: 'john', sessionId: '101' } };
    request(app(config, sessions))
      .post('/guestbook')
      .set('Cookie', 'id=101')
      .send('comment=hello')
      .expect(200, done)
  });
});
