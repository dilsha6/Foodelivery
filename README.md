
# 🍽️ Food Ordering & Live Delivery Tracking App

This project is a simple full-stack food ordering application built using **React Native (Expo)** for the frontend and **Node.js + Express + PostgreSQL** for the backend. It supports address saving, order placement, automatic order status updates, and live delivery tracking on Google Maps.

---

## 📂 Project Structure

```
oru_simple_app/
├── app/                  # Frontend (React Native using Expo Router)
│   ├── checkout.tsx      # Checkout page (address + payment + summary)
│   ├── order-status.tsx  # Displays dynamic order status
│   ├── delivery-map.tsx  # Live delivery map (simulated)
│
├── components/
│   └── AddressBlock.tsx  # Address form/display component
│
├── server/              # Backend (Express + PostgreSQL)
│   ├── index.ts          # Main server file with all routes
│   ├── db.ts             # PostgreSQL connection pool
│   └── init.sql          # SQL script to initialize DB tables
│
├── .env                  # Environment variables for DB config
└── README.md             # This file
```

---

## 🧑‍💻 Setup Instructions

### ✅ Prerequisites

- Node.js (v18+)
- PostgreSQL (v13+)
- Expo CLI: `npm install -g expo-cli`

---

### 📦 1. Backend Setup

#### a. Create the PostgreSQL Database

```sql
-- in psql shell
CREATE DATABASE food_order;
```

#### b. Initialize tables

```bash
psql -U postgres -p 5433 -d food_order -f server/init.sql
```

#### c. Configure environment variables

Create a `.env` file in `server/`:

```env
PORT=4000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=food_order
DB_PASS=yourpassword
DB_PORT=5433
```

#### d. Install dependencies

```bash
cd server
npm install
```

#### e. Start backend server

```bash
npx ts-node index.ts
```

Server will run on: `http://0.0.0.0:4000`

---

### 📱 2. Frontend Setup

#### a. Start Expo project

```bash
cd oru_simple_app
npx expo start
```

#### b. Launch app on:

- **Android emulator** or **Expo Go**
- Ensure **your device is on the same Wi-Fi as your server**
- Update IPs in frontend to match your local IP (e.g. `http://192.168.0.6:4000`)

---

## ✅ Features Implemented

### 🧾 Address Management
- Save user delivery address using a form
- Fetch saved address from backend
- Show saved or default address

### 🛒 Order Placement
- Generate a unique alphanumeric order ID
- Insert order into DB with status `Order Placed`

### 🔁 Order Status Flow
- Automatically update status every 15 seconds
- Status flow: `Order Placed → Preparing → Picked by Delivery Partner → On the Way → Delivered`
- Status fetched every 10s on frontend

### 🗺️ Live Delivery Tracking
- Uses `react-native-maps`
- Simulated location movement every 5s on a map
- Delivery marker follows the simulated route

---

## 🔧 Tech Stack

| Layer       | Stack                         |
|-------------|-------------------------------|
| Frontend    | React Native (Expo + Expo Router) |
| Backend     | Node.js, Express              |
| Database    | PostgreSQL                    |
| Mapping     | `react-native-maps`, Google Maps |
| Dev Tools   | TypeScript, VS Code, Expo CLI |

---

## 🤖 AI Tools Used

This project was supported by **ChatGPT** and **Github Copilot**:

- Writing and debugging Express backend routes
- Writing React Native component structures and logic
- Creating and debugging SQL schema for PostgreSQL
- Solving issues with async fetching, polling, and type mismatches
- Structuring stateful UI for live tracking and status updates


---

## 💡 Possible Improvements (Future Work)

- Add user authentication
- Support multiple orders with order history
- Save items per order in a new `order_items` table
- Allow real-time delivery tracking using actual location (via GPS)
- Add payment gateway integration

---

## 👨‍💻 Author

**Dilsha K**

Backend + Frontend Integration | React Native + Node.js + PostgreSQL  
Project built as part of full-stack learning and a self-initiated portfolio.

---
![photo_2025-07-05_21-02-18](https://github.com/user-attachments/assets/1df6934d-fdbc-4a4b-8ad6-ff646586ba33)
![photo_2025-07-05_21-03-29](https://github.com/user-attachments/assets/7825b9a2-8e19-47a2-9949-1831d35b2ba4)
![photo_2025-07-05_21-03-37](https://github.com/user-attachments/assets/6bb97716-486b-429a-88ad-16395a2197f7)
![photo_2025-07-05_21-03-44](https://github.com/user-attachments/assets/afefdada-f188-47fe-9e90-2e3a5df355c7)
![photo_2025-07-05_21-03-50](https://github.com/user-attachments/assets/861665e3-f305-4068-b01e-f3b74d63e877)





