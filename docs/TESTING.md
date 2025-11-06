# 🧪 Studio Dashboard - QA Testing Guide

## Pre-Testing Setup
- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Open browser: `http://localhost:3000`

## 1. Authentication Flow
- [ ] Navigate to `/login`
- [ ] Login with test account: `admin@staging.local` / `Admin#2025`
- [ ] Verify redirect to `/dashboard`
- [ ] Check user name in sidebar
- [ ] Check role badge in header
- [ ] Test logout functionality
- [ ] Verify redirect to `/login` after logout

## 2. Overview Page Tests
- [ ] Stats cards display numbers correctly
- [ ] Loading skeleton appears first
- [ ] Welcome message shows user name
- [ ] Quick action buttons are clickable
- [ ] Page is responsive on mobile

## 3. Requests Page Tests
- [ ] Requests list loads
- [ ] Status badges show correct colors
- [ ] Filter tabs work (All, Pending, Approved, Rejected)
- [ ] Approve button triggers success toast
- [ ] Reject button triggers success toast
- [ ] Error handling works (disconnect network)

## 4. Uploads Page Tests
- [ ] Drag and drop zone is visible
- [ ] Can click to browse files
- [ ] Upload only accepts mp4/webm
- [ ] File size validation (>200MB rejected)
- [ ] Progress bar shows during upload
- [ ] File appears in library after upload
- [ ] Delete button shows confirmation modal
- [ ] Delete works and updates library

## 5. Settings Page Tests
### Profile Tab
- [ ] Form prefills with user data
- [ ] Can update name and email
- [ ] Save button triggers success toast
- [ ] Changes persist on page refresh

### Notifications Tab
- [ ] All toggle switches work
- [ ] Settings can be saved
- [ ] Success toast appears

### Security Tab
- [ ] Password change form validates
- [ ] Error if passwords don't match
- [ ] Error if password < 8 characters
- [ ] 2FA toggle works
- [ ] Active sessions display

## 6. UI/UX Tests
- [ ] Dark theme consistent across all pages
- [ ] Neon cyan (#00D9FF) accent color used properly
- [ ] All animations smooth (no jank)
- [ ] No console errors
- [ ] Mobile sidebar opens/closes correctly
- [ ] All links navigate properly

## 7. Performance Tests
- [ ] Page load time < 2s
- [ ] No memory leaks (check DevTools)
- [ ] Images lazy load
- [ ] API calls don't duplicate

## 8. Accessibility Tests
- [ ] Can navigate with keyboard only
- [ ] Tab order is logical
- [ ] Focus states visible
- [ ] Screen reader friendly (test with VoiceOver/NVDA)

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)