const crypto = require("crypto-js");

async function encryption (next)  {
    try {
        const encryptedPassword = await crypto.AES.encrypt(this.password, 'password key 123').toString()
        this.password = encryptedPassword;
        next();
    } catch(err) {
        next(err)
    }
    
}


module.exports = encryption;