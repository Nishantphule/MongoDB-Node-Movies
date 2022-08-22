const os = require('os');

console.log('Free memory', os.freemem() / 1024 / 1024 / 1024 )

console.log('Total memory', os.totalmem() / (1024**3) )

console.log('version', os.version())

// console.log('Processor', os.gpu())
