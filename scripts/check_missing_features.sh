#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║       🔍 CHECKING PROFILE PICTURE & NOTIFICATION FEATURES       ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# 1. Check Settings page for profile picture upload
echo "📸 1. CHECKING PROFILE PICTURE UPLOAD..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "src/app/dashboard/settings/page.tsx" ]; then
  echo "✓ Settings page exists"
  
  if grep -q "Camera\|FileUpload\|file.*accept.*image\|onChange.*file" src/app/dashboard/settings/page.tsx; then
    echo "  ✓ Found image upload code"
    grep -n "Camera\|file.*accept" src/app/dashboard/settings/page.tsx | head -5
  else
    echo "  ❌ NO IMAGE UPLOAD FUNCTIONALITY!"
    echo "     The Camera icon button doesn't actually upload!"
  fi
  
  if grep -q "useState.*profilePicture\|useState.*avatar\|useState.*image" src/app/dashboard/settings/page.tsx; then
    echo "  ✓ Has profile picture state"
  else
    echo "  ❌ NO PROFILE PICTURE STATE!"
  fi
else
  echo "❌ Settings page NOT FOUND"
fi

echo ""

# 2. Check if NotificationBell exists
echo "🔔 2. CHECKING NOTIFICATION BELL..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "src/components/NotificationBell.tsx" ]; then
  echo "✓ NotificationBell component exists"
  
  if grep -q "Audio\|audio\|sound\|play()" src/components/NotificationBell.tsx; then
    echo "  ✓ Has audio/sound code"
  else
    echo "  ❌ NO SOUND CODE!"
  fi
else
  echo "❌ NotificationBell component MISSING!"
fi

echo ""

# 3. Check if NotificationBell is in the layout
echo "📍 3. CHECKING IF BELL IS IN DASHBOARD LAYOUT..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "src/app/dashboard/layout.tsx" ]; then
  if grep -q "NotificationBell" src/app/dashboard/layout.tsx; then
    echo "✓ NotificationBell is imported in layout"
    echo "  Location:"
    grep -n "NotificationBell" src/app/dashboard/layout.tsx | head -3
  else
    echo "❌ NotificationBell NOT IN LAYOUT!"
    echo "   That's why you don't see it!"
  fi
else
  echo "❌ Layout not found"
fi

echo ""

# 4. Check AuthContext for profile picture
echo "👤 4. CHECKING AUTH CONTEXT FOR PROFILE DATA..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "src/contexts/AuthContext.tsx" ]; then
  if grep -q "profilePicture\|avatar\|image" src/contexts/AuthContext.tsx; then
    echo "✓ AuthContext has profile picture field"
  else
    echo "❌ AuthContext MISSING profile picture field!"
    echo "   Need to add it so it syncs across pages"
  fi
else
  echo "❌ AuthContext not found"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                        📋 SUMMARY                                ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

issues=0

if ! grep -q "file.*accept.*image" src/app/dashboard/settings/page.tsx 2>/dev/null; then
  echo "❌ Issue 1: Profile picture upload not working"
  ((issues++))
fi

if ! grep -q "NotificationBell" src/app/dashboard/layout.tsx 2>/dev/null; then
  echo "❌ Issue 2: Notification bell not showing in dashboard"
  ((issues++))
fi

if ! grep -q "profilePicture\|avatar" src/contexts/AuthContext.tsx 2>/dev/null; then
  echo "❌ Issue 3: Profile picture not synced across pages"
  ((issues++))
fi

echo ""
if [ $issues -gt 0 ]; then
  echo "🔧 Found $issues issue(s) - Will fix them all!"
else
  echo "✅ Everything looks good!"
fi

echo ""
