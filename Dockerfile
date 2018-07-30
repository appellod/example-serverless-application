FROM node:6.9.2

# set home folder to /api
ENV HOME /api

# copy files to home folder
WORKDIR ${HOME}
ADD . $HOME

# install pm2 and npm packages
RUN npm run build
RUN npm install -g pm2 && npm install

# run crawler using pm2's Docker integration
CMD ["pm2-docker", "dist/index.js"]
