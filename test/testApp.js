const { app } = require('../src/app');
const request = require('supertest');

describe('appTest', () => {
  it('Should give status 200 for GET /', (done) => {
    request(app({ commentsFile: './test/data/comments.json' }))
      .get('/')
      .expect('content-type', 'text/html')
      .expect('content-length', '1075')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });

  it('Should give status 200 for GET /index.html', (done) => {
    request(app({ commentsFile: './test/data/comments.json' }))
      .get('/index.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1075')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });

  it('Should give status 200 for GET /abeliophyllum.html', (done) => {
    request(app({ commentsFile: './test/data/comments.json' }))
      .get('/abeliophyllum.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1419')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });

  it('Should give status 200 for GET /ageratum.html', (done) => {
    request(app({ commentsFile: './test/data/comments.json' }))
      .get('/ageratum.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1149')
      .expect(/Ageratum/)
      .expect(200, done)
  });

  it('Should give status 302 for GET /guestbook', (done) => {
    request(app({ commentsFile: './test/data/comments.json' }))
      .get('/guestbook')
      .expect('location', '/login')
      .expect(302, done)
  });

  it('Should give status 200 for get /guestbook', (done) => {
    request(app(
      {
        commentsFile: './test/data/comments.json',
        sessions: { '101': { username: 'john', sessionId: '101' } }
      }
    ))
      .get('/guestbook')
      .set('Cookie', 'id=101')
      .expect(200, done)
  });
});
