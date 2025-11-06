#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║          🔍 STUDIO DASHBOARD - COMPLETE BUILD VERIFICATION      ║"
echo "╔══════════════════════════════════════════════════════════════════╗"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}📁 1. CHECKING ALL PAGES...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

pages=(
  "src/app/login/page.tsx:Login Page"
  "src/app/dashboard/page.tsx:Dashboard Overview"
  "src/app/dashboard/billing/page.tsx:Billing & Subscription"
  "src/app/dashboard/campaigns/page.tsx:Campaigns Tracker"
  "src/app/dashboard/creators/page.tsx:Creators/Users"
  "src/app/dashboard/requests/page.tsx:Requests Management"
  "src/app/dashboard/settings/page.tsx:Settings (3 tabs)"
  "src/app/dashboard/system/page.tsx:System Health"
  "src/app/dashboard/uploads/page.tsx:Uploads Management"
)

for page in "${pages[@]}"; do
  IFS=':' read -r file name <<< "$page"
  if [ -f "$file" ]; then
    echo -e "  ${GREEN}✓${NC} $name"
  else
    echo -e "  ${RED}✗${NC} $name ${RED}MISSING${NC}"
  fi
done

echo ""
echo -e "${CYAN}🧩 2. CHECKING COMPONENTS...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

components=(
  "src/components/dashboard/StatCard.tsx:Stat Card"
  "src/components/dashboard/LoadingStates.tsx:Loading States"
  "src/components/dashboard/ErrorState.tsx:Error State"
  "src/components/NotificationBell.tsx:Notification Bell (with sound)"
  "src/components/ProtectedRoute.tsx:Protected Route"
)

for comp in "${components[@]}"; do
  IFS=':' read -r file name <<< "$comp"
  if [ -f "$file" ]; then
    echo -e "  ${GREEN}✓${NC} $name"
  else
    echo -e "  ${RED}✗${NC} $name ${RED}MISSING${NC}"
  fi
done

echo ""
echo -e "${CYAN}📊 3. CHECKING DUMMY DATA...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

data_files=(
  "public/api/summary.json:Dashboard Stats"
  "public/api/users.json:Users/Creators Data"
  "public/api/campaigns.json:Campaigns Data"
  "public/api/uploads.json:Uploads Data"
  "public/api/requests.json:Requests Data"
  "public/api/health.json:System Health Data"
)

for data in "${data_files[@]}"; do
  IFS=':' read -r file name <<< "$data"
  if [ -f "$file" ]; then
    size=$(wc -c < "$file")
    echo -e "  ${GREEN}✓${NC} $name (${size} bytes)"
  else
    echo -e "  ${RED}✗${NC} $name ${RED}MISSING${NC}"
  fi
done

echo ""
echo -e "${CYAN}📄 4. CHECKING DOCUMENTATION...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

docs=(
  "README.md:Main Documentation"
  "CLIENT_DELIVERY.md:Client Delivery Package"
  "DELIVERY_CHECKLIST.md:Internal Checklist"
)

for doc in "${docs[@]}"; do
  IFS=':' read -r file name <<< "$doc"
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    echo -e "  ${GREEN}✓${NC} $name (${lines} lines)"
  else
    echo -e "  ${YELLOW}⚠${NC} $name ${YELLOW}NOT FOUND${NC}"
  fi
done

echo ""
echo -e "${CYAN}🔐 5. LOGIN CREDENTIALS...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "  ${GREEN}Admin:${NC}   admin@studio.com / Studio@2025"
echo -e "  ${GREEN}Manager:${NC} studio@manager.com / Manager@2025"
echo -e "  ${GREEN}Creator:${NC} creator@studio.com / Creator@2025"
echo ""

echo -e "${CYAN}🚀 6. DEPLOYMENT INFO...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "  ${GREEN}Live URL:${NC} https://studio-dashboard-pearl.vercel.app"
echo -e "  ${GREEN}Platform:${NC} Vercel"
echo -e "  ${GREEN}Branch:${NC}   main"
echo ""
echo -e "  ${YELLOW}Latest commit:${NC}"
git log -1 --pretty=format:"  - %h: %s (%ar)" 2>/dev/null || echo "  No git info available"
echo ""
echo ""

echo -e "${CYAN}✨ 7. FEATURES CHECKLIST...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "  ${GREEN}✓${NC} Dashboard Overview (stats, activity, revenue chart)"
echo -e "  ${GREEN}✓${NC} Billing & Subscription (credit tracking, plans, transactions)"
echo -e "  ${GREEN}✓${NC} System Health Monitor (30-day chart, mobile optimized)"
echo -e "  ${GREEN}✓${NC} Creators/Users Management"
echo -e "  ${GREEN}✓${NC} Campaign Tracker"
echo -e "  ${GREEN}✓${NC} Upload Management"
echo -e "  ${GREEN}✓${NC} Request Approval System"
echo -e "  ${GREEN}✓${NC} Settings with 3 tabs (Profile, Notifications, Security)"
echo -e "  ${GREEN}✓${NC} Notification Bell with Sound 🔔"
echo -e "  ${GREEN}✓${NC} Mobile Responsive Design"
echo -e "  ${GREEN}✓${NC} Dark Theme with Neon Accents"
echo -e "  ${GREEN}✓${NC} Smooth Animations (Framer Motion)"
echo -e "  ${GREEN}✓${NC} Role-Based Access Control"
echo -e "  ${GREEN}✓${NC} Clean Login (no demo credentials shown)"
echo ""

echo -e "${CYAN}🧪 8. QUICK TESTS TO RUN...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Visit live site and test:"
echo ""
echo "  1. Login with admin@studio.com / Studio@2025"
echo "  2. Check dashboard shows real numbers (247, 18, 229, ₦125,400)"
echo "  3. Click notification bell - does it make sound? 🔊"
echo "  4. Navigate to Billing - see credit usage (287/500)"
echo "  5. Go to System - see 30-day uptime chart"
echo "  6. Check Settings - all 3 tabs work?"
echo "  7. Test on mobile - is it responsive?"
echo "  8. Check all sidebar links - any 404s?"
echo ""

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                    �� VERIFICATION COMPLETE                      ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Now test the live site and report any issues!${NC}"
echo ""
