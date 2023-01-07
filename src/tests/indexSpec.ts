import app from '../index';
import supertest from 'supertest';
import imageResize from '../routes/imagesRoute';
import path from 'path';

const request = supertest(app);

describe('Testing the app endpoints:', () => {
  it('Gets api/images endpoint', async () => {
    const respones = await request.get('/api/images');
    expect(respones.status).toBe(200);
  });
});

describe('Testing the image resizing and image endpoints:', () => {
  const fileName = 'encenadaport' as string;
  const imgLocation:any = path.resolve(`/images/${fileName}.jpg`);
  const width:any  = '1000';
  const height:any  = '500';
  it('should not throw an error', () => {
    return expect(imageResize(imgLocation, width, height)).not.toThrowError;
  });

  it('Gets api/images resizing endpoint', async () => {
    const respones = await request.get(
      '/api/images?filename=fjord&width=1000&height=500'
    );
    expect(respones.status).toBe(200);
  });
});

describe('Tests for index GET / route', () => {
    it('Expects GET / to be 200 OK ', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });

    it('Expects GET / to have a "Hello!" body', async () => {
      const response = await request.get('/api');
      expect(response.text).toEqual('Hello server');
    });
  });

  describe('Tests for error endpoints', () => {
    it('Expects /error-url to be 404', async () => {
      const response = await request.get('/error-url');
      expect(response.status).toBe(404);
    });
  });

