 Urvan Plant Store

A modern, responsive plant e-commerce platform built with React, Node.js, and MongoDB Atlas. Discover beautiful plants with interactive features and engaging user experience.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation & Running

1. Clone the repository
   
   git clone <repository-url>
   cd urvan
   

2. Install dependencies
   bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   

3. Set up environment variables
   bash
   # In backend folder, create config.env
   MONGODB_URI=your_mongodb_atlas_connection_string
   

4. Run the application
   bash
   # Terminal 1 - Start backend server
   cd backend
   npm start

   # Terminal 2 - Start frontend development server
   cd frontend
   npm run dev


5. Open your browser
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## About the Project

Urvan Plant Store is a comprehensive plant e-commerce platform that offers:

- Plant Catalog: Browse through a curated collection of indoor and outdoor plants
- Interactive Features: Engage with plants through 3D-like viewers and interactive elements
- Responsive Design: Optimized for all devices (mobile, tablet, desktop)
- Real-time Data: Connected to MongoDB Atlas for live inventory management
- Modern UI/UX: Beautiful animations and smooth user interactions

## ✨ Core Features

### 🛍️ E-commerce Functionality
- Plant Catalog: Browse plants with search and filter options
- Plant Details: Detailed information with care instructions
- Add Plants: Admin functionality to add new plants
- Responsive Design: Mobile-first approach with touch-friendly interface

### 🔍 Search & Filter
- Advanced Search: Search by plant name, category, or description
- Smart Filters: Filter by price range, availability, and categories
- Real-time Results: Instant search results with smooth animations

### 📱 Responsive Design
- Mobile Optimized: Perfect experience on smartphones
- Tablet Friendly: Optimized layouts for tablets
- Desktop Enhanced: Full-featured experience on large screens

=================================
## 🌟 Extra Features
=============================
### 🎪 Plant Spotlight Carousel
- Auto-playing carousel showcasing featured plants
- Interactive trivia with fun plant facts
- Seasonal care tips and pro care advice
- Smooth animations and manual controls
- Responsive design with full-width desktop view

### 👁️ Interactive Plant Viewer
- 3D-like plant exploration with rotation and zoom
- 360° view with drag and touch controls
- Animated care tips and interactive elements
- Full-screen modal with smooth transitions
- ESC key support and click-outside-to-close

### 🎉 Toast Notifications
- Sleek toast system for user feedback
- Animated notifications for cart and wishlist actions
- Auto-dismiss with smooth fade effects
- Multiple types: Success, info, and warning toasts

### 🎨 Modern UI Elements
- Glass-morphism effects with backdrop blur
- Gradient backgrounds and subtle patterns
- Smooth animations using Framer Motion
- Hover effects and micro-interactions
- Loading spinners and skeleton screens

### 📊 Database Integration
- MongoDB Atlas cloud database
- Real-time data synchronization
- Sample data with 50+ plant entries
- Data migration scripts for easy setup

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- React Router DOM for navigation
- Framer Motion for animations
- Tailwind CSS for styling
- Lucide React for icons
- React Query for data fetching

### Backend
- Node.js with Express
- MongoDB Atlas for database
- Mongoose for ODM
- CORS enabled for cross-origin requests
- Environment variables for configuration

## 📁 Project Structure

```
urvan/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── index.css       # Global styles
│   └── package.json
├── backend/                 # Node.js backend server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── seedData.js         # Sample data
│   └── server.js           # Main server file
└── README.md
```
