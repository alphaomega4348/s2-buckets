# Green Commerce Hackathon Project

A full-stack **React** and **Node.js** application designed for efficient, eco-friendly group orders, developed as part of the Amazon Hackathon. This project—**s2-buckets**—lets users shop, create or join group orders, track environmental impact, and earn sustainability badges.

---

## 🚀 Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Architecture & Tech Stack](#architecture--tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation & Setup](#installation--setup)  
   - [Running the App](#running-the-app)  
   - [Starting the ML Server](#starting-the-ml-server)  
5. [Usage Guide](#usage-guide)  
6. [API Reference](#api-reference)  
7. [Folder Structure](#folder-structure)  
8. [Future Roadmap](#future-roadmap)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## 🎯 Project Overview

**Green Commerce** is an eco-focused e-commerce platform that empowers users to:

- Shop for sustainable products.  
- Enable *sustainable packaging* to save CO₂.  
- Form or join group orders to unlock bulk discounts and reduce carbon footprint.  
- Track individual and group environmental impact through an interactive dashboard.  
- Earn **eco-badges** based on purchase behavior and group participation.

This project was developed in a 48-hour Amazon Hackathon, leveraging modern web technologies and best practices.

---

## ✨ Features

- **Shopping Cart & Checkout** with eco-options.  
- **Group Orders**: Create new groups or join nearby ones; orders automatically recorded.  
- **Interactive Dashboard**: Monthly trends, plastic reduction bars, category dials, badge tracker, leaderboard.

---

## 🏗️ Architecture & Tech Stack

- **Frontend**: React, React Router, Recharts, Context API  
- **Backend**: Node.js, Express, MongoDB/Mongoose, GeoJSON queries  
- **ML Server**: Python, FastAPI, scikit-learn for future recommendations

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v16+ & npm  
- MongoDB instance  
- Python 3.9+ & pip  
- Git

### Installation & Setup

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/alphaomega4348/s2-buckets.git
   cd s2-buckets
   ```
2.Configure environment variables:
```bash
# Update .env with your MongoDB URI, JWT_SECRET, etc.
cp .env.example .env
```
3.	Install dependencies:
   ```bash
# Backend
cd backend
npm install

# Frontend
cd ../Green-Commerce
npm install
```
4.Running the App
	•	Backend:
 ```bash
cd backend
npx nodemon index.js   # Starts with nodemon
```
  •	Frontend:
  ```bash
cd Green-Commerce
npm start     # Runs React app
```
Open your browser at http://localhost:3000.

5.Starting the ML Server

A separate FastAPI-based ML microservice for recommendations and insights:
```bash
# 1. Create & activate virtual environment
python -m venv myenv
# Windows:
myenv\Scripts\activate
# macOS/Linux:
# source myenv/bin/activate

# 2. Install Python dependencies
pip install fastapi uvicorn pydantic pandas numpy scikit-learn==1.6.1

# 3. Run the ML server
uvicorn main:app --reload
```
The ML API will listen on http://127.0.0.1:8000 by default.
## 📖 Usage Guide

## Standard Checkout
	1.	Add items to cart, toggle sustainable packaging.
	2.	Click Place Standard Order; celebrate with confetti.

## Group Orders
	•	Start Group Order → Create or Join Nearby.
	•	Create: Fill form → POST /group/create → POST /place-order → redirected.
	•	Join: Browse /group/nearby → POST /group/join/:id → POST /place-order → confirmation.

## Dashboard & Insights
	•	Eco-Purchase Trends: Area chart of monthly orders.
	•	Plastic Reduction: Bar chart of top 5 product IDs.
	•	Category Distribution: Dials for top sustainable categories.
	•	Badge Tracker: Tiered badges with modal detailing eco score, metrics.
	•	Leaderboard: Top eco-contributors by badge score.
 ## 🔌 API Reference

| Endpoint                             | Method | Description                      |
|--------------------------------------|:------:|----------------------------------|
| `/place-order`                       | POST   | Record a new order               |
| `/my-orders?email={email}`           | GET    | Fetch all orders for a user      |
| `/group/create`                      | POST   | Create a new group               |
| `/group/join/{id}`                   | POST   | Join an existing group           |
| `/group/nearby?lat=&lng=&rad=`       | GET    | Find nearby groups               |
| `/user-dashboard?email={email}`      | GET    | Get dashboard stats              |
| `/top-badge-scores`                  | GET    | Get top 3 eco contributors       |
## 🗂️ Folder Structure
```bash
Directory structure:
└── alphaomega4348-s2-buckets/
    ├── package.json
    ├── backend/
    │   ├── README.md
    │   ├── green_products_filters_dot.csv
    │   ├── index.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── .env
    │   ├── .gitignore
    │   ├── database/
    │   │   └── mongodb.js
    │   ├── middlewares/
    │   │   └── auth.js
    │   ├── routes/
    │   │   ├── dashboardRoutes.js
    │   │   ├── group.js
    │   │   ├── Login.js
    │   │   ├── orderRoutes.js
    │   │   ├── ProductManagement.js
    │   │   └── Signup.js
    │   └── storageSchema/
    │       ├── AddressSchema.js
    │       ├── EchoPurchase.js
    │       ├── group.js
    │       ├── Order.js
    │       ├── PaymentSchema.js
    │       ├── ProductSchema.js
    │       └── user.js
    ├── Green-Commerce/
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── tailwind.config.js
    │   ├── yarn.lock
    │   ├── .gitignore
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src/
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── reportWebVitals.js
    │       ├── setupTests.js
    │       ├── StateProvider.js
    │       ├── assets/
    │       │   ├── node_shivam.js
    │       │   └── Products.js
    │       ├── Auth/
    │       │   ├── BasketProtectedRoute.js
    │       │   ├── ProtectedRoute.js
    │       │   └── ProtectedWithBasket.js
    │       ├── Component/
    │       │   ├── CarbonDial.js
    │       │   ├── Cartempty.js
    │       │   ├── Checkout.js
    │       │   ├── CheckoutProduct.js
    │       │   ├── Dashboard.js
    │       │   ├── EcoBadge.js
    │       │   ├── EcopakagingCapsule.js
    │       │   ├── EcoWheel.js
    │       │   ├── Educationsection.js
    │       │   ├── feedback.js
    │       │   ├── Feedbacksubmitted.js
    │       │   ├── firebase.js
    │       │   ├── Footer.js
    │       │   ├── GreenProducts.js
    │       │   ├── GroupCard.js
    │       │   ├── GroupOrderSetup.js
    │       │   ├── Header.js
    │       │   ├── Headergreen.js
    │       │   ├── Home.js
    │       │   ├── Homegreen.js
    │       │   ├── Imageslidegreen.js
    │       │   ├── Imageslider.js
    │       │   ├── Login.js
    │       │   ├── MyGroups.js
    │       │   ├── MyOrders.js
    │       │   ├── navbar.js
    │       │   ├── navbargreen.js
    │       │   ├── NearbyGroups.js
    │       │   ├── NormalHeader.js
    │       │   ├── OrderConfirmation.js
    │       │   ├── OrderConfirmationWrapper.js
    │       │   ├── orderedProduct.js
    │       │   ├── OrderPage.js
    │       │   ├── OrderPageWrapper.js
    │       │   ├── Orders.js
    │       │   ├── Product.js
    │       │   ├── Productbutton.js
    │       │   ├── Productbutton1.js
    │       │   ├── ProductDetails.js
    │       │   ├── ProductDetails1.js
    │       │   ├── Productgreen.js
    │       │   ├── ProductPage.js
    │       │   ├── reducer.js
    │       │   ├── RewardEarned.js
    │       │   ├── Rewards.js
    │       │   ├── SellerSection.js
    │       │   ├── Signup.js
    │       │   ├── StandardDashboard.js
    │       │   ├── StateProvider.js
    │       │   ├── Submitted.js
    │       │   ├── Subtotal.js
    │       │   ├── Sustainability.js
    │       │   ├── thanks.js
    │       │   └── carosel/
    │       │       ├── SuggestGreenBrands.js
    │       │       └── SuggestGreenCategory_carosel1.js
    │       ├── Css/
    │       │   ├── Checkout.css
    │       │   ├── CheckoutProduct.css
    │       │   ├── Dashboard.css
    │       │   ├── Educationsection.css
    │       │   ├── Feedback.css
    │       │   ├── Feedbacksubmitted.css
    │       │   ├── Footer.css
    │       │   ├── GroupCard.css
    │       │   ├── GroupOrder.css
    │       │   ├── Header.css
    │       │   ├── Headergreen.css
    │       │   ├── Home.css
    │       │   ├── Homegreen.css
    │       │   ├── Imageslidegreen.css
    │       │   ├── ImageSlider.css
    │       │   ├── Login.css
    │       │   ├── MyGroups.css
    │       │   ├── navbar.css
    │       │   ├── navbargreen.css
    │       │   ├── NearbyGroups.css
    │       │   ├── OrderConfirmation.css
    │       │   ├── orderedProduct.css
    │       │   ├── OrderPage.css
    │       │   ├── Orders.css
    │       │   ├── Product.css
    │       │   ├── Productbutton.css
    │       │   ├── ProductDetails.css
    │       │   ├── Productgreen.css
    │       │   ├── SellerSection.css
    │       │   ├── Submitted.css
    │       │   ├── Subtotal.css
    │       │   ├── Sustainability.css
    │       │   └── Thanks.css
    │       └── utils/
    │           └── socket.js
    ├── modelIntegration/
    │   ├── grade_predictor.pkl
    │   ├── main.py
    │   └── .gitignore
```

## 📈 Future Roadmap
	•	User authentication & profiles
	•	Real-time notifications
	•	Shared payments & split checkout
	•	CI/CD pipelines & cloud deployment
	•	Mobile app integration

## 📄 License
This project is licensed under the MIT License
 Built with 💚 for sustainability!


 


