# MediNexus 
### A Hospital Inventory and Supply Chain Optimisaition System
## Objective
The primary goal is to design an innovative, technology-driven system that ensures the availability of the right drugs in the right quantities at the right locations and times, while maintaining optimal conditions and minimizing costs.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hospital-vendor-dashboard.git

2. Install dependencies:
    ```bash
    cd web-app
    npm install

3. Set up environment variables in .env:
    ```bash
    # Database URL for Prisma
    DATABASE_URL=postgresql://username:password@localhost:5432/hospital_dashboard
    
    # JWT Secret for authentication
    JWT_SECRET=your_jwt_secret_key
    
    # Nodemailer email configuration
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password

   # Server Port
    PORT=3000
    
    # Node Environment
    NODE_ENV=development
    ```
4. Run the application:
    ```bash
    npm run dev
---
## Screenshots
### Homepage 
![SS_Homepage_English](./public/assets/screenshots/ss_homepage_english.png)
![SS_Homepage_Hindi](./public/assets/screenshots/ss_homepage_hindi.png)

### Dashboard 
![SS_Dashboard](./public/assets/screenshots/ss_dashboard.png)

### Inventory
![SS_Inventory](./public/assets/screenshots/ss_inventory.png)

### Orders
![SS_Orders](./public/assets/screenshots/ss_order.png)
![SS_Orders_Details](./public/assets/screenshots/ss_order_details.png)

### Multi Hospital Resource Sharing
![SS_Orders](./public/assets/screenshots/ss_branch_inventory.png)
![SS_Orders_Details](./public/assets/screenshots/ss_branch_transferHistory.png)

### Reports and Ananlytics
![SS_Reports](./public/assets/screenshots/ss_reports.png)

## Core Features (Hospital & Vendor Dashboard)
### 1. **Inventory Management Card**
   - Displays real-time stock levels of medical items.
   - Highlights items that are low in stock, near expiry, or in high demand.
   - Color-coded alerts for critical items needing immediate attention (e.g., red for items low in stock or close to expiry).

### 2. **Expiry and Demand Tracker**
   - Dedicated page to track inventory expiry dates and demand trends.
   - Sortable tables and graphical representations of demand over time.
   - Filters for viewing by item category, expiry range, and demand level.

### 3. **Order Tracking and Detail System**
   - A page to manage and track all orders placed.
   - Filter by order status (pending, delivering, completed), date, and item type.
   - Displays key order details like order ID, date, status, and quantity.

### 4. **Live Order Tracking**
   - When an order is in "Pending" or "Delivering" status, users can view a live tracking page.
   - Uber-like UI for tracking the delivery box in real-time.
   - Displays ETA, current delivery status, and contact information for delivery personnel.

### 5. **Authentication (Sign-in/Sign-up)**
   - User authentication for system access.
   - Secure sign-in and sign-up feature for hospital staff with JWT-based session handling.
   - Password reset functionality.

### 6. **Report and Analytics**
   - Generate reports on inventory usage, demand trends, and order history.
   - Graphical and tabular views of hospital resource utilization.
   - Export options for sharing insights with external teams.

### 7. **Feature Landing Page**
   - A clear and intuitive landing page that highlights the key features of the dashboard.
   - Includes quick access to core functionalities like inventory tracking, order management, and analytics.

### 8. **Contact Us**
   - A contact page where users can send feedback or raise queries.
   - Integrated with Nodemailer for real-time email notifications.

### 9. **Information Sending**
   - Users can contact the support team or hospital administration by sending real-time emails through the dashboard using Nodemailer.

---

## Core Features (Vendor Applications)

### 1. **Blockchain Integration (Solana)**
   - Utilizes blockchain technology for secure, tamper-proof tracking of drug movements from vendors to hospitals.
   - Smart contracts automate procurement and distribution, reducing manual errors and enhancing transparency.

### 2. **Mobile Application (Kotlin)**
   - A user-friendly mobile app allows real-time tracking and management of inventory.
   - Hospitals can place orders, track shipments, and monitor usage directly from their devices.

### 3. **Cloud-based Dashboard (Next.js, Node.js)**
   - A centralized, web-based dashboard provides a real-time overview of drug stocks, usage patterns, and procurement statuses across multiple hospitals and vendors.
   - Ensures stakeholders can make informed decisions based on accurate, up-to-date information.

---

## How it Addresses the Problem

### 1. **Efficient Procurement**
   - By automating procurement processes, the system reduces delays and ensures that essential drugs are always available.

### 2. **Transparency and Accountability**
   - Blockchain technology provides a transparent and immutable record of all transactions.
   - Reduces the risk of fraud and ensures that drugs are not diverted or stolen.
   - Integrates a safe payment gateway for authorized payments.

### 3. **Real-Time Monitoring**
   - The dashboard enables continuous monitoring of drug stocks, usage, and demand.
   - A state-of-the-art ML model allows for proactive replenishment and prevents stockouts or overstocking.

---

## Innovation and Uniqueness

### 1. **Blockchain for Anti-Theft and Tracking**
   - Integration of blockchain technology in drug inventory management is a cutting-edge approach that ensures data integrity and security.
   - Makes it difficult for unauthorized parties to tamper with records.

### 2. **Smart Contracts for Automation**
   - Smart contracts streamline procurement and distribution by automatically executing agreements when predefined conditions are met, reducing administrative overhead.

### 3. **Multi-Level Management**
   - The system is designed to operate efficiently at both the vendor and hospital levels.
   - Features are tailored to each, such as batch and expiry tracking for hospitals and order tracking for vendors.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Kotlin (Mobile)
- **Backend**: Node.js, Express.js, Solana Blockchain (Smart Contracts)
- **Database**: Prisma (PostgreSQL)
- **Email Service**: Nodemailer
- **Authentication**: JWT-based authentication
- **Map Integration**: Google Maps API for live tracking
- **Validation**: Zod for form validation
- **Analytics**: Chart.js for data visualization

---

## Usage

- **Hospital Dashboard:** Monitor stock levels, track orders, and manage inventory.
- **Vendor Dashboard:** Manage orders, shipments, and drug distribution with secure blockchain tracking.
- **Mobile Application:** Hospitals and vendors can manage inventory and shipments in real-time via the mobile app.
- **Contact Us:** Send emails to the support team through the contact form using Nodemailer.

---
## Future Enhancements

- **Mobile-Friendly Interface:** Improve responsiveness for mobile devices.
- **Custom Alerts:** Add custom notifications for specific inventory changes or new order updates.
- **Mobile Application:** Hospitals and vendors can manage inventory and shipments in real-time via the mobile app.
- **Supplier Integration:** Directly integrate with suppliers for automated order placements.
- **AI-based Predictions:** Use machine learning to predict future inventory needs based on historical usage patterns.
---