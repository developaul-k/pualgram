import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import fileUpload from 'express-fileupload';
import sharp from 'sharp';
import { uploadMiddleware, uploadController } from '../upload';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
/* server.express.use(fileUpload()); */
server.express.post('/api/upload', uploadMiddleware, uploadController);

//Upload Endpoint
/* server.express.post('/upload', (req, res) => {
  if (req.files === null || req.files === undefined)
    return res.status(400).json({ msg: 'No file uploaded' });

  const file = req.files.file;
  const {
    query: { width, height }
  } = req;

  file.mv(`${__dirname}/media/${file.name}`, async err => {
    if (err) return res.status(500).send(err);

    var newFileName = `${new Date().getTime()}__${file.name}`;

    // Image resize
    await sharp(`${__dirname}/media/${file.name}`)
      .resize(Number(width), Number(height))
      .toFile(`${__dirname}/media/${newFileName}`)
      .then(info => {
        // Send image to response
        res.json({ fileName: file.name, filePath: `/media/${newFileName}` });
      })
      .catch(err => console.log(err));
  });
}); */

//Get on uploaded image
server.express.get('/media/:filename', (req, res, next) => {
  var options = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
  res.sendFile(`${__dirname}/media/${req.params.filename}`, options, err => {
    if (err) {
      next(err);
    }
  });
});

server.start(
  {
    port: PORT
  },
  ({ port }) => console.log(`Server running on port ${port}`)
);
