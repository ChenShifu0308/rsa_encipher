import forge from 'node-forge';
import { promisify } from 'util';

const generateKeyPair = promisify(forge.pki.rsa.generateKeyPair);


async function getRandomPrivatePublicKey() {
    const { publicKey, privateKey } = await generateKeyPair({ bits: 2048, workers: 2 });
    let publicKeyPem = forge.pki.publicKeyToPem(publicKey)
    let privateKeyPem = forge.pki.privateKeyToPem(privateKey)
    return { publicKeyPem, privateKeyPem }
}

function encryptFromPublicKey(message: string, publicKey: string) {
    var pki = forge.pki;
    var rsaPublicKey = pki.publicKeyFromPem(publicKey);
    console.log(`rsaPublicKey e:
    ${rsaPublicKey.e}; rsaPublicKey n:${rsaPublicKey.n};`)
    let msgInBytes = forge.util.encodeUtf8(message)
    let encryptedBytes = rsaPublicKey.encrypt(msgInBytes)
    return forge.util.encode64(encryptedBytes);
}

function decryptFromPrivateKey(encryptedMessage: string, privateKey: string):string {
    const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey)
    const messageDecoded = forge.util.decode64(encryptedMessage)
    let msgInBytes = rsaPrivateKey.decrypt(messageDecoded)
    return forge.util.decodeUtf8(msgInBytes)
}

function publicKeyFromPrivateKey(privateKey: string): string {
    let rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey)
    let publicKey = forge.pki.setRsaPublicKey(rsaPrivateKey.n, rsaPrivateKey.e)
    return forge.pki.publicKeyToPem(publicKey)
}

export { getRandomPrivatePublicKey, encryptFromPublicKey, decryptFromPrivateKey, publicKeyFromPrivateKey };
