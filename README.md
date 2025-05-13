
# 💱 Conversor de Criptomoedas

[![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Sistema completo de conversão de criptomoedas. O projeto permite:

- Conversão de diferentes criptos
- Marcar moedas favoritas
- Visualizar histórico de conversões

O sistema utiliza um **frontend moderno** e um **backend robusto**, com cache Redis, PostgreSQL e arquitetura hexagonal.

---

## 🚀 Tecnologias Utilizadas

### Frontend
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Arquitetura%20Hexagonal-gray?style=for-the-badge" />
</p>

### ☁️ Deploy na AWS

- O sistema está hospedado em uma instância EC2 da AWS com Docker, utilizando **proxy reverso via Nginx** para servir o frontend na porta padrão (80).
- Acesse a aplicação online em:  
- **http://desafiocriptomoedas.duckdns.org**

---

## ⚙️ Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [Node.js](https://nodejs.org/) para rodar localmente sem Docker

---

## ▶️ Executando com Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/Renan1Pollo/desafio-conversor-criptomoedas.git
cd desafio-conversor-criptomoedas
```

2. Copie os arquivos de ambiente:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Suba os serviços:
```bash
docker-compose up --build
```

4. Acesse:
- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000](http://localhost:3000)

---

## 💻 Executando Localmente (Sem Docker)

1. Instale as dependências:
```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Copie os arquivos `.env`:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Inicie o backend:
```bash
cd backend
npm run dev
```

4. Em outro terminal, inicie o frontend:
```bash
cd frontend
npm run dev
```

---

## ✅ Funcionalidades

- ✅ Listagem de criptomoedas com valores atualizados (via CoinGecko)
- 🔁 Conversão de diferentes moedas
- ⭐ Favoritar moedas
- 📊 Histórico de conversões
- ⚡ Cache com Redis para performance
- 🧱 Arquitetura hexagonal

---

## 🔐 Arquivos `.env`

Arquivos `.env.example` estão incluídos para facilitar a configuração:

### backend/.env.example
```env
COINGECKO_API_URL=https://api.coingecko.com/api/v3

DB_USER=postgres
DB_HOST=db
DB_NAME=crypto_db
DB_PASSWORD=postgres
DB_PORT=5432

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

### frontend/.env.example
```env
VITE_API_URL=http://localhost:3000/api
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.

---

Desenvolvido por [Renan Pollo](https://github.com/Renan1Pollo)
