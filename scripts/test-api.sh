#!/bin/bash

echo "🧪 Testing Mock API Endpoints..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

# Test Overview Stats
echo "1️⃣  Testing Overview Stats..."
response=$(curl -s "${BASE_URL}/api/studio/overview")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Success${NC}"
    echo "   Response: $response"
else
    echo -e "${RED}✗ Failed${NC}"
fi
echo ""

# Test Requests List
echo "2️⃣  Testing Requests List..."
response=$(curl -s "${BASE_URL}/api/studio/requests")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Success${NC}"
    echo "   Response: $response"
else
    echo -e "${RED}✗ Failed${NC}"
fi
echo ""

# Test Request Action
echo "3️⃣  Testing Request Action..."
response=$(curl -s -X POST "${BASE_URL}/api/studio/request/1/action" \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}')
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Success${NC}"
    echo "   Response: $response"
else
    echo -e "${RED}✗ Failed${NC}"
fi
echo ""

# Test Uploads List
echo "4️⃣  Testing Uploads List..."
response=$(curl -s "${BASE_URL}/api/uploads")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Success${NC}"
    echo "   Response: $response"
else
    echo -e "${RED}✗ Failed${NC}"
fi
echo ""

# Test User Profile
echo "5️⃣  Testing User Profile..."
response=$(curl -s "${BASE_URL}/api/user/profile")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Success${NC}"
    echo "   Response: $response"
else
    echo -e "${RED}✗ Failed${NC}"
fi
echo ""

echo "✅ API Testing Complete!"