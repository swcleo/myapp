# BUILD
FROM node:16 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# RUNTIME
FROM node:16 AS runtime
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --omit=dev

# FINAL
FROM node:16-alpine
WORKDIR /dist
COPY package*.json .
COPY --from=runtime /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/dist ./dist
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["dist/app.js"]
