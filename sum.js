const sum = (x,y) => x+y

const[,,x,y] = process.argv

console.log(sum(+x,+y))
