FROM node:6.11.5

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .

HEALTHCHECK --interval=5s CMD curl --fail http://localhost:8080 || exit 1  