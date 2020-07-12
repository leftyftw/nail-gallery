const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    logger: true
  });
const path = require('path');
const lister = require('./files/lister');
const zipper = require('./files/zipper');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'nails'),
  prefix: '/nails/', // optional: default '/'
});

fastify.get('/', async (request, reply) => {
    return reply.redirect('/nails/');
})

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

    return reply.sendFile(fileInfo.fileName, fileInfo.path);
});

// Run the server!
const start = async () => {
    try {
      await fastify.listen(3000, '0.0.0.0')
      fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
