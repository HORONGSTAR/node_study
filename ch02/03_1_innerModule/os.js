const os = require('os')

console.log('운영체제 정보-----------------------------------')
console.log('os.arch() : ', os.arch())
console.log('os.platform() : ', os.platform())
console.log('os.type() : ', os.type())
console.log('os.uptime() : ', os.uptime())
console.log('os.hostname() : ', os.hostname())
console.log('os.release() : ', os.release())

console.log('경로-------------------------------------------')
console.log(os.homedir()) //홈디렉토리 경로
console.log(os.tmpdir()) //임시파일 저장 경로

console.log('cup 정보---------------------------------------')
console.log(os.cpus()) //컴퓨터 cpu정보
console.log(os.cpus().length)

console.log('메모리 정보-------------------------------------')
console.log(os.freemem()) //사용가능한 RAM 메모리 용량을 보여줌
console.log(os.totalmem().length) //전체 RAM 메모리 용량
