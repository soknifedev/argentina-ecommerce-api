const request = require('request');
const util = require('util');

function promise(options, static_options)
{
  const srequest = util.promisify(request);
  return srequest(options);
}

module.exports = {
    promise: promise,
    callback: request
};