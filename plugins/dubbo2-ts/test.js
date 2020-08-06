const { DirectlyDubbo } = require('./lib/index')
console.log("1111111~~")


const registerAddress = '192.168.150.42:30173'; //开发

const dubbo = DirectlyDubbo.from({
    dubboAddress: registerAddress,
    dubboVersion: '3.0.0',
    dubboInvokeTimeout: 60
})