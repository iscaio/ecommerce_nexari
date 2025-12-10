# NEXARI - E-commerce Fullstack (Web & Mobile)

Projeto de e-commerce Omnichannel desenvolvido como requisito parcial para a disciplina de **Análise e Desenvolvimento de Sistemas**.

### Informações Acadêmicas

- **Curso:** Análise e Desenvolvimento de Sistemas
- **Professor:** Bruno Vasconcelos
- **Desenvolvedores:**
  - Caio Victor
  - Leonardo Ramanho
  - Bruna Suassuna
  - Felipe Gomes

---

## Sobre o Projeto

O **NEXARI** é um sistema de vendas que integra uma interface Web (React) e um Aplicativo Mobile (React Native) consumindo uma única API Central (Node.js). O diferencial do projeto é a experiência **Omnichannel**: o carrinho de compras é sincronizado em tempo real entre dispositivos através de um banco de dados compartilhado.

---

## Tecnologias Utilizadas

### Backend (API Central)

- **Node.js** & **Express**: Servidor e gerenciamento de rotas.
- **MongoDB** & **Mongoose**: Banco de dados NoSQL para persistência.
- **JWT**: Sistema de autenticação.
- **CORS**: Controle de acesso (Web/Mobile).

### Frontend (Web)

- **React.js** (Vite): Interface web.
- **TailwindCSS**: Estilização.
- **Shadcn/UI**: Componentes visuais.
- **Axios**: Consumo de API.

### Mobile (App)

- **React Native** (Expo): App híbrido.
- **NativeWind (v2)**: TailwindCSS para mobile.
- **Expo Router**: Navegação.
- **AsyncStorage**: Persistência de dados local.

---

## Guia de Instalação e Execução (Passo a Passo)

Siga a ordem abaixo para rodar o projeto.

### 1. Clonar o Repositório

```bash
git clone https://github.com/iscaio/ecommerce_nexari
cd nexari-project
```

### 2. Configurar o Backend (Servidor)

O servidor rodará na porta **8080**.

```bash
# Entre na pasta do backend
cd backend-loja

# Instale as dependências
npm install

# Inicie o servidor
node server.js
```

> **IMPORTANTE:** Para criar os produtos iniciais (Seed) no banco de dados, abra seu navegador e acesse:
> `http://localhost:8080/api/products/seed`

### 3. Rodar o Frontend (Web)

```bash
# Entre na pasta do front
cd frontend

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

> O site estará disponível em `http://localhost:5173`.

### 4. Rodar o Mobile (App)

```bash
# Entre na pasta mobile
cd nexari-mobile

# Instale as dependências
npm install
```

**Configuração de IP (Obrigatória):**
O App precisa saber o IP do seu computador para conectar na API.

1. Abra o arquivo `src/services/api.js`.
2. Atualize a linha do IP com o endereço da sua máquina:

```javascript
// Exemplo:
const API_URL =
  "[http://192.168.0.135:8080/api](http://192.168.0.135:8080/api)";
```

**Rodando o Expo:**

```bash
# Use --clear para limpar cache e --tunnel para evitar bloqueio de firewall
npx expo start --clear --tunnel
```

> Escaneie o QR Code com o aplicativo **Expo Go**.
