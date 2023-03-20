FROM node:16

RUN mkdir -p /home/node/app/node_modules && chown -R node /home/node/app
WORKDIR /home/node/app

ARG REACT_APP_BACKEND_IP_ADDRESS
ENV REACT_APP_BACKEND_IP_ADDRESS "162.254.35.5"
ARG REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_PORT "8000"

COPY package*.json ./
USER node
RUN npm install
COPY --chown=node . .
EXPOSE 3000
CMD [ "npm", "start" ]
