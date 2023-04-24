import crypto from 'crypto';

const key = crypto.generateKeyPairSync(
    'rsa',
    {modulusLength: 2048},
);

const publicKey = key.publicKey;
const privateKey = key.privateKey;
const rawPassword = "abc12345";

// Encrypt data with PUBLIC KEY
const encryptedData = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    Buffer.from(rawPassword)
).toString('base64');

const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    Buffer.from(encryptedData,'base64')
).toString();

console.log(encryptedData);
console.log(decryptedData);

// Decrypt data with PRIVATE KEY

