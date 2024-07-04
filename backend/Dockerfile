FROM node:latest
ENV PORT 8080

ENV HOST 127.0.0.1


WORKDIR /app
COPY . .
RUN npm install
EXPOSE ${PORT}
ENTRYPOINT [ "node", "app.js" ]