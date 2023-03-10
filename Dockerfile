# Use a imagem Node.js como base
FROM node:18

# Definir o diretório de trabalho para /app
WORKDIR /app

# Copiar os arquivos necessários para o diretório de trabalho
COPY package*.json ./

COPY .env-development ./.env

# Instalar as dependências
RUN npm ci --omit=dev --ignore-scripts

# Copiar o restante do código da aplicação
COPY . .

# Definir a porta na qual a aplicação será executada
EXPOSE 3000

# Executar a aplicação quando o container iniciar
CMD [ "npm", "run", "start:dev" ]