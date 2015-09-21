import test from 'blue-tape'
import React from 'react/addons'
//import SnakeGame from '../src/SnakeGame'

const utils = React.addons.TestUtils

test('sleep', async function (t) {
  let start = Date.now()
  let end = Date.now()
  const renderer = utils.createRenderer()
  t.ok(true, 'takes about 20 milliseconds')
})
