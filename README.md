# azure cloud function http server

# WIP NOT TESTED YET

Call your http server stack code using an in memory http listener. No sockets needed.

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![build status](https://api.travis-ci.org/JamesKyburz/azure-cloud-function-http-server.svg)](https://travis-ci.org/JamesKyburz/azure-cloud-function-http-server)
[![downloads](https://img.shields.io/npm/dm/azure-cloud-function-http-server.svg)](https://npmjs.org/package/azure-cloud-function-http-server)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/azure-cloud-function-http-server.svg)](https://greenkeeper.io/)

## index.js

```javascript
require('http').createServer((req, res) => {
  if (req.url === '/hello') return res.end('world')
})
.listen(5000)
```

## proxy.js

```javascript
exports.http = require('azure-cloud-function-http-server')
require('./index.js')
```

## serverless.yml

TODO give example

# license

[Apache License, Version 2.0](LICENSE)
