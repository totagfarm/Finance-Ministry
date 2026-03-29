# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# This runs 'vite build apps/web' as defined in package.json
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=8080

# The command to run the application
# This runs 'node server.js' to serve the static dist folder
CMD ["npm", "start"]
