const dns = require('node:dns')

const HOST = 'llama.trungnghia.space'
const ADDRESS = '127.0.0.1'

const originalLookup = dns.lookup
dns.lookup = function lookup(hostname, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (hostname === HOST) {
    if (options && options.all) {
      callback(null, [{ address: ADDRESS, family: 4 }])
    } else {
      callback(null, ADDRESS, 4)
    }
    return
  }
  return originalLookup.call(dns, hostname, options, callback)
}

const originalPromiseLookup = dns.promises.lookup.bind(dns.promises)
dns.promises.lookup = function promiseLookup(hostname, options) {
  if (hostname === HOST) {
    if (options && options.all) {
      return Promise.resolve([{ address: ADDRESS, family: 4 }])
    }
    return Promise.resolve({ address: ADDRESS, family: 4 })
  }
  return originalPromiseLookup(hostname, options)
}
