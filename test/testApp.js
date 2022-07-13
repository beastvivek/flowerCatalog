const { app } = require('../src/app');
const request = require('supertest');

describe('appTest', () => {
  it('Should give status 200 for GET /', (done) => {
    request(app)
      .get('/')
      .expect('content-type', 'text/html')
      .expect('content-length', '1075')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });

  it('Should give status 200 for GET /abeliophyllum.html', (done) => {
    request(app)
      .get('/abeliophyllum.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1419')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });

  it('Should give status 200 for GET /ageratum.html', (done) => {
    request(app)
      .get('/ageratum.html')
      .expect('content-type', 'text/html')
      .expect('content-length', '1149')
      .expect(/Ageratum/)
      .expect(200, done)
  });
});
