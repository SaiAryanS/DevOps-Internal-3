# Stage 1: Build the application
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies based on package.json
# Using * for package-lock.json to support different package managers
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
ENV NODE_ENV production
RUN npm run build

# Stage 2: Production image
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files from the builder stage
# This includes the standalone server and node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy static assets from .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose the port the app runs on. Default is 3000.
EXPOSE 3000
ENV PORT 3000

# Healthcheck to ensure the app is running and responsive
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
