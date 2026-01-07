import request from 'supertest';
import nock from 'nock';
import app from '../src/app';

describe('GET /api/v1/jokes/:id', () => {

    it('should return 2 when id is 2', async () => {
        const res = await request(app).get('/api/v1/jokes/2');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('result', 2);
    });



    it('should return a Chuck Norris joke when id is not 2 or 3', async () => {
        // Mock the external API call using nock
        const mockJoke = { value: 'Chuck Norris can divide by zero.' };
        nock('https://api.chucknorris.io')
            .get('/jokes/random')
            .reply(200, mockJoke);

        const res = await request(app).get('/api/v1/jokes/4');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('value', 'Chuck Norris can divide by zero.');
    });

  it('should handle errors when external API fails', async () => {
    // Mock the external API to return an error
    nock('https://api.chucknorris.io')
      .get('/jokes/random')
      .reply(500);

    const res = await request(app).get('/api/v1/jokes/4');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Error fetching joke from external API');
  });

})