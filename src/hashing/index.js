import crypto from 'crypto';
const rawPassword = 'abc12345';


function hashWithSHA512(input) {
    const output = crypto
        .createHash('sha512')
        .update(input)
        .digest('hex');
    return output;
}

function hashWithRandomSalt(input) {
    const salt = crypto.randomBytes(16).toString('hex');
    const output = crypto.pbkdf2Sync(input,salt,1000,64,'sha512').toString('hex');
    return output;
}

console.log(hashWithRandomSalt(rawPassword));
console.log(hashWithRandomSalt(rawPassword));