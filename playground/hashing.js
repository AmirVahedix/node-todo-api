const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let password = "abc123@#$"

bcrypt.genSalt(16, (err, salt) =>{
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash)
    })
})

let hashed_password_1 = "$2a$16$P8WPv74nzcz7Rln0gwzboe2uUkVtuoA967AT2gYGlUaU2Ag72wmXu"
let hashed_password_2 = "$2a$16$WHfL5I9dQT5DDByweBEX3.tMwm.8eqoBhvBHnDlvDKA.qb60TSXWm"

bcrypt.compare(password, hashed_password_1, (err, res) => {
    console.log(res)
})

bcrypt.compare(password, hashed_password_2, (err, res) => {
    console.log(res)
})

// let data = {
//     id : 3
// }

// //sign 
// let token = jwt.sign(data, 'amir123')
// console.log(token);

// //decode
// let decode = jwt.decode(token, 'amirss123')
// console.log(decode);


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
