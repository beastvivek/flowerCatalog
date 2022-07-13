const { app } = require('../src/app');
const request = require('supertest');
const fs = require('fs');

const config = {
  commentsFile: './test/data/comments.json',
  logger: (x) => x,
};

describe('GET /', () => {
  it('Should give status 200 for GET /', (done) => {
    const sessions = {};
    const users = {};
    request(app(config, sessions, users))
      .get('/')
      .expect('content-type', 'text/html')
      .expect('content-length', '1075')
      .expect(/<h3 class="main-heading">Flower Catalog<\/h3>/)
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
      .expect(/<h3 class="main-heading">Flower Catalog<\/h3>/)
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
      .expect(/<h3> <a href="index.html">&lt;&lt;<\/a> Abeliophyllum<\/h3>/)
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
      .expect(/<h3> <a href="index.html">&lt;&lt;<\/a> Ageratum<\/h3>/)
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
  before(() => {
    fs.readFileSync(config.commentsFile, 'utf-8');
  });

  after(() => {
    fs.writeFileSync(config.commentsFile, '[]', 'utf-8');
  });

  it('Should give status 200 for POST /guestbook', (done) => {
    const sessions = { '101': { username: 'john', sessionId: '101' } };
    request(app(config, sessions))
      .post('/guestbook')
      .set('Cookie', 'id=101')
      .send('comment=hello')
      .expect(200, done)
  });
});

describe('GET /login', () => {
  it('Should give status 200 for GET /login', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/login')
      .expect('content-type', 'text/html')
      .expect('content-length', '821')
      .expect(/<input type="submit" value="Login">/)
      .expect(200, done)
  });

  it('Should give status 200 for GET /login with query params', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/login?message=SignUp+Successful')
      .expect('content-type', 'text/html')
      .expect('content-length', '838')
      .expect(/<div class="message green">SignUp Successful<\/div>/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('Should give status 401 for POST /login', (done) => {
    const sessions = {};
    const users = { vivek: { username: 'vivek', password: 'vivek' } };
    request(app(config, sessions, users))
      .post('/login')
      .send('username=vivek&password=viv')
      .expect('content-type', 'text/html')
      .expect('content-length', '856')
      .expect(/<div class="message ">Please enter valid username and password<\/div>/)
      .expect(401, done)
  });

  it('Should give status 302 for POST /login', (done) => {
    const sessions = {};
    const users = { vivek: { username: 'vivek', password: 'vivek' } };
    request(app(config, sessions, users))
      .post('/login')
      .send('username=vivek&password=vivek')
      .expect('location', '/guestbook')
      .expect('set-cookie', /id=[0-9]*/)
      .expect(302, done)
  });
});

describe('GET /signup', () => {
  it('Should give status of 200 for GET /signup', (done) => {
    const sessions = {};
    const users = {};
    request(app(config, sessions, users))
      .get('/signup')
      .expect('content-type', 'text/html')
      .expect('content-length', '695')
      .expect(/<h2>Sign Up<\/h2>/)
      .expect(200, done)
  });
});

describe('POST /signup', () => {
  it('Should give status of 302 for POST /signup', (done) => {
    const sessions = {};
    const users = {};
    request(app(config, sessions, users))
      .post('/signup')
      .send('username=vivek&password=vivek')
      .expect('location', '/login?message=SignUp+Successful')
      .expect(302, done)
  });
});

describe('GET /api/guestbook', () => {
  const comment = { name: 'vivek', comment: 'hello' };

  before(() => {
    fs.writeFileSync(config.commentsFile, JSON.stringify([comment]), 'utf-8');
  });

  after(() => {
    fs.writeFileSync(config.commentsFile, '[]', 'utf-8');
  });

  it('Should give status of 200 for GET /api/guestbook', (done) => {
    const sessions = {};
    const users = {};
    request(app(config, sessions, users))
      .get('/api/guestbook')
      .expect('content-type', 'text/plain')
      .expect('content-length', '36')
      .expect('[{"name":"vivek","comment":"hello"}]')
      .expect(200, done)
  });
});

describe('GET /logout', () => {
  it('Should give status of 302 for GET /logout', (done) => {
    const sessions = { '101': { username: 'john', sessionId: '101' } };
    const users = {};
    request(app(config, sessions, users))
      .get('/logout')
      .set('Cookie', 'id=101')
      .expect('location', '/')
      .expect(302, done)
  });
});
