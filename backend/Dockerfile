FROM mysql/mysql-server

ENV NODE_VERSION=18.16.0
RUN microdnf install -y curl gzip
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

ENV MYSQL_HOST=localhost
ENV MYSQL_DATABASE=match-aggregator
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_ROOT_PASSWORD=password

WORKDIR /usr/app

# avoid cache revalidating
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

EXPOSE 3001

# CMD ["npm", "run", "start:prod"]