FROM node:18-alpine

WORKDIR /app

# Copy package files and lock file
COPY package.json package-lock.json* ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy TypeScript config
COPY tsconfig.json ./

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]

