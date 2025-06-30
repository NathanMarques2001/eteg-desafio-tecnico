FROM node:20-alpine

# 1. Define o diretório de trabalho raiz da aplicação dentro do contêiner
WORKDIR /app

# 2. Copia apenas os arquivos de dependência do backend para seu diretório final
COPY apps/backend/package*.json ./apps/backend/

# 3. Muda para o diretório do backend e instala as dependências de forma limpa
WORKDIR /app/apps/backend
RUN npm install

# 4. Volta para a raiz e copia todo o código
WORKDIR /app
COPY . .

# 5. Volta para o diretório do backend para executar os passos finais
WORKDIR /app/apps/backend

# 6. Gera o Prisma Client
RUN npx prisma generate

# 7. Executa o build da aplicação
RUN npm run build

# 8. Define o comando padrão para iniciar
CMD [ "node", "dist/backend/main" ]