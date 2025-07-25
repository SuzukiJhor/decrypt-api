import express from 'express';
import dotenv from 'dotenv';
import { decode } from './decrypt.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const privateKey = process.env.CRYPTOGRAPHY_PRIVATE_RSA_KEY;

app.post('/decrypt', (req, res) => {
  const { hash1, hash3 } = req.body;

  if (!hash1 || !hash3)
    return res.status(400).json({ error: 'hash1 e hash3 são necessários' });

  const result = decode(hash1, hash3, privateKey);

  if (result.error) return res.status(500).json({ error: result.error });

  let decryptedObj;
  try {
    decryptedObj = JSON.parse(result.decrypted);
  } catch (e) {
    return res.status(500).json({ error: 'JSON descriptografado inválido' });
  }

  return res.json({ decrypted: decryptedObj });
});

app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
});
