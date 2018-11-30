const { test } = require('tap')
const create = require('..')

test('statusCode writeHead 404', t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.equals(404, result.status)
      t.end()
    }
  })
  res.writeHead(404)
  res.end()
})

test('statusCode statusCode=200', t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.equals(200, result.status)
      t.end()
    }
  })
  res.statusCode = 200
  res.end()
})

test('writeHead headers', t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.deepEquals(
        {
          'x-custom-1': '1',
          'x-custom-2': '2'
        },
        result.headers
      )
      t.end()
    }
  })
  res.writeHead(200, {
    'x-custom-1': '1',
    'x-custom-2': '2'
  })
  res.end()
})

test('setHeader', t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.deepEquals(
        {
          'x-custom-1': '1',
          'x-custom-2': '2'
        },
        result.headers
      )
      t.end()
    }
  })
  res.setHeader('x-custom-1', '1')
  res.setHeader('x-custom-2', '2')
  res.end()
})

test('multi header support', t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.deepEquals(
        {
          'x-custom-1': ['1', '1']
        },
        result.headers
      )
      t.end()
    }
  })
  res.setHeader('x-custom-1', ['1', '1'])
  res.end()
})

test('setHeader + removeHeader', t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.deepEquals(
        {
          'x-custom-2': '2'
        },
        result.headers
      )
      t.end()
    }
  })
  res.setHeader('x-custom-1', '1')
  res.setHeader('x-custom-2', '2')
  res.removeHeader('x-custom-1')
  res.end()
})

test('getHeader/s', t => {
  const { res } = create({ req: {} })
  res.setHeader('x-custom-1', '1')
  res.setHeader('x-custom-2', '2')
  t.equals('1', res.getHeader('x-custom-1'))
  t.deepEquals(
    {
      'x-custom-1': '1',
      'x-custom-2': '2'
    },
    res.getHeaders()
  )
  t.end()
})

test(`res.write('ok')`, t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.equals(true, result.isRaw)
      t.equals('ok', result.body)
      t.end()
    }
  })
  res.write('ok')
  res.end()
})

test(`res.end('ok')`, t => {
  const { res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.equals('ok', result.body)
      t.end()
    }
  })
  res.end('ok')
})

test('req.pipe(res)', t => {
  const { req, res } = create({
    req: {},
    done (err, result) {
      t.error(err)
      t.equals('ok', result.body)
      t.end()
    }
  })
  req.pipe(res)
  req.push('ok')
  req.push(null)
})
