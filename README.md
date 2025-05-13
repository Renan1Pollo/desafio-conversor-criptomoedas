# 💱 Conversor de Criptomoedas

Este projeto é um sistema completo de conversão de criptomoedas, desenvolvido como parte de um desafio técnico. Ele permite ao usuário realizar conversões, favoritar moedas e acompanhar o histórico de conversões.
O sistema é composto por um frontend moderno e um backend robusto com cache e banco de dados.

## 🚀 Tecnologias Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- Arquitetura Hexagonal (Ports and Adapters)

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (opcional, se não usar Docker)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### Usando Docker (recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/Renan1Pollo/desafio-conversor-criptomoedas.git
cd desafio-conversor-criptomoedas
```

2. Copie o arquivo de variáveis de ambiente:
```bash
cp .env.example .env
```

3. Suba os serviços:
```bash
docker-compose up --build
```

4. Acesse:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend/API: [http://localhost:3000](http://localhost:3000)

### Sem Docker

1. Instale as dependências em cada pasta:

```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Configure o arquivo `.env` com as variáveis necessárias no backend.

3. Inicie o backend:
```bash
cd backend
npm run dev
```

4. Inicie o frontend:
```bash
cd frontend
npm run dev
```

## 📚 Funcionalidades

- ✅ Listagem de criptomoedas com valores atualizados
- 🔁 Conversão entre diferentes moedas
- ⭐ Marcar/desmarcar favoritas
- 📊 Visualizar histórico de conversões
- ⚡ Uso de cache com Redis para otimizar performance
- 🧱 Backend modular com arquitetura hexagonal

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido por [Renan Pollo](https://github.com/Renan1Pollo)
