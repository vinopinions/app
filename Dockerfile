# Builder stage
FROM node:20.9-slim as builder

WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Build the application
RUN yarn install --non-interactive --ignore-scripts

# Copy source code and configuration files
COPY app/ app/
COPY tsconfig.json ./

# Clean up the yarn cache
RUN yarn cache clean --force

# Set the production environment
ENV NODE_ENV production

EXPOSE 8081

# Command to run the production server
CMD ["yarn", "start"]