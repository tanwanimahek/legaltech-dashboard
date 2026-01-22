# ⚖️ LegalTech Dashboard (Frontend Only)

A **frontend-only LegalTech dashboard application** built using **Next.js (App Router)** and **shadcn/ui**, implementing authentication, role-based access, protected routes, and a clean professional UI — **without any backend or external APIs**.

This project was developed as part of an **internship assignment** to demonstrate frontend architecture, state management, validation, and real-world LegalTech use cases.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **State Management:** React Hooks + localStorage
- **Data Source:** Local JSON file (`db.json`)
- **Authentication:** Mock auth (no backend)

❌ No backend  
❌ No Firebase / Auth providers  
❌ No external APIs  

---

## 🔐 Authentication Flow

### 1️⃣ Signup
- Fields:
  - Full Name
  - Email
  - Phone Number
  - Password
  - Confirm Password
  - Role (Judge / Advocate / Police / Clerk)
- Validations:
  - Valid email format
  - 10-digit phone number
  - Password ≥ 8 characters
  - Passwords must match
  - Role selection mandatory
- On success:
  - Mock OTP generated
  - Redirects to OTP Verification

---

### 2️⃣ OTP Verification
- 6-digit OTP input
- Validates OTP from local storage
- On success → user logged in and redirected to Dashboard

---

### 3️⃣ Login
- Email + Password + Role selection
- Credentials matched from `db.json`
- On success → Dashboard
- On failure → error message shown

---

## 🧭 Route Protection

- Dashboard and all inner pages are **protected**
- Unauthorized access redirects to `/login`
- Authentication state stored in `localStorage`

---

## 📊 Dashboard Features

### 🎯 Overview Cards
- Total Cases
- Pending Cases
- Disposed Cases
- Today’s Hearings

### 📋 Recent Cases Table
- Case ID
- Case Title
- Court
- Status
- Next Hearing Date

---

## 📚 Sidebar Navigation

- Dashboard
- Cases
- Hearings
- Profile
- Logout

✨ Active route highlighting  
🌙 Dark Mode toggle included  

---

## 👤 Profile Page

- Displays logged-in user details:
  - Name
  - Email
  - Phone
  - Role  
- Read-only view

---

## 🎨 UI & UX Highlights

- Clean, professional LegalTech theme
- Fully responsive layout
- Dark mode support
- Loading states & smooth transitions
- Consistent typography and spacing

---

## 🧪 Bonus Features

- Role-based login
- Dark mode toggle
- Modular validation utilities
- Clean component structure
- Reusable UI components (shadcn)

---

## 🛠️ Getting Started Locally

```bash
npm install
npm run dev
```
Open in browser:
👉 http://localhost:3000

---

## 📦 Project Structure

```bash
src/
├── app/
├── components/
├── data/
├── lib/
├── utils/
```

---

## 📸 Screenshots

Screenshots available in the /screenshots folder:

- Login
- Signup
- OTP Verification
- Dashboard
- Profile
- Dark Mode

## 📌 Notes

- This is a frontend-only project
- All data is mocked using local JSON
- No backend or API integration
