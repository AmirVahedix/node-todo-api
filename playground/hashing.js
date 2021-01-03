const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

let data = {
    id : 3
}

//sign 
let token = jwt.sign(data, 'amir123')
console.log(token);

//decode
let decode = jwt.decode(token, 'amirss123')
console.log(decode);


// let msg = "I am user number 3"
// let hashed_msg = SHA256(msg).toString()


// let data = {
//     id: 3
// }

// let token = {
//     data, 
//     hash: SHA256(JSON.stringify(data) + "secret").toString()
// }
 
// let resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString()

// if (resultHash === token.hash) {
//     console.log("data not changed");
// }else{
//     console.log("data is changed dont trust it.");
// }
