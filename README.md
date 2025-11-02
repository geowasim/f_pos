# 🧾 Local Sales & Invoice System (POS)

A lightweight, web-based Point of Sale (POS) system developed specifically for a private client. It was actually used in a live perfume exhibition, with full support for Saudi Electronic Invoicing requirements (ZATCA - Phase One). The project went through several stages of development and improvement based on real-world usage, which helped improve its structure and organization.

---

## ⚙️ Core Features

- Browse products with category filtering.
- Dynamic shopping cart with quantity adjustments.
- Payment options: cash or card.
- Invoice preview and printing with a ZATCA-compatible QR code.
- Invoice history with numbering and pagination.
- Ability to process a full invoice return (refund).
- Global adjustment of discounts and taxes.

---

## 🧠 Technical Improvements & Challenges

The focus was on a robust structure and valuable development experiences:

- **Ensuring Data Accuracy:** Storing critical values (e.g., `subtotal`, `discountValue`, `vat`, `totalPrice`) at the time of invoice creation ensures historical records remain accurate, even if calculation logic changes later.
- **Code Refactoring:** Separating logic from the user interface, improving the flow of props, and reducing repetition between components.
- **Skill Development:** This project was my first real experience in front-end development, which helped sharpen my programming logic, debugging, and redesign skills.
- **Environment Flexibility:** Transitioning from Firebase to LocalStorage in the demo version to protect customer data and provide a public experience.

---

## 🛠️ Technologies Used

- **Frontend:** React.js + JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Database (Original Version):** Firebase (Firestore + Auth)
- **Database (Demo Version):** LocalStorage
- **QR Code Generation:** `react-qr-code` library

---

## ⚠️ Known Limitations (Demo Version)

These limitations apply to the public demo version and may not be present in the client's live version:

- No complete session saving (only a test login available).
- No inventory or warehouse tracking.
- Statistics are limited (total sales, profit, and returned invoices only).
- Local display only (no cloud synchronization in this version).
