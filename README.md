# 🏛️ SSTU CSE Department Portal

A comprehensive, modern web portal designed for the Department of Computer Science & Engineering at SSTU. Built with Next.js 14, Neon PostgreSQL, and Prisma, this platform features role-based access control, interactive academic management tools, and a premium glassmorphic UI.

---

## 🎯 Project Impact: How & Who it Helps

The **SSTU CSE Portal** is designed to bridge the communication gap between faculty, students, and administration, transforming a traditionally fragmented academic experience into a unified digital ecosystem.

### **How it Helps:**
- **Centralized Information**: Eliminates the need to search through multiple social media groups or physical boards. All notices, events, and materials are in one verifiable source.
- **Academic Efficiency**: Automates attendance tracking and assignment management, reducing manual paperwork for faculty and providing instant transparency for students.
- **Enhanced Connectivity**: Facilitates a stronger bond between current students and alumni, creating networking and mentorship opportunities.
- **Administrative Transparency**: Provides the department's leadership with a "bird's-eye view" of all academic and system operations.

### **Who it Helps:**
- **Students**: Gain instant access to study materials, track their attendance in real-time, and stay updated on crucial exam notices.
- **Faculty Members**: Effortlessly manage classroom resources, track student progress, and maintain professional profiles.
- **Class Representatives (CRs)**: Empowered with tools to assist faculty in routine tasks and disseminate section-specific updates.
- **Administration**: A powerful command center to oversee user roles, departmental content, and system health.
- **Alumni & Guests**: Prospective students can explore the department's excellence, while alumni can stay connected to their alma mater.

---

## 🚀 Technologies Used

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: NextAuth.js (v5 Beta), Prisma ORM
- **Database**: Neon (Serverless PostgreSQL)
- **UI Components**: Lucide React, Radix UI

---

## ✨ Key Features

### 🌐 Public Portal
- **Department Branding**: High-end landing page with department stats and vision.
- **Faculty Directory**: Interactive profiles of all faculty members.
- **Academics & Materials**: Access to semester-wise curriculum, lecture notes, and video courses.
- **Notice Board & Events**: Stay updated with categorized announcements and upcoming departmental events.
- **Alumni Network**: A searchable directory of graduates and success stories.

### 🔐 Advanced Authentication
- **Secure Auth**: Custom credential provider with bcrypt password hashing.
- **Dynamic Session Handling**: Real-time session synchronization across the portal.
- **Premium UI**: Redesigned auth pages with immersive background effects and smooth transitions.

### 🛡️ Master Admin Control Panel (`/admin`)
- **System Overview**: Monitor platform metrics like total users, active courses, and notices.
- **User Management**: Dynamic role assignment (Admin, Teacher, CR, Student) via an interactive control table.
- **CMS Controls**: Centralized management for faculty, notices, and events.

### 📊 Role-Based Dashboards
- **Student Dashboard**: Track personal attendance, course updates, and submissions.
- **Teacher Dashboard**: Manage class resources, post notices, and handle grading.
- **CR (Class Rep) Dashboard**: Special tools for marking attendance and coordinating section-specific events.

### 🎓 Academic Tools
- **Attendance System**: A robust UI for teachers and CRs to mark student presence, lateness, or absence.
- **Classroom Management**: Integrated system for uploading assignments, managing resources, and tracking student submissions.

---

## 🛠️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd sst-cse-portal
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="your-neon-database-url"
    NEXTAUTH_SECRET="your-secret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Database Sync**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

## 🎨 Design Philosophy
The portal follows a **Glassmorphism** design aesthetic, utilizing:
- Subtle blurs and translucent cards.
- Vibrant accent colors (SST Teal & Blue).
- Dark mode optimized for long academic study sessions.
- Responsive layouts for seamless mobile and desktop experiences.

---

## 📜 License
This project is developed for the **SSTU CSE Department**. All rights reserved.
