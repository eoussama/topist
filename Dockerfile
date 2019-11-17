# Getting the base image
FROM node:alpine

# Specifying a work directory
WORKDIR /usr/topist

# Copying the package information
COPY ./package*.json ./

# Installing the dependencies
RUN npm install

# Copying the source code
COPY ./ ./

# Exposing the port
EXPOSE 3000

# Starting the app
CMD ["npm", "start"]
