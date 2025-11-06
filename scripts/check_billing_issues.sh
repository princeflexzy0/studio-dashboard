#!/bin/bash

echo "🔍 CHECKING BILLING PAGE ISSUES..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Check if billing page exists and size
if [ -f "src/app/dashboard/billing/page.tsx" ]; then
  lines=$(wc -l < "src/app/dashboard/billing/page.tsx")
  echo "✓ Billing page exists: ${lines} lines"
  echo ""
  
  # 2. Check for card-related features
  echo "📋 Checking for payment card features..."
  if grep -q "card\|payment\|stripe\|paystack" src/app/dashboard/billing/page.tsx -i; then
    echo "  ⚠️  Found payment-related code"
    grep -n "card\|payment\|stripe\|paystack" src/app/dashboard/billing/page.tsx -i | head -5
  else
    echo "  ❌ NO CARD INPUT FUNCTIONALITY FOUND!"
    echo "     This is why 'add card' is not working!"
  fi
  echo ""
  
  # 3. Check for performance issues
  echo "⚡ Checking for performance issues..."
  
  if grep -q "useState.*\[\]" src/app/dashboard/billing/page.tsx; then
    echo "  ✓ Using useState for data"
  fi
  
  if grep -q "useEffect" src/app/dashboard/billing/page.tsx; then
    echo "  ⚠️  Has useEffect - might cause re-renders"
  fi
  
  if grep -q "map" src/app/dashboard/billing/page.tsx; then
    map_count=$(grep -c "map" src/app/dashboard/billing/page.tsx)
    echo "  ℹ️  ${map_count} .map() iterations found"
  fi
  
  echo ""
  
  # 4. Check mobile responsiveness
  echo "📱 Checking mobile responsiveness..."
  
  if grep -q "sm:\|md:\|lg:\|xl:" src/app/dashboard/billing/page.tsx; then
    echo "  ✓ Has responsive classes"
    responsive_count=$(grep -o "sm:\|md:\|lg:\|xl:" src/app/dashboard/billing/page.tsx | wc -l)
    echo "    Found ${responsive_count} responsive breakpoints"
  else
    echo "  ❌ NO RESPONSIVE CLASSES - might look bad on mobile!"
  fi
  
  echo ""
  
  # 5. Show current features
  echo "🎯 Current Features in Billing Page:"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  if grep -q "Current Plan" src/app/dashboard/billing/page.tsx; then
    echo "  ✓ Current Plan Overview"
  fi
  
  if grep -q "Credit Usage" src/app/dashboard/billing/page.tsx; then
    echo "  ✓ Credit Usage Tracker"
  fi
  
  if grep -q "Available Plans" src/app/dashboard/billing/page.tsx; then
    echo "  ✓ Plan Selection"
  fi
  
  if grep -q "Transaction History" src/app/dashboard/billing/page.tsx; then
    echo "  ✓ Transaction History"
  fi
  
  if grep -q "payment\|card" src/app/dashboard/billing/page.tsx -i; then
    echo "  ✓ Payment/Card Management"
  else
    echo "  ❌ Payment/Card Management - MISSING!"
  fi
  
  echo ""
  
  # 6. Check file size
  echo "📦 File Size Analysis:"
  size=$(wc -c < "src/app/dashboard/billing/page.tsx")
  echo "  File size: ${size} bytes"
  
  if [ $size -gt 50000 ]; then
    echo "  ⚠️  Large file - might affect performance"
  else
    echo "  ✓ File size is reasonable"
  fi
  
else
  echo "❌ Billing page NOT FOUND!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔧 ISSUES FOUND:"
echo ""

# Summary
grep -q "card\|payment" src/app/dashboard/billing/page.tsx -i 2>/dev/null
if [ $? -ne 0 ]; then
  echo "  ❌ NO CARD INPUT FEATURE - Need to add payment method section"
fi

if grep -q "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" src/app/dashboard/billing/page.tsx; then
  echo "  ⚠️  Complex grid layout might be slow on mobile"
fi

echo ""
echo "💡 RECOMMENDED FIXES:"
echo "  1. Add 'Add Payment Method' section with card input"
echo "  2. Optimize mobile grid layouts (reduce columns on mobile)"
echo "  3. Add loading states for better perceived performance"
echo "  4. Consider lazy loading for transaction history"
echo ""

