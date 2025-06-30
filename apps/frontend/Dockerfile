FROM node:20-alpine

# 1. Define o diretório de trabalho raiz da aplicação dentro do contêiner
WORKDIR /app

# 2. Copia apenas os arquivos de dependência do frontend para seu diretório final
COPY apps/frontend/package*.json ./apps/frontend/

# 3. Muda para o diretório do frontend e instala as dependências de forma limpa
WORKDIR /app/apps/frontend
RUN npm install

# 4. Volta para a raiz e copia todo o código-fonte
WORKDIR /app
COPY . .

# 5. Volta para o diretório do frontend para executar o build
WORKDIR /app/apps/frontend

# 6. Executa o build da aplicação frontend
RUN npm run build

# 7. Define o comando padrão para iniciar o servidor de preview
CMD [ "npm", "run", "preview" ]