# Stage 1: Build Environment
FROM node:20 AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies including devDependencies for the build
RUN npm install

# Copy source code
COPY . .

# Execute the production build of the Vite application
# This generates the 'dist' folder at the root as per vite.config.ts (../../dist)
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-slim

WORKDIR /app

# Copy the built distribution and the server entry point
# server.js and dist are both at the root
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Standard Cloud Run environmental configurations
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Launch the Express server
CMD ["node", "server.js"]
