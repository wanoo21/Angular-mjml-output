FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install yarn
RUN npm install yarn --no-package-lock

# Copy app source
# COPY package.json ./
# COPY yarn.lock ./
COPY . .

# Install dependencies
RUN yarn install

# Bundle app source
RUN yarn build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start app
CMD [ "node", "dist/server.js" ]