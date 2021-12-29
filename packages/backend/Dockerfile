FROM node:latest as base
ENV BACKEND_PORT=3001
ENV NODE_PATH=./src
WORKDIR /backend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .