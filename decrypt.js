import crypto from 'crypto';

const credentials = {
  encryption: 'aes-256-gcm',
  textEncoding: 'utf8',
  encryptEncoding: 'hex',
  encondingBase64: 'base64',
};

function fromHexToBase64(hexValue) {
  return Buffer.from(hexValue, 'hex').toString('base64');
}

function decryptRSA(rsaPrivateKey, encryptedValue) {
  const base64Value = fromHexToBase64(encryptedValue);
  const buffer = Buffer.from(base64Value, 'base64');

  return crypto.privateDecrypt(
    {
      key: rsaPrivateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer
  ).toString(credentials.textEncoding);
}

function getDecipher(key, iv) {
  return crypto.createDecipheriv(
    credentials.encryption,
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64')
  );
}

function decryptAES(encrypted, key, iv, tag) {
  const decipher = getDecipher(key, iv);
  decipher.setAuthTag(Buffer.from(tag, 'base64'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function decode(hash1, hash3, privateKey) {
  try {
    const decodedHash3 = decryptRSA(privateKey, hash3);
    const [key, iv, tag] = decodedHash3.split(':');
    const decrypted = decryptAES(hash1, key, iv, tag);
    return { decrypted };
  } catch (error) {
    return { error: error.message };
  }
}
