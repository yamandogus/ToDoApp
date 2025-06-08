#!/bin/bash

# Test Setup Script
set -e

echo "🧪 Setting up test environment..."

# Environment variables for testing
export NODE_ENV=test
export DATABASE_TEST_URL="postgresql://todouser:todopassword@localhost:5433/todoapp_test"

# Check if test database is running
echo "📡 Checking test database connection..."
if ! pg_isready -h localhost -p 5433 -U todouser; then
    echo "❌ Test database is not running. Please start it with:"
    echo "   docker-compose up postgres-test -d"
    exit 1
fi

# Run Prisma migrations on test database
echo "🔄 Running database migrations for test environment..."
DATABASE_URL=$DATABASE_TEST_URL npx prisma migrate dev --name test-init

# Generate Prisma client
echo "⚡ Generating Prisma client..."
npx prisma generate

# Seed test database (optional)
echo "🌱 Seeding test database..."
DATABASE_URL=$DATABASE_TEST_URL npx prisma db seed

echo "✅ Test environment setup complete!"
echo ""
echo "Now you can run tests with:"
echo "  npm test              # Run all tests"
echo "  npm run test:watch    # Run tests in watch mode"  
echo "  npm run test:coverage # Run tests with coverage" 