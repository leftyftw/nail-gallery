const fastify = require('fastify')({
  ignoreTrailingSlash: true,
  logger: true
});
const path = require('path');
const imageThumbnail = require('image-thumbnail');
const lister = require('./files/lister');
const zipper = require('./files/zipper');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'nails'),
  prefix: '/nails', // optional: default '/'
  prefixAvoidTrailingSlash: true,
  list: {
    format: 'json',
    names: ['index', 'index.json', '/']
  }
});

fastify.get('/', async (request, reply) => {
  return reply.redirect('/nails/');
});

fastify.get('/nails/thumbnail/*', async (request, reply) => {
  const options = { width: 240, height: 240 };
  const fpath = path.join(__dirname, 'nails', decodeURI(request.url).substring('/nails/thumbnail'.length));
  thumb = await imageThumbnail(fpath, options);
  reply.send(thumb); 
});

// Declare a route
fastify.get('/nails/collections', async (request, reply) => {
  return lister.siteInfo();
})

fastify.get('/nails/collections/pack/:sitename', async (request, reply) => {

  const dir = request.params.sitename;
  if (dir.indexOf('/') !== -1) {
    reply.code(400).send('nice try');
    return;
  }

  const fileInfo = zipper.createZipFile(`nails/collections/${dir}`);

  console.log(`DOWNLOAD: ${fileInfo.fileName}, {root: ${fileInfo.path}}`)

  return reply.download(fileInfo.fileName, {root: fileInfo.path});
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({port: 3000})
    fastify.log.info(`Server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
