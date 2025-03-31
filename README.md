# 22BCE11638_Frontend

## 📌 Project Overview
This is a *Next.js* project with *TypeScript, designed for a structured frontend development experience. It includes pages like **Home, About, Database, and Search*, and follows a modular component-based approach.

## 🏗 Project Structure
22BCE11638_Frontend/
│   .gitattributes
│   .gitignore
│   eslint.config.mjs
│   next.config.ts
│   package-lock.json
│   package.json
│   postcss.config.mjs
│   README.md
│   tsconfig.json
│
├───public/
│   ├── images/              # Place static images here
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── illustration.png
│   │   ├── load.png
│   │   ├── logo.png
│   │   ├── trade-markia-image.png
│   │   ├── window.svg
│   ├── next.svg
│   ├── vercel.svg
│
└───src/
    ├───app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx  # Home Page
    │   ├───about/
    │   │   ├── page.tsx  # About Page
    │   ├───database/
    │   │   ├── page.tsx  # Database Page
    │   ├───search/
    │   │   ├── page.tsx  # Search Page
    │
    ├───components/           # Place reusable components here
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── SearchBar.tsx


## 🛠 Setup Instructions
1. *Clone the Repository:*
   sh
   git clone https://github.com/your-repo/22BCE11638_Frontend.git
   cd 22BCE11638_Frontend
   

2. *Install Dependencies:*
   sh
   npm install
   

3. *Run the Development Server:*
   sh
   npm run dev
   
   The app will be available at http://localhost:3000

## 📂 Placing Photos
- Store all images inside the /public/images/ directory for better organization.
- Use them in components/pages like this:
  tsx
  <img src="/images/logo.png" alt="Logo" className="h-10" />
  

## 🖼 Project Screenshots
# Home Page
![Home Page](Working%20Images/Image%201.png)

# Search Page
![Search Page](Working%20Images/Image%202.png)

# Database Page
![Database Page](Working%20Images/Image%203.png)

# Page 2
![Database Page](Working%20Images/Image%204.png)


## 🚀 Deployment
To deploy the project, use *Vercel*:
sh
npm run build
vercel

✅ Live Website
👉 Visit the App

## 🔗 Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 👨‍💻 Author
*K. Sasi Kumar*
- 🎓 VIT Bhopal University
- 📧 Contact: 8985037606 
- Kommamani012@gmail.com
