import createHttp from './https.js'
import createInmemory from './inmemory.js'
import createLevel from './level.js'
import createS3 from './s3.js'

export default Block => {
  const http = createHttp(Block)
  const inmem = createInmemory(Block)
  const level = createLevel(Block)
  const s3 = createS3(Block)
  const from = id => {
    if (typeof id === 'object') {
      if (id.leveldown) return level(id.leveldown)
      if (id.s3) return s3(id.s3)
    } else {
      if (id.startsWith('http://') || /* c8 ignore next */ id.startsWith('https://')) {
        return http(id)
      }
    }
    throw new Error(`Cannot resolve identifier "${id}"`)
  }
  const create = id => {
    if (id === 'inmem' || id === 'inmemory') {
      return inmem()
    } else if (typeof id === 'object') {
      if (id.leveldown) return level(id.leveldown)
      if (id.s3) return s3(id.s3)
    }
  }
  return { from, create }
}
