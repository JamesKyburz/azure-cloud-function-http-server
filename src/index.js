'use strict'

const Stream = require('stream')
const queryString = require('querystring')

module.exports = context => {
  const response = {
    body: Buffer.from(''),
    status: 200,
    isRaw: true,
    headers: {}
  }

  const req = new Stream.Readable()
  req._read = f => f
  req.url = context.req.originalUrl

  if (context.req.query) {
    req.url += '?' + queryString.stringify(context.req.query)
  }
  req.method = context.req.method
  req.rawHeaders = []
  req.headers = {}

  const headers = context.req.headers || {}

  for (const key of Object.keys(headers || {})) {
    for (const value of headers[key]) {
      req.rawHeaders.push(key)
      req.rawHeaders.push(value)
    }
    req.headers[key.toLowerCase()] = headers[key].toString()
  }

  req.getHeader = name => {
    return req.headers[name.toLowerCase()]
  }
  req.getHeaders = () => {
    return req.headers
  }

  req.connection = {}

  const res = new Stream()
  Object.defineProperty(res, 'statusCode', {
    get () {
      return response.status
    },
    set (statusCode) {
      response.status = statusCode
    }
  })
  res.headers = {}
  res.writeHead = (status, headers) => {
    res.headersSent = true
    response.status = status
    if (headers) res.headers = Object.assign(res.headers, headers)
  }
  res.write = chunk => {
    res.headersSent = true
    response.body = Buffer.concat([
      response.body,
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    ])
  }
  res.setHeader = (name, value) => {
    res.headers[name] = value
  }
  res.removeHeader = name => {
    delete res.headers[name]
  }
  res.getHeader = name => {
    return res.headers[name.toLowerCase()]
  }
  res.getHeaders = () => {
    return res.headers
  }
  res.end = text => {
    if (text) res.write(text)
    response.body = Buffer.from(response.body).toString()
    response.headers = res.headers || {}
    res.writeHead(response.status)
    context.done(null, response)
  }
  if (context.req.rawBody) {
    req.push(context.req.rawBody)
    req.push(null)
  }

  return { req, res }
}
