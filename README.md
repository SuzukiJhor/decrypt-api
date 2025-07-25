# decrypt-api

API simples para descriptografia de dados criptografados utilizando AES-256-GCM e RSA.  
Recebe hashes criptografados via POST, realiza a descriptografia utilizando uma chave privada RSA e retorna o conteúdo original em formato JSON.

## Objetivo

Facilitar a integração de sistemas que precisam descriptografar dados sensíveis de forma segura e automatizada, sem expor chaves privadas no frontend.

## Como usar

1. Instale as dependências:
   ```bash
   npm install

CRYPTOGRAPHY_PRIVATE_RSA_KEY='sua-chave-privada-aqui'

2. Instale as dependências:
   ```bash
   npm start

3. Exemplo de payload
   ```bash

    {
     "hash1": "valor_do_hash1",
     "hash3": "valor_do_hash3"
   }


