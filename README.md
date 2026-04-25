# MotoVerse - Premium Car Dealership Platform

MotoVerse is a modern, luxury-themed car dealership web application designed to connect high-end vehicle dealers with prospective buyers. Built with React and Supabase, it features a sophisticated dark-mode UI with glassmorphism effects, robust role-based access control, and dynamic inventory management.

## 🌟 Key Features

*   **Role-Based Access Control (RBAC):** Three distinct user roles (Admin, Dealer, and Customer) with dedicated dashboards and protected routes.
*   **Luxury Aesthetics:** A premium, dark-themed user interface utilizing custom CSS glassmorphism, gold gradient accents, and smooth micro-animations.
*   **Secure Authentication:** End-to-end user registration and login powered by Supabase Auth.
*   **Dealer Inventory Management:** Verified dealers can seamlessly add, edit, and delete their car listings.
*   **Advanced Browsing & Filtering:** Customers can explore the vehicle collection with dynamic filters for Brand, Year, Price, and comprehensive sorting options.
*   **Real-time Database:** Powered by Supabase (PostgreSQL) for instantaneous data fetching and management.

## 🛠️ Technology Stack

*   **Frontend Framework:** React 18 (via Vite)
*   **Routing:** React Router v6
*   **Styling:** Vanilla CSS (CSS Variables) & Tailwind CSS
*   **Backend / Database:** Supabase (PostgreSQL)
*   **Authentication:** Supabase Auth
*   **Icons:** Inline SVG Icons

## 🚀 Getting Started

Follow these steps to run the MotoVerse platform locally on your machine.

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn
*   A Supabase Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Joshika-pachi/MotoVerse.git
   cd MotoVerse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory of your project and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start, usually accessible at `http://localhost:5173`.

## 🗄️ Database Schema

This application requires specific tables in Supabase to function correctly. Ensure your Supabase database has the following tables configured:

*   **`users`**: Extended profile data (id, full_name, phone, role, is_verified, etc.)
*   **`cars`**: Vehicle listings (id, brand, model, year, price, image, description, status, dealer_id)
*   *(Optional)* **`test_drives`** & **`messages`**: For extended dealership functionalities.

## 🎨 Design System

The application relies heavily on a centralized design system defined in `index.css`. It uses custom CSS properties (e.g., `--gold-primary`, `--bg-primary`, `--glass-bg`) to maintain consistency across the entire platform, ensuring the "Luxury Dark" aesthetic is preserved.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---
*Developed with a focus on modern web aesthetics and seamless user experiences.*
