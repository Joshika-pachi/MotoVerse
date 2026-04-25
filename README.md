# 🏎️ MotoVerse - Premium Car Dealership

Welcome to **MotoVerse**! This platform was built to create a truly high-end, luxury experience for browsing and managing premium vehicles online. Whether you're a dealership looking to showcase your inventory or a customer hunting for your dream car, MotoVerse has you covered with a sleek dark-mode design and lightning-fast performance.

**🌟 Check out the live project here:** [https://moto-verse.vercel.app/](https://moto-verse.vercel.app/)

---

## ✨ What's Inside?

We wanted this app to feel premium, so here is what we focused on:
- **Luxury Aesthetics:** A beautiful, dark-themed interface using "glassmorphism" (frosted glass effects), gold gradient accents, and smooth animations to make everything feel expensive and responsive.
- **Three Different User Roles:** 
  - **Customers:** Can browse cars, filter by brand/year/price, and view detailed specs.
  - **Dealers:** Get a personalized dashboard to securely add, edit, and delete their car listings.
  - **Admins:** Have a central control panel to manage users and oversee the entire platform.
- **Secure Authentication:** A fully functioning login and registration system so your data stays safe.

## 🛠️ Built With

- **Frontend:** React (powered by Vite for speed)
- **Styling:** Custom CSS + Tailwind CSS (for that pixel-perfect, responsive layout)
- **Backend & Database:** Supabase (PostgreSQL & Auth)

---

## 🚀 How to Run This Locally

Want to play around with the code yourself? It's super easy to get started!

### 1. Clone the repository
First, download the code to your machine:
```bash
git clone https://github.com/Joshika-pachi/MotoVerse.git
cd MotoVerse
```

### 2. Install dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Connect your Database
You'll need a free [Supabase](https://supabase.com/) account to make the login and database work.
1. Create a new project in Supabase.
2. In your local project folder, create a new file named `.env`.
3. Add your Supabase keys to the `.env` file exactly like this:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Fire it up!
Start the local development server:
```bash
npm run dev
```
Open your browser and go to `http://localhost:5173`. You're good to go! 🎉

---

## 🗄️ Database Setup (For Developers)

If you are setting this up from scratch on your own Supabase account, your database will need the following tables to work properly:
- `users`: To store user roles (admin, dealer, customer) and extended profile information.
- `cars`: To store the vehicle inventory data (brand, model, price, image links, etc).

*(Tip: Make sure you turn on Email Authentication in your Supabase dashboard!)*

---

Feel free to explore the code, report any bugs, or use this as inspiration for your own projects. Thanks for checking out MotoVerse! 🚗✨
