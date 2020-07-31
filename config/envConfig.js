const env = process.env.NODE_ENV || 'development';

module.exports = {
  path: `${__dirname}/.env.${env}`,
};
