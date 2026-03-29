# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the pre-built distribution folder and the server entry point
# We are copying the local 'dist' folder which has our verified assets
COPY dist ./dist
COPY server.js ./

# Standard Cloud Run environmental configurations
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Launch the Express server
CMD ["node", "server.js"]
