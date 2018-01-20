FROM node:7
ARG ${NPM_TOKEN}
ENV NPM_TOKEN=$NPM_TOKEN
ADD . /var/code
WORKDIR /var/code
# CMD [ "npm", "install" ]
ENTRYPOINT [ "bash" ]
